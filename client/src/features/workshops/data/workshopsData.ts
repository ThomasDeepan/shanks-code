import type { Workshop, WorkshopStat } from '../types';

/**
 * Workshops conducted by Shank's Code Edutech — SEED DATA.
 *
 * This is the verified original content from the workshop reference material:
 * institution, location and audience are stated, and no attendance figures,
 * dates or outcomes are invented.
 *
 * These records seed the browser content store, which is what both the public
 * `/workshops` page and the Admin Dashboard read (see
 * `features/workshops/services/workshopService.ts`). Editing a workshop in the
 * admin updates the public page; "Restore original content" resets to this seed.
 */
export const workshopSeed: Workshop[] = [
  {
    id: 'ucev-villupuram',
    code: 'WS-01',
    title: 'Sponsored Technical Workshop',
    institution: 'UCEV',
    location: 'Villupuram, Tamil Nadu',
    audience: 'Engineering Colleges',
    summary:
      'A sponsored campus session running hands-on circuit building, microcontroller programming and live hardware demonstrations.',
    focus: ['Embedded Systems', 'Live Demos', 'Hardware Build'],
    status: 'completed',
  },
  {
    id: 'polytechnic-vellore',
    code: 'WS-02',
    title: 'Workshop for Polytechnic Students',
    institution: 'Polytechnic Colleges',
    location: 'Vellore, Tamil Nadu',
    audience: 'Polytechnic Colleges',
    summary:
      'A practical session designed for diploma and polytechnic learners, centred on core electronics, basic programming and workshop tooling discipline.',
    focus: ['Practical Electronics', 'Basic Programming', 'Tooling'],
    status: 'completed',
  },
  {
    id: 'mam-engineering-college',
    code: 'WS-03',
    title: 'Engineering Skills Workshop',
    institution: 'MAM Engineering College',
    location: 'Tamil Nadu, India',
    audience: 'Engineering Colleges',
    summary:
      'An applied engineering workshop covering project development workflow, system design fundamentals and demonstrable build practice.',
    focus: ['System Design', 'Project Workflow', 'Applied Build'],
    status: 'completed',
  },
  {
    id: 'saveetha-engineering-college',
    code: 'WS-04',
    title: 'Applied Technology Workshop',
    institution: 'Saveetha Engineering College',
    location: 'Tamil Nadu, India',
    audience: 'Engineering Colleges',
    summary:
      'A technology-focused session bridging classroom theory with working software and hardware systems students can assemble themselves.',
    focus: ['Software Systems', 'IoT', 'Student Projects'],
    status: 'completed',
  },
];

/**
 * Direct access to the seed records. Prefer `workshopService.getWorkshops()` in
 * components so admin edits are reflected.
 */
export const workshops: Workshop[] = workshopSeed;

/**
 * Workshop impact figures. These live here so the same numbers are rendered by
 * the homepage preview and the Workshops page — never duplicated elsewhere.
 */
export const workshopStats: WorkshopStat[] = [
  { value: '1000+', label: 'Students Trained' },
  { value: '25+', label: 'Workshops Conducted' },
  { value: '10+', label: 'Colleges Collaborated' },
  { value: 'Hands-on', label: 'Practical Learning' },
];

/** Audiences we run workshops for. Used on the Workshops page only. */
export const workshopAudiences: string[] = [
  'Engineering Colleges',
  'Polytechnic Colleges',
  'Academic Institutions',
  'Students',
  'Technical Communities',
];