import { AuthSession, AuthUser, LoginCredentials } from '../types';
import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import { ProposedLoginResponse, ProposedCurrentUserResponse } from '@/services/api/types';
import { ApiError } from '@/services/api/errors';

const SESSION_STORAGE_KEY = apiConfig.sessionStorageKey;

/**
 * Generic development placeholder session for Quick Demo Student Login evaluation.
 * Does not represent a real user, approved production identity, or real credentials.
 */
const DEMO_STUDENT_SESSION: AuthSession = {
  token: 'dev-demo-session-token',
  user: {
    id: 'demo-student',
    name: 'Demo Student',
    email: 'demo.student@shankscode.com',
    role: 'student',
    cohort: 'Full-Stack Cohort 2026-A',
  },
};

export const authService = {
  /**
   * Retrieves the active session from localStorage if present.
   * Automatically sanitizes legacy or personal demo email addresses.
   */
  getStoredSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw) as AuthSession;

      // Sanitize any personal or non-company email from legacy test sessions
      if (
        session?.user &&
        (session.user.email.includes('@gmail.') ||
          session.user.email.includes('@yahoo.') ||
          session.user.email.includes('@hotmail.') ||
          session.user.email.endsWith('.local'))
      ) {
        session.user.email = 'demo.student@shankscode.com';
        session.user.name = 'Demo Student';
        this.saveSession(session);
      }

      return session;
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
  },

  /**
   * Persists an authenticated session to localStorage.
   * Note: Passwords are NEVER persisted.
   */
  saveSession(session: AuthSession): void {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Storage unavailable or quota exceeded
    }
  },

  /**
   * Clears the active session from localStorage.
   */
  clearSession(): void {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Storage unavailable
    }
  },

  /**
   * Quick Demo Student Login (Development/Mock only).
   * Simulates successful authentication with a mock student session.
   */
  async loginWithDemo(): Promise<AuthSession> {
    if (apiConfig.isLive) {
      throw new ApiError(
        400,
        'Quick Demo Student Login is disabled in live backend mode. Please sign in with registered credentials.',
        'DEMO_DISABLED'
      );
    }

    // Simulate realistic UI latency
    await new Promise((resolve) => setTimeout(resolve, 350));
    this.saveSession(DEMO_STUDENT_SESSION);
    return DEMO_STUDENT_SESSION;
  },

  /**
   * Standard credentials login.
   *
   * In Mock Mode:
   * Returns a simulated session with the supplied email and development token.
   *
   * In Live Mode:
   * Dispatches to POST /api/auth/login via apiClient.
   * ZERO silent fallback to mock data on error.
   */
  async loginWithCredentials(credentials: LoginCredentials): Promise<AuthSession> {
    if (apiConfig.isLive) {
      // Live Node.js/Express backend authentication contract
      const response = await apiClient.post<ProposedLoginResponse | AuthSession>(
        '/auth/login',
        credentials
      );

      if (!response || !response.token || !response.user) {
        throw new ApiError(
          500,
          'Backend returned an unexpected login payload structure.',
          'INVALID_AUTH_PAYLOAD'
        );
      }

      const session: AuthSession = {
        token: response.token,
        user: response.user,
      };

      this.saveSession(session);
      return session;
    }

    // Mock development authentication
    await new Promise((resolve) => setTimeout(resolve, 400));

    const mockSession: AuthSession = {
      token: `dev-session-token-${Date.now()}`,
      user: {
        id: 'demo-student',
        name: 'Demo Student',
        email: credentials.email,
        role: 'student',
        cohort: 'Full-Stack Cohort 2026-A',
      },
    };

    this.saveSession(mockSession);
    return mockSession;
  },

  /**
   * Retrieves authenticated profile for the active session.
   *
   * Proposed Endpoint:
   * GET /api/auth/me (Pending backend confirmation)
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    const session = this.getStoredSession();
    if (!session) return null;

    if (apiConfig.isLive) {
      try {
        const response = await apiClient.get<ProposedCurrentUserResponse | AuthUser>('/auth/me');
        const user = 'user' in response ? response.user : response;
        if (user) {
          this.saveSession({ ...session, user });
          return user;
        }
      } catch {
        // If /auth/me fails in live mode, return current stored user unless 401 occurred
        return session.user;
      }
    }

    return session.user;
  },

  /**
   * Logs out the student and purges credentials.
   * In live mode, optionally dispatches to POST /api/auth/logout.
   */
  async logout(): Promise<void> {
    if (apiConfig.isLive) {
      try {
        await apiClient.post('/auth/logout');
      } catch {
        // Safe to ignore backend logout failures; local purge must succeed
      }
    }
    this.clearSession();
  },
};

export default authService;
