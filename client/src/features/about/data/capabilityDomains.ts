/**
 * TECH_DOMAIN_NODES — restored verbatim from the original `AppliedTechCore3D`
 * technology graph. Names, categories, descriptions and layout positions are the
 * original values; do not substitute placeholder or invented figures.
 *
 * Meaning: the four engineering capability domains that orbit the Shank's Code
 * core. This is structural (what we work on), not statistical.
 */
export interface TechDomainNode {
  id: string;
  name: string;
  category: string;
  desc: string;
  /** Layout slot in the 2x2 diamond around the core hub. */
  position: [number, number];
}

export const TECH_DOMAIN_NODES: TechDomainNode[] = [
  {
    id: 'software',
    name: 'Software Systems',
    category: 'Architecture & Cloud',
    desc: 'Distributed backends, reactive web apps & enterprise APIs',
    position: [2.5, 0.9],
  },
  {
    id: 'ai-data',
    name: 'AI & Data Science',
    category: 'Intelligent Systems',
    desc: 'Machine learning pipelines, predictive neural models & analytics',
    position: [-2.4, 1.3],
  },
  {
    id: 'iot-embedded',
    name: 'IoT & Embedded',
    category: 'Hardware Systems',
    desc: 'Microcontrollers, industrial telemetry, ESP32 & sensors',
    position: [-2.1, -1.5],
  },
  {
    id: 'rnd',
    name: 'Applied R&D Lab',
    category: 'Engineering Research',
    desc: 'Rapid hardware-software prototyping & defensible patents',
    position: [2.3, -1.4],
  },
];

export const TECH_CORE = {
  name: 'Shank’s Code',
  category: 'Applied Engineering',
  desc: 'Training, workshops, internships and applied R&D',
} as const;