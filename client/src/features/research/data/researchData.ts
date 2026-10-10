/**
 * Applied R&D feature content — single source of truth.
 *
 * Originally declared inline inside
 * `features/home/components/ResearchDevelopmentSection.tsx` and relocated here
 * so the homepage section and the dedicated `/rnd` page render the SAME
 * records. No research area or workflow stage has been removed or re-worded.
 */

/** Icon key resolved by `RndFocusGrid`. */
export type RndAreaIcon = 'ai' | 'embedded' | 'analytics' | 'security';

export interface RndArea {
  icon: RndAreaIcon;
  title: string;
  description: string;
}

export const rndAreas: RndArea[] = [
  {
    icon: 'ai',
    title: 'AI & Machine Learning',
    description: 'Predictive models, computer vision and applied deep learning for industrial use.',
  },
  {
    icon: 'embedded',
    title: 'Embedded Systems & Robotics',
    description: 'Firmware architecture, sensor telemetry, ESP32/ARM platforms and robotics.',
  },
  {
    icon: 'analytics',
    title: 'Data Analytics & Telemetry',
    description: 'Telemetry ingestion, statistical pipelines and real-time decision dashboards.',
  },
  {
    icon: 'security',
    title: 'Cybersecurity & Cloud',
    description: 'Perimeter hardening, secure authentication, containerisation and cloud resilience.',
  },
];

export interface RndWorkflowStep {
  step: string;
  title: string;
  detail: string;
}

export const workflowSteps: RndWorkflowStep[] = [
  { step: '01', title: 'Identify', detail: 'Real-world problem and scope definition.' },
  { step: '02', title: 'Research', detail: 'Literature survey and algorithmic design.' },
  { step: '03', title: 'Develop', detail: 'Circuit prototyping, firmware and software builds.' },
  { step: '04', title: 'Test', detail: 'Bench validation and performance verification.' },
  { step: '05', title: 'Deploy', detail: 'Field deployment, publication and patent filing.' },
];

export const rndPageCopy = {
  eyebrow: 'Applied R&D Division',
  title: 'Research that has to survive the bench.',
  intro:
    'Our R&D division takes problems from industry and campus, builds the prototype, validates it on ' +
    'the bench, and publishes or patents what comes out of it. This page sets out the four focus areas, ' +
    'the five-stage workflow every engagement follows, and how the lab connects to programs and workshops.',
  image: {
    src: '/images/rnd-prototyping-lab.jpg',
    alt: 'Research engineer calibrating robotics sensors on a bench with an oscilloscope and live telemetry',
    width: 800,
    height: 500,
    caption: 'Applied computing & robotics lab',
  },
  /** Distinguishes the research lifecycle from the student project methodology. */
  methodologyNote:
    'The research lifecycle above is deliberately different from the 5-step applied engineering ' +
    'methodology used in student programs: research work is scoped by literature and novelty, while ' +
    'student projects are scoped by an industry or campus problem statement.',
} as const;
