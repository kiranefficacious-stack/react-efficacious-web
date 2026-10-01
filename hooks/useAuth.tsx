import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      const code = error?.code;
      let userFriendlyMessage = 'Invalid email or password. Please verify your credentials.';
      if (code === 'auth/too-many-requests') {
        userFriendlyMessage = 'Too many failed attempts. Please wait a few minutes before trying again.';
      } else if (code === 'auth/network-request-failed') {
        userFriendlyMessage = 'Network connection error. Please check your internet connection.';
      } else if (code === 'auth/user-disabled') {
        userFriendlyMessage = 'This account has been disabled. Please contact the administrator.';
      }
      return {
        success: false,
        error: userFriendlyMessage
      };
    }
  };

  const logoutAction = async () => {
    try {
        await signOut(auth);
    } catch(e) {
        if (import.meta.env.DEV) {
            console.error("Error signing out", e);
        }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout: logoutAction,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
