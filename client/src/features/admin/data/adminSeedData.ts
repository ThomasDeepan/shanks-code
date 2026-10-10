import type { Announcement, RndProject } from '../types';

/**
 * SEED DATA for admin-managed collections.
 *
 * Both collections are intentionally EMPTY:
 *   - No announcements have been published on the site yet.
 *   - No individual R&D project records are published yet (the public `/rnd`
 *     page documents the division's focus areas and workflow instead).
 *
 * Seeding them empty keeps the admin honest — the UI shows empty states until
 * real records are entered, instead of inventing sample students, announcements
 * or research outcomes.
 */
export const announcementSeed: Announcement[] = [];

export const rndProjectSeed: RndProject[] = [];
