// Authentication utilities for localStorage-based auth (development)

export interface User {
  email: string;
  name: string;
}

const AUTH_STORAGE_KEY = 'efficacious_admin_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds



// Login user and store session
export const loginUser = (email: string): User => {
  const user: User = {
    email,
    name: 'Admin User'
  };

  const session = {
    user,
    timestamp: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  return user;
};

// Logout user and clear session
export const logoutUser = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

// Get current user from session
export const getCurrentUser = (): User | null => {
  const sessionData = localStorage.getItem(AUTH_STORAGE_KEY);
  
  if (!sessionData) {
    return null;
  }

  try {
    const session = JSON.parse(sessionData);
    
    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      logoutUser();
      return null;
    }

    return session.user;
  } catch (error) {
    logoutUser();
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Extend session (refresh expiry)
export const extendSession = (): void => {
  const user = getCurrentUser();
  if (user) {
    loginUser(user.email);
  }
};
