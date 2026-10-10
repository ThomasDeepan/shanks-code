/**
 * Admin feature types.
 *
 * Only content that genuinely benefits from being managed by an administrator
 * is modelled here: programs, workshops, announcements and R&D project records.
 * Student records are read-only from the backend — the client never fabricates
 * them.
 */

export interface Announcement {
  id: string;
  title: string;
  body: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  audience: 'students' | 'colleges' | 'public';
  published: boolean;
}

export type RndProjectStage =
  | 'scoping'
  | 'research'
  | 'development'
  | 'validation'
  | 'deployed';

export interface RndProject {
  id: string;
  title: string;
  area: string;
  summary: string;
  stage: RndProjectStage;
  /** Optional publication or patent reference. */
  reference?: string;
}

/**
 * Read-only student record as returned by the backend.
 * Deliberately has no mock implementation — the admin list renders an empty
 * state until the API provides real records.
 */
export interface AdminStudentRecord {
  id: string;
  name: string;
  email: string;
  institution?: string;
  cohort?: string;
  enrolledProgramIds: string[];
  accountStatus: 'active' | 'invited' | 'suspended';
}
