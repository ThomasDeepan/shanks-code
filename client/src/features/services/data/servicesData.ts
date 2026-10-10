/**
 * Services feature content — single source of truth.
 *
 * This data was previously declared inline inside
 * `features/home/components/ServicesSection.tsx`. It now lives in the services
 * feature so that:
 *   - the homepage preview (`ServicesSection`), and
 *   - the dedicated page (`/services`, `ServicesPage`)
 *
 * render the SAME records without duplicating or re-wording any service
 * description. Nothing has been removed — only relocated.
 *
 * In live mode these records are served by `GET /api/services`.
 */

export interface ServiceItem {
  title: string;
  description: string;
  /** Lucide icon name resolved by `ServiceDomainCard`. */
  icon: 'graduation-cap' | 'building-2' | 'code-2' | 'cpu' | 'handshake';
  badge?: string;
  /** Capability chips restored from the original services section. */
  detail?: string;
}

export interface ServiceDomain {
  index: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  items: ServiceItem[];
}

export const serviceDomains: ServiceDomain[] = [
  {
    index: '01',
    title: 'Learning & Academic Programs',
    summary: 'Skill training, live lab environments and accredited internships for engineering students.',
    image: '/images/services-academic-training.jpg',
    imageAlt:
      'Instructor running a practical training session with engineering students at a college lab bench',
    items: [
      {
        title: 'Technical Training Programs',
        description: 'Classroom, online and hybrid delivery across emerging technology domains.',
        icon: 'graduation-cap',
      },
      {
        title: 'College Skill Development',
        description: 'Helping institutions align course outcomes with real workplace expectations.',
        icon: 'building-2',
      },
      {
        title: 'Internship Programs',
        description: 'AICTE-approved internships on live industry projects and systems.',
        icon: 'handshake',
        badge: 'AICTE Approved',
      },
    ],
  },
  {
    index: '02',
    title: 'Technology & Engineering',
    summary: 'Custom software systems, intelligent automation and hardware-software integration.',
    image: '/images/services-tech-engineering.jpg',
    imageAlt:
      'Engineer developing a web application while testing microcontroller telemetry at a workstation',
    items: [
      {
        title: 'Software Development',
        description: 'Web platforms, backend services, APIs and databases for institutions and businesses.',
        icon: 'code-2',
        detail: 'Cloud APIs • Modern Web Frontends • Databases',
      },
      {
        title: 'IoT & Automation',
        description: 'Sensor networks, industrial telemetry and remote monitoring dashboards.',
        icon: 'cpu',
        detail: 'Sensors • ESP32 • Industrial Telemetry',
      },
    ],
  },
  {
    index: '03',
    title: 'Institutional Partnerships',
    summary: 'MoUs, faculty enablement and career readiness for colleges and technical communities.',
    image: '/images/services-career-partnerships.jpg',
    imageAlt: 'Coordinator and mentor reviewing a student project plan with engineering graduates',
    items: [
      {
        title: 'Career Readiness',
        description: 'Portfolio curation, resume and mock-interview preparation for engineering roles.',
        icon: 'graduation-cap',
        detail: 'Mock Interviews • Portfolio Reviews • Guidance',
      },
      {
        title: 'College MoUs & Faculty Enablement',
        description: 'Long-term collaborations for applied R&D, faculty training and lab access.',
        icon: 'building-2',
        detail: 'College MoUs • Faculty Training • R&D Labs',
      },
    ],
  },
];

/**
 * Public copy for the `/services` page header. Kept alongside the data so the
 * page copy and the service records never drift apart.
 */
export const servicesPageCopy = {
  eyebrow: 'Services',
  title: 'What we do for students, colleges and industry',
  intro:
    'Three practice areas, one delivery standard: work that runs and can be evaluated. ' +
    'Every engagement — a single classroom, a full internship batch, or an applied R&D ' +
    'collaboration — is delivered through the same applied engineering method.',
} as const;
