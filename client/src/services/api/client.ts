import { apiConfig } from './config';
import { ApiError } from './errors';
import { ApiErrorPayload, RequestOptions } from './types';

/**
 * Event name dispatched when the backend responds with HTTP 401 Unauthorized.
 * The application's AuthContext or Router listens to this to clear session state.
 */
export const SESSION_EXPIRED_EVENT = 'shanks:session-expired';

/**
 * Retrieves the stored authentication token from session storage, if present.
 * Uses Bearer token strategy (pending backend confirmation).
 */
export function getStoredAuthToken(): string | null {
  try {
    const raw = localStorage.getItem(apiConfig.sessionStorageKey);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session?.token || null;
  } catch {
    return null;
  }
}

/**
 * Dispatches session expired event and purges stored authentication credentials.
 */
export function handleSessionExpiration(): void {
  try {
    localStorage.removeItem(apiConfig.sessionStorageKey);
  } catch {
    // Ignore storage errors
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(SESSION_EXPIRED_EVENT, {
        detail: { message: 'Your session has expired. Please sign in again.' },
      })
    );
  }
}

/**
 * Base HTTP request execution engine for Shank's Code.
 *
 * CRITICAL RULE:
 * In live mode, this client communicates directly with the Node.js/Express backend.
 * There is ZERO silent fallback to mock data on network errors or HTTP failure.
 */
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers: customHeaders, ...restOptions } = options;

  // Construct URL with query parameters
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let url = `${apiConfig.baseUrl}${path}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  // Build standard headers
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  // Attach body content-type if not already specified
  if (restOptions.body && !(restOptions.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Attach JWT Bearer Authorization header if token exists (Pending backend confirmation)
  const token = getStoredAuthToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(url, {
      ...restOptions,
      headers,
    });
  } catch (networkError: unknown) {
    const rawMessage =
      networkError instanceof Error ? networkError.message : 'Network request failed';
    throw new ApiError(
      0,
      `Failed to connect to backend at ${url}: ${rawMessage}`,
      'NETWORK_ERROR'
    );
  }

  // Handle 401 Unauthorized: session expiration
  if (response.status === 401) {
    handleSessionExpiration();
    throw new ApiError(
      401,
      'Your session has expired or is invalid. Please sign in again.',
      'UNAUTHORIZED'
    );
  }

  // Handle other HTTP errors
  if (!response.ok) {
    let errorPayload: ApiErrorPayload | null = null;
    let rawText = '';

    try {
      rawText = await response.text();
      errorPayload = JSON.parse(rawText);
    } catch {
      // Body is not JSON
    }

    const message =
      errorPayload?.error?.message ||
      errorPayload?.message ||
      (rawText && rawText.length < 200 ? rawText : `HTTP ${response.status} ${response.statusText}`);

    const code = errorPayload?.error?.code || `HTTP_${response.status}`;
    const details = errorPayload?.error?.details;

    throw new ApiError(response.status, message, code, details);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  // Parse JSON response
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

/**
 * Clean HTTP API Client abstraction for feature services.
 */
export const apiClient = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  },

  put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  },

  patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

export default apiClient;
