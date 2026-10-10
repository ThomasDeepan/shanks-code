import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import type { StudentPortalData } from '../types';

/**
 * Student Portal Service
 * Single read path for the records shown on the student dashboard: profile,
 * enrollments, internships, workshop participation, certificates, applications
 * and announcements.
 *
 * Mock mode: returns EMPTY collections and a null profile. No student record is
 * fabricated — the dashboard shows honest empty states ("No enrolled programs
 * yet.") until the backend is connected.
 * Live mode:  GET /api/student/portal — backend is the source of truth, zero
 * silent fallback.
 */

export const EMPTY_PORTAL_DATA: StudentPortalData = {
  profile: null,
  enrollments: [],
  internships: [],
  workshops: [],
  certificates: [],
  applications: [],
  announcements: [],
};

export const studentPortalService = {
  async getPortalData(): Promise<StudentPortalData> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      return {
        ...EMPTY_PORTAL_DATA,
        enrollments: [],
        internships: [],
        workshops: [],
        certificates: [],
        applications: [],
        announcements: [],
      };
    }

    return apiClient.get<StudentPortalData>('/student/portal');
  },
};

export default studentPortalService;
