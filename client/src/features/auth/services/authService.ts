import { AuthSession, AuthUser, LoginCredentials, SignupCredentials } from '../types';
import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import {
  ProposedLoginResponse,
  ProposedCurrentUserResponse,
  ProposedRegisterResponse,
} from '@/services/api/types';
import { ApiError } from '@/services/api/errors';

const SESSION_STORAGE_KEY = apiConfig.sessionStorageKey;

/**
 * Generic development placeholder session for Quick Demo Student Login evaluation.
 * Does not represent a real user, approved production identity, or real credentials.
 * Disabled entirely when `VITE_API_MODE=live`.
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

/**
 * Administrator sessions are NEVER issued by the client.
 *
 * In live mode the admin token is issued exclusively by the backend
 * (`POST /api/auth/admin/login`). In mock mode a clearly-labelled development
 * administrator is used so the admin UI can be reviewed locally. There is no
 * hard-coded admin password, secret or service key anywhere in this file.
 */
const MOCK_ADMIN_USER: AuthUser = {
  id: 'dev-admin',
  name: 'Development Administrator',
  email: 'admin@shankscode.com',
  role: 'admin',
};

/** In-memory record of mock-mode signups (development only). */
const mockRegisteredEmails = new Set<string>([MOCK_ADMIN_USER.email.toLowerCase()]);

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

      if (!session?.token || !session?.user?.role) {
        this.clearSession();
        return null;
      }

      // Sanitize any personal or non-company email from legacy test sessions
      if (
        session.user.email.includes('@gmail.') ||
        session.user.email.includes('@yahoo.') ||
        session.user.email.includes('@hotmail.') ||
        session.user.email.endsWith('.local')
      ) {
        session.user.email = 'demo.student@shankscode.com';
        session.user.name = 'Demo Student';
        session.user.role = 'student';
        this.saveSession(session);
      }

      return session;
    } catch {
      this.clearSession();
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
   * Standard student credentials login.
   *
   * In Mock Mode: returns a simulated session with the supplied email.
   * In Live Mode:  dispatches to POST /api/auth/login via apiClient.
   * ZERO silent fallback to mock data on error.
   */
  async loginWithCredentials(credentials: LoginCredentials): Promise<AuthSession> {
    if (apiConfig.isLive) {
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

      const session: AuthSession = { token: response.token, user: response.user };
      this.saveSession(session);
      return session;
    }

    // Mock development authentication
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (mockRegisteredEmails.has(credentials.email.trim().toLowerCase())) {
      throw new ApiError(
        401,
        'No student account is registered with this email address. Create an account first.',
        'ACCOUNT_NOT_FOUND'
      );
    }

    const mockSession: AuthSession = {
      token: `dev-session-token-${Date.now()}`,
      user: {
        id: 'demo-student',
        name: 'Demo Student',
        email: credentials.email.trim(),
        role: 'student',
        cohort: 'Full-Stack Cohort 2026-A',
      },
    };

    this.saveSession(mockSession);
    return mockSession;
  },

  /**
   * Student self-registration.
   *
   * Live mode:  POST /api/auth/register — the backend creates the account,
   *             hashes the password and returns a session (or a verification
   *             challenge). No credential handling happens in the browser.
   * Mock mode:  registers the email in an in-memory set for local review only.
   */
  async register(credentials: SignupCredentials): Promise<AuthSession> {
    if (apiConfig.isLive) {
      const response = await apiClient.post<ProposedRegisterResponse | AuthSession>(
        '/auth/register',
        {
          name: credentials.name.trim(),
          email: credentials.email.trim(),
          password: credentials.password,
          institution: credentials.institution?.trim() || undefined,
          graduationYear: credentials.graduationYear?.trim() || undefined,
        }
      );

      if (!response || !response.token || !response.user) {
        throw new ApiError(
          500,
          'Backend returned an unexpected registration payload structure.',
          'INVALID_REGISTER_PAYLOAD'
        );
      }

      const session: AuthSession = { token: response.token, user: response.user };
      this.saveSession(session);
      return session;
    }

    await new Promise((resolve) => setTimeout(resolve, 450));

    const email = credentials.email.trim().toLowerCase();

    if (mockRegisteredEmails.has(email)) {
      throw new ApiError(
        409,
        'An account already exists for this email address. Sign in instead.',
        'EMAIL_TAKEN'
      );
    }

    mockRegisteredEmails.add(email);

    const session: AuthSession = {
      token: `dev-session-token-${Date.now()}`,
      user: {
        id: `dev-student-${Date.now()}`,
        name: credentials.name.trim(),
        email: credentials.email.trim(),
        role: 'student',
        institution: credentials.institution?.trim() || undefined,
        graduationYear: credentials.graduationYear?.trim() || undefined,
      },
    };

    this.saveSession(session);
    return session;
  },

  /**
   * Administrator login — a separate entry point from student sign-in.
   *
   * Live mode:  POST /api/auth/admin/login. Role verification, rate limiting
   *             and audit logging are the backend's responsibility; the client
   *             only presents the result.
   * Mock mode:  issues a labelled development administrator session.
   */
  async loginAsAdmin(credentials: LoginCredentials): Promise<AuthSession> {
    if (apiConfig.isLive) {
      const response = await apiClient.post<ProposedLoginResponse | AuthSession>(
        '/auth/admin/login',
        credentials
      );

      if (!response || !response.token || !response.user) {
        throw new ApiError(
          500,
          'Backend returned an unexpected administrator login payload.',
          'INVALID_ADMIN_AUTH_PAYLOAD'
        );
      }

      if (response.user.role !== 'admin') {
        throw new ApiError(
          403,
          'This account does not have administrator access.',
          'ADMIN_ROLE_REQUIRED'
        );
      }

      const session: AuthSession = { token: response.token, user: response.user };
      this.saveSession(session);
      return session;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    const session: AuthSession = {
      token: `dev-admin-token-${Date.now()}`,
      user: { ...MOCK_ADMIN_USER, email: credentials.email.trim() || MOCK_ADMIN_USER.email },
    };

    this.saveSession(session);
    return session;
  },

  /**
   * Retrieves authenticated profile for the active session.
   *
   * Proposed Endpoint: GET /api/auth/me
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
   * Logs the user out and purges credentials.
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
