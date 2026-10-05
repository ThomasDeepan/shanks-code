import { ApiMode } from './types';

/**
 * Environment configuration for API connectivity.
 * Reads directly from Vite environment variables (VITE_API_MODE and VITE_API_BASE_URL).
 *
 * No localhost backend URLs are hard-coded in components or services.
 */

const rawMode = (import.meta.env.VITE_API_MODE || 'mock').toLowerCase();
const mode: ApiMode = rawMode === 'live' ? 'live' : 'mock';

// Ensure base URL does not have trailing slash for clean path concatenation
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const cleanBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

export const apiConfig = {
  mode,
  baseUrl: cleanBaseUrl,
  isMock: mode === 'mock',
  isLive: mode === 'live',
  sessionStorageKey: 'shanks_code_student_session',
  mockDelayMs: 250, // Simulated network latency in mock mode to exercise loading states
} as const;

export default apiConfig;
