/**
 * About feature content — single source of truth.
 *
 * All copy below is the original website copy from
 * `features/home/components/AboutSection.tsx`, relocated here so the homepage
 * About section and the dedicated `/about` page render the SAME information.
 * Nothing has been re-worded or removed.
 */

export const aboutIdentity = {
  eyebrow: "About Shank's Code Edutech",
  headline: 'An operating training and research company, not a course marketplace.',
  paragraphs: [
    'Founded in 2023 in Villupuram, Tamil Nadu, we work with engineering and polytechnic students, ' +
      'colleges and industry partners on three things: practical technical training, accredited ' +
      'internships, and applied research with real prototypes.',
    'Our purpose is narrow and practical — close the distance between what a syllabus covers and what ' +
      'an engineering job actually requires, then leave students with work they can show.',
  ],
  image: {
    src: '/images/about-rnd-workspace.jpg',
    alt: 'Engineers testing an IoT sensor circuit board with an oscilloscope while reviewing live telemetry',
    width: 700,
    height: 450,
  },
} as const;

export interface VisionMissionItem {
  key: 'vision' | 'mission';
  label: string;
  body: string;
}

export const visionAndMission: VisionMissionItem[] = [
  {
    key: 'vision',
    label: 'Vision',
    body:
      'Become a recognised education and applied-research organisation that delivers sustainable ' +
      'engineering capability through technology-driven, verifiable training.',
  },
  {
    key: 'mission',
    label: 'Mission',
    body:
      'Run dedicated R&D labs, deliver industry-oriented project learning, support student patent ' +
      'filings and publications, and build indigenous technology for real problems.',
  },
];

export interface MethodologyStep {
  title: string;
  desc: string;
}

/**
 * The proven 5-step applied engineering methodology. This is the student
 * project methodology — it is deliberately distinct from the R&D workflow
 * (Identify → Research → Develop → Test → Deploy) shown on `/rnd`.
 */
export const methodologySteps: MethodologyStep[] = [
  {
    title: 'Problem Discovery & Industrial Requirements',
    desc: 'Formulate projects from live industry problem statements, user needs, and practical engineering constraints.',
  },
  {
    title: 'System Architecture & Schematic Design',
    desc: 'Plan hardware circuit topologies, sensor schematics, database schemas, and clean software architecture.',
  },
  {
    title: 'Iterative Implementation & Git Version Control',
    desc: 'Write production-grade code, interface microcontrollers, and commit verifiable milestones on GitHub.',
  },
  {
    title: 'Bench Testing, Telemetry & Simulation',
    desc: 'Subject prototypes to stress testing, logic analyzer validation, sensor calibration, and performance benchmarks.',
  },
  {
    title: 'Project Defense, IP Evaluation & Deployment',
    desc: 'Deliver formal technical reviews, investigate patentability, and deploy operational software and embedded hardware.',
  },
];

export const methodologyCopy = {
  eyebrow: 'Proven Engineering Pedagogy',
  title: '5-Step Applied Engineering Methodology',
  description:
    'Our structured educational framework turns theoretical concepts into verified practical mastery, ' +
    'so every learner builds demonstrable skills without shortcuts.',
  reviewLabel: 'Continuous Institutional Review:',
  reviewBody:
    'Evaluated against AICTE internship criteria, code cleanliness benchmarks, and industrial security standards.',
} as const;

/** Header copy for the `/about` route. */
export const aboutPageCopy = {
  eyebrow: 'About',
  title: 'A training and applied research company from Villupuram',
  intro:
    "Shank's Code Edutech is an EdTech and applied R&D organisation working with engineering and " +
    'polytechnic students, colleges and industry partners. This page brings together who we are, how we ' +
    'teach, the engineering method behind every program, and the credentials that back our work.',
  image: {
    src: '/images/about-rnd-lab.jpg',
    alt: 'Research engineers working on an applied computing and embedded systems prototype in the Shank’s Code lab',
    width: 800,
    height: 500,
  },
} as const;
