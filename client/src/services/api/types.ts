/**
 * Common API Layer Types & Backend Interface Proposals
 *
 * NOTE: Schemas marked as PROPOSED are pending backend team confirmation (see docs/07-API-CONTRACT.md).
 */

import { AuthUser } from '@/features/auth/types';
import { LessonStatus } from '@/features/student/courses/types';

export type ApiMode = 'mock' | 'live';

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export interface ApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  message?: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

/* ==========================================================================
 * PROPOSED BACKEND CONTRACT SCHEMAS (PENDING BACKEND CONFIRMATION)
 * ========================================================================== */

/**
 * Proposed Login Payload
 * POST /api/auth/login
 */
export interface ProposedLoginRequest {
  email: string;
  password?: string;
}

export interface ProposedLoginResponse {
  token: string;
  user: AuthUser;
}

/**
 * Proposed Session Verification
 * GET /api/auth/me
 */
export interface ProposedCurrentUserResponse {
  user: AuthUser;
}

/**
 * Proposed Student Self-Registration Payload
 * POST /api/auth/register
 *
 * The backend owns password hashing, verification and session issuance. The
 * client submits credentials over the API only — no secret ever lives in the
 * browser bundle.
 */
export interface ProposedRegisterRequest {
  name: string;
  email: string;
  password: string;
  institution?: string;
  graduationYear?: string;
}

export interface ProposedRegisterResponse {
  token: string;
  user: AuthUser;
}

/**
 * Proposed Lesson Completion Payload
 * POST /api/student/courses/:courseId/lessons/:lessonId/complete
 */
export interface ProposedLessonCompletionResponse {
  completedLessonId: string;
  status: LessonStatus;
  nextLessonId?: string;
  nextLessonStatus?: LessonStatus;
  updatedCourseProgress?: number;
}
