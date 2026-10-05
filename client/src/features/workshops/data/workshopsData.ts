import type { Workshop, WorkshopStat } from '../types';

/**
 * Workshops conducted by Shank's Code Edutech.
 * Content is derived from the official workshop reference material and is kept
 * deliberately factual: institution, location and audience are stated, and no
 * attendance figures, dates or outcomes are invented.
 */
export const workshops: Workshop[] = [
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
  },
];

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