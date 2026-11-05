import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../services/api';
import { useToast } from './useToast';

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: (reason?: string) => void;
  loading: boolean;
  inactivityWarning: boolean;
  secondsRemaining: number;
  resetInactivityTimer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'efficacious_admin_session';
const LAST_ACTIVITY_KEY = 'efficacious_admin_last_activity';
const LOGOUT_REASON_KEY = 'efficacious_logout_reason';

// Default: 15 minutes idle timeout with 60 seconds warning countdown
export const DEFAULT_INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;
export const INACTIVITY_WARNING_MS = 60 * 1000;
const ACTIVITY_THROTTLE_MS = 3000;

const getInactivityTimeout = (): number => {
  if (typeof window !== 'undefined' && (window as any).__ADMIN_INACTIVITY_TIMEOUT_MS__) {
    return Number((window as any).__ADMIN_INACTIVITY_TIMEOUT_MS__);
  }
  return DEFAULT_INACTIVITY_TIMEOUT_MS;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      login: async () => ({ success: false, error: 'Auth not initialized' }),
      logout: () => {},
      loading: false,
      inactivityWarning: false,
      secondsRemaining: 60,
      resetInactivityTimer: () => {}
    };
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [inactivityWarning, setInactivityWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const lastActivityRef = useRef<number>(Date.now());
  const lastThrottledRef = useRef<number>(Date.now());
  const { showToast } = useToast();

  const triggerAutoLogout = useCallback(() => {
    try {
      sessionStorage.setItem(LOGOUT_REASON_KEY, 'inactivity');
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    } catch {
      // ignore
    }
    setUser(null);
    setInactivityWarning(false);
    showToast('warning', 'You have been automatically logged out due to inactivity.', 6000);
  }, [showToast]);

  const resetInactivityTimer = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;
    lastThrottledRef.current = now;
    try {
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    } catch {
      // ignore
    }
    setInactivityWarning(false);
    setSecondsRemaining(60);
  }, []);

  // Initial session restoration with expired check
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      const lastActivityStr = localStorage.getItem(LAST_ACTIVITY_KEY);
      const timeoutLimit = getInactivityTimeout();

      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.uid && parsed?.email) {
          if (lastActivityStr) {
            const lastActive = parseInt(lastActivityStr, 10);
            if (!isNaN(lastActive) && Date.now() - lastActive >= timeoutLimit) {
              // Session expired while user was away
              localStorage.removeItem(AUTH_STORAGE_KEY);
              localStorage.removeItem(LAST_ACTIVITY_KEY);
              sessionStorage.setItem(LOGOUT_REASON_KEY, 'inactivity');
              setUser(null);
              setLoading(false);
              return;
            }
          }
          setUser(parsed);
          const now = Date.now();
          lastActivityRef.current = now;
          localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
        }
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // Idle Activity Tracker & Auto-logout loop
  useEffect(() => {
    if (!user) {
      setInactivityWarning(false);
      return;
    }

    const now = Date.now();
    lastActivityRef.current = now;
    lastThrottledRef.current = now;
    try {
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    } catch {
      // ignore
    }

    // Throttled handler for user interaction events
    const handleActivity = () => {
      const current = Date.now();
      if (current - lastThrottledRef.current > ACTIVITY_THROTTLE_MS) {
        lastThrottledRef.current = current;
        lastActivityRef.current = current;
        try {
          localStorage.setItem(LAST_ACTIVITY_KEY, current.toString());
        } catch {
          // ignore
        }
      }

      // If user acts while warning is shown, dismiss warning & update
      setInactivityWarning((wasWarning) => {
        if (wasWarning) {
          lastActivityRef.current = current;
          try {
            localStorage.setItem(LAST_ACTIVITY_KEY, current.toString());
          } catch {
            // ignore
          }
          return false;
        }
        return false;
      });
    };

    const activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click',
      'wheel'
    ];

    activityEvents.forEach((evt) => {
      window.addEventListener(evt, handleActivity, { passive: true });
    });

    // Cross-tab synchronization
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LAST_ACTIVITY_KEY && e.newValue) {
        const remoteTime = parseInt(e.newValue, 10);
        if (!isNaN(remoteTime)) {
          lastActivityRef.current = remoteTime;
          setInactivityWarning(false);
        }
      } else if (e.key === AUTH_STORAGE_KEY && !e.newValue) {
        // Logged out in another tab
        setUser(null);
        setInactivityWarning(false);
      }
    };
    window.addEventListener('storage', handleStorage);

    // Tab visibility check (laptop wake / switching back to tab)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        const timeoutLimit = getInactivityTimeout();
        const currentIdle = Date.now() - lastActivityRef.current;
        if (currentIdle >= timeoutLimit) {
          triggerAutoLogout();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 1-second interval checker
    const intervalId = setInterval(() => {
      const timeoutLimit = getInactivityTimeout();
      const idleTime = Date.now() - lastActivityRef.current;

      if (idleTime >= timeoutLimit) {
        triggerAutoLogout();
      } else if (idleTime >= timeoutLimit - INACTIVITY_WARNING_MS) {
        const remaining = Math.max(1, Math.ceil((timeoutLimit - idleTime) / 1000));
        setSecondsRemaining(remaining);
        setInactivityWarning(true);
      } else {
        setInactivityWarning(false);
      }
    }, 1000);

    return () => {
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, handleActivity);
      });
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(intervalId);
    };
  }, [user, triggerAutoLogout]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await api.login(email, password);
      if (res.success && res.user) {
        const now = Date.now();
        lastActivityRef.current = now;
        lastThrottledRef.current = now;
        setUser(res.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.user));
        localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
        sessionStorage.removeItem(LOGOUT_REASON_KEY);
        return { success: true };
      }
      return {
        success: false,
        error: res.error || 'Invalid email or password.'
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Unable to connect to authentication server.'
      };
    }
  };

  const logout = (reason?: string) => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(LAST_ACTIVITY_KEY);
      if (reason === 'inactivity') {
        sessionStorage.setItem(LOGOUT_REASON_KEY, 'inactivity');
      } else {
        sessionStorage.removeItem(LOGOUT_REASON_KEY);
      }
    } catch {
      // ignore
    }
    setUser(null);
    setInactivityWarning(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        loading,
        inactivityWarning,
        secondsRemaining,
        resetInactivityTimer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
