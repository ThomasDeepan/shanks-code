import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthUser, AuthSession, LoginCredentials } from '../features/auth/types';
import authService from '../features/auth/services/authService';
import { SESSION_EXPIRED_EVENT } from '@/services/api/client';

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionExpiredMessage: string | null;
  clearSessionExpiredMessage: () => void;
  loginWithDemo: () => Promise<AuthSession>;
  loginWithCredentials: (credentials: LoginCredentials) => Promise<AuthSession>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState<string | null>(null);

  // Restore stored session on mount
  useEffect(() => {
    const session = authService.getStoredSession();
    if (session) {
      setUser(session.user);
      setToken(session.token);
    }
    setIsLoading(false);
  }, []);

  // Listen for 401 Unauthorized session expiration events from API client
  useEffect(() => {
    const onSessionExpired = (e: Event) => {
      const customEvent = e as CustomEvent<{ message?: string }>;
      setUser(null);
      setToken(null);
      setSessionExpiredMessage(
        customEvent.detail?.message || 'Your session has expired. Please sign in again.'
      );
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
    };
  }, []);

  const clearSessionExpiredMessage = useCallback(() => {
    setSessionExpiredMessage(null);
  }, []);

  const loginWithDemo = async (): Promise<AuthSession> => {
    setIsLoading(true);
    setSessionExpiredMessage(null);
    try {
      const session = await authService.loginWithDemo();
      setUser(session.user);
      setToken(session.token);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithCredentials = async (credentials: LoginCredentials): Promise<AuthSession> => {
    setIsLoading(true);
    setSessionExpiredMessage(null);
    try {
      const session = await authService.loginWithCredentials(credentials);
      setUser(session.user);
      setToken(session.token);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
    setToken(null);
    setSessionExpiredMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        sessionExpiredMessage,
        clearSessionExpiredMessage,
        loginWithDemo,
        loginWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
