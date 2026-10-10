import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import contentStore from '@/services/content/contentStore';
import { ProgramItem } from '../components/ProgramCard';
import { DEVELOPMENT_PROGRAMS } from '../data/mockProgramsData';

/**
 * Program Service
 * Mediates curriculum discovery between UI components and backend/mock data.
 *
 * Mock mode: reads the browser content store, seeded from the existing
 * `DEVELOPMENT_PROGRAMS` catalog, so program edits made in the Admin Dashboard
 * appear on `/programs` without a code change.
 * Live mode: GET /api/programs — backend is the source of truth, no silent
 * fallback.
 */
export const programService = {
  /**
   * Retrieves academic program catalog.
   */
  async getPrograms(): Promise<ProgramItem[]> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      return contentStore.readCollection<ProgramItem>('programs', DEVELOPMENT_PROGRAMS);
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
      const found = contentStore
        .readCollection<ProgramItem>('programs', DEVELOPMENT_PROGRAMS)
        .find((p) => p.id === id);
      return found ? { ...found } : null;
    }

    // Live mode: dispatch to real Node.js/Express backend
    return apiClient.get<ProgramItem>(`/programs/${id}`);
  },
};

export default programService;
