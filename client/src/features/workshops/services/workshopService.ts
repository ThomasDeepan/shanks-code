import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import contentStore from '@/services/content/contentStore';
import { workshopSeed } from '../data/workshopsData';
import type { Workshop } from '../types';

/**
 * Workshop Service
 * Single read path for workshop records, used by the public Workshops page, the
 * homepage preview and the Admin Dashboard.
 *
 * Mock mode: reads the browser content store (seeded from the verified
 * `workshopSeed`), so admin edits appear on the public pages immediately.
 * Live mode: GET /api/workshops — backend is the source of truth, zero silent
 * fallback.
 */
export const workshopService = {
  async getWorkshops(): Promise<Workshop[]> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      return contentStore.readCollection<Workshop>('workshops', workshopSeed);
    }

    return apiClient.get<Workshop[]>('/workshops');
  },
};

export default workshopService;
