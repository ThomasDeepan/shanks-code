/**
 * Centralized API Error Model & User-Facing Error Translators
 */

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;
  readonly userMessage: string;

  constructor(
    status: number,
    message: string,
    code = 'API_ERROR',
    details?: unknown,
    customUserMessage?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.userMessage = customUserMessage || getUserFriendlyErrorMessage(status, message);

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Maps raw HTTP status codes and backend errors to student-friendly, non-technical messages.
 * Prevents technical stack traces or backend internals from being displayed to students.
 */
export function getUserFriendlyErrorMessage(status: number, serverMessage?: string): string {
  switch (status) {
    case 0:
      return 'Unable to reach the server. Please check your internet connection or try again shortly.';
    case 400:
      return (
        serverMessage ||
        'The request could not be processed. Please check the provided information and try again.'
      );
    case 401:
      return 'Your session has expired. Please sign in again to continue.';
    case 403:
      return 'You do not have permission to access this course or feature.';
    case 404:
      return 'The requested resource or course material could not be found.';
    case 409:
      return (
        serverMessage ||
        'A conflict occurred with your current course state. Please refresh and try again.'
      );
    case 422:
      return (
        serverMessage ||
        'The submitted information is incomplete or invalid. Please check your entries.'
      );
    case 429:
      return 'Too many requests have been made in a short time. Please wait a moment before trying again.';
    case 500:
    case 502:
    case 503:
    case 504:
      return 'The learning platform server encountered an error. Our engineering team has been notified.';
    default:
      return serverMessage || 'An unexpected error occurred. Please try again.';
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
