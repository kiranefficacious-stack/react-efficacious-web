import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, loginUser, logoutUser, getCurrentUser, validateCredentials } from '../utils/auth';

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

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate credentials
      if (!validateCredentials(email, password)) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Login user
      const loggedInUser = loginUser(email);
      setUser(loggedInUser);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred during login'
      };
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
