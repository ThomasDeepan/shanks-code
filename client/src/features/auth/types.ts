/**
 * Authentication types.
 *
 * `role` was previously hardcoded to `'student'`. It is now a union so the
 * router can enforce route access by role, while the authoritative check
 * remains server-side (the backend must reject unauthorised requests
 * regardless of what the client renders).
 */

export type UserRole = 'student' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cohort?: string;
  avatar?: string;
  /** Optional institutional metadata surfaced on the student profile. */
  institution?: string;
  graduationYear?: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  institution?: string;
  graduationYear?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
