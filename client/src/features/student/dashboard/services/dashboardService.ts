import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import { DevelopmentDashboardData } from '../types';
import { DEVELOPMENT_DASHBOARD_DATA } from '../data/mockDashboardData';

/**
 * Dashboard Service
 * Manages student dashboard summary metrics and active enrolled tracks.
 *
 * Proposed Endpoint:
 * - GET /api/student/dashboard
 */
export const dashboardService = {
  /**
   * Retrieves dashboard overview metrics and active courses for the student.
   */
  async getDashboardData(): Promise<DevelopmentDashboardData> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      return {
        ...DEVELOPMENT_DASHBOARD_DATA,
        activeCourses: [...DEVELOPMENT_DASHBOARD_DATA.activeCourses],
      };
    }

    // Live mode: dispatch to real Node.js/Express backend (No silent fallback!)
    return apiClient.get<DevelopmentDashboardData>('/student/dashboard');
  },
};

export default dashboardService;
