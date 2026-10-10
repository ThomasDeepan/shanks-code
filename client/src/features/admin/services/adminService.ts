import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import contentStore, { type CollectionKey } from '@/services/content/contentStore';
import type { ProgramItem } from '@/features/programs/components/ProgramCard';
import { DEVELOPMENT_PROGRAMS } from '@/features/programs/data/mockProgramsData';
import type { Workshop } from '@/features/workshops/types';
import { workshopSeed } from '@/features/workshops/data/workshopsData';
import type { AdminStudentRecord, Announcement, RndProject } from '../types';
import { announcementSeed, rndProjectSeed } from '../data/adminSeedData';

/**
 * Admin Service
 * CRUD access for the content an administrator manages.
 *
 * SECURITY MODEL
 * ---------------
 * - In live mode every call is an authenticated REST request. The backend MUST
 *   verify the admin role on each endpoint; the client-side `ProtectedRoute` is
 *   only a UX guard and is not a security boundary.
 * - No API keys, service-role tokens, passwords or other secrets exist in this
 *   file or anywhere else in the client bundle. Credentials would be supplied by
 *   the backend through `VITE_API_BASE_URL`.
 * - In mock mode writes go to the browser content store, which is per-browser
 *   development state only.
 */

type SeedMap = {
  programs: ProgramItem[];
  workshops: Workshop[];
  announcements: Announcement[];
  rndProjects: RndProject[];
};

const SEEDS: SeedMap = {
  programs: DEVELOPMENT_PROGRAMS,
  workshops: workshopSeed,
  announcements: announcementSeed,
  rndProjects: rndProjectSeed,
};

const ENDPOINTS: Record<keyof SeedMap, string> = {
  programs: '/admin/programs',
  workshops: '/admin/workshops',
  announcements: '/admin/announcements',
  rndProjects: '/admin/rnd-projects',
};

const simulateLatency = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
};

/** Narrows the seed map entry to the item array of the collection key. */
const seedFor = <K extends keyof SeedMap>(key: K): SeedMap[K][number][] =>
  SEEDS[key] as SeedMap[K][number][];

export const adminService = {
  /** Generic list for a managed collection. */
  async list<K extends keyof SeedMap>(key: K): Promise<SeedMap[K]> {
    if (apiConfig.isMock) {
      await simulateLatency();
      return contentStore.readCollection<SeedMap[K][number]>(
        key as CollectionKey,
        seedFor(key)
      ) as SeedMap[K];
    }

    return apiClient.get<SeedMap[K]>(ENDPOINTS[key]);
  },

  /** Creates a record. Returns the persisted record from the source of truth. */
  async create<K extends keyof SeedMap>(key: K, item: SeedMap[K][number]): Promise<SeedMap[K]> {
    if (apiConfig.isMock) {
      await simulateLatency();
      return contentStore.insertItem(key as CollectionKey, seedFor(key), item) as SeedMap[K];
    }

    return apiClient.post<SeedMap[K]>(ENDPOINTS[key], item);
  },

  /** Updates a record by id. */
  async update<K extends keyof SeedMap>(
    key: K,
    id: string,
    patch: Partial<SeedMap[K][number]>
  ): Promise<SeedMap[K]> {
    if (apiConfig.isMock) {
      await simulateLatency();
      return contentStore.updateItem(key as CollectionKey, seedFor(key), id, patch) as SeedMap[K];
    }

    return apiClient.patch<SeedMap[K]>(`${ENDPOINTS[key]}/${id}`, patch);
  },

  /**
   * Deletes a record by id.
   *
   * Callers MUST confirm with the user first — the admin UI presents an explicit
   * confirmation dialog naming the record before this is invoked.
   */
  async remove<K extends keyof SeedMap>(key: K, id: string): Promise<SeedMap[K]> {
    if (apiConfig.isMock) {
      await simulateLatency();
      return contentStore.removeItem(key as CollectionKey, seedFor(key), id) as SeedMap[K];
    }

    await apiClient.delete(`${ENDPOINTS[key]}/${id}`);
    return adminService.list(key);
  },

  /**
   * Restores a collection to the verified seed content shipped with the project.
   * Useful after testing edits; never touches live data.
   */
  async restoreSeed<K extends keyof SeedMap>(key: K): Promise<SeedMap[K]> {
    if (apiConfig.isLive) {
      throw new Error('Seeding is a development-only operation.');
    }

    await simulateLatency();
    return contentStore.resetCollection(key as CollectionKey, seedFor(key)) as SeedMap[K];
  },

  /**
   * Student records.
   *
   * There is deliberately NO mock implementation: student data is personal and
   * must come from the backend. In mock mode this returns an empty list so the
   * UI renders a truthful empty state instead of invented students.
   */
  async listStudents(): Promise<AdminStudentRecord[]> {
    if (apiConfig.isMock) {
      await simulateLatency();
      return [];
    }

    return apiClient.get<AdminStudentRecord[]>('/admin/students');
  },
};

export default adminService;
