import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import { ProgramItem } from '../components/ProgramCard';
import { DEVELOPMENT_PROGRAMS } from '../data/mockProgramsData';

/**
 * Program Service
 * Mediates curriculum discovery between UI components and backend/mock data.
 *
 * Proposed Endpoints:
 * - GET /api/programs
 * - GET /api/programs/:id
 */
export const programService = {
  /**
   * Retrieves academic program catalog.
   */
  async getPrograms(): Promise<ProgramItem[]> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      return [...DEVELOPMENT_PROGRAMS];
    }

    // Live mode: dispatch to real Node.js/Express backend (No silent fallback!)
    return apiClient.get<ProgramItem[]>('/programs');
  },

  /**
   * Retrieves single program details by ID.
   */
  async getProgramById(id: string): Promise<ProgramItem | null> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      const found = DEVELOPMENT_PROGRAMS.find((p) => p.id === id);
      return found ? { ...found } : null;
    }

    // Live mode: dispatch to real Node.js/Express backend
    return apiClient.get<ProgramItem>(`/programs/${id}`);
  },
};

export default programService;
