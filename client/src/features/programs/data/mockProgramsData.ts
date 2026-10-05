import { ProgramItem } from '../components/ProgramCard';

/**
 * DEVELOPMENT_PROGRAMS: Development preview data for curriculum discovery UI.
 *
 * Official Technology Areas: 'Full Stack & Software', 'IoT & Embedded Systems', 'AI & Data Science'.
 * Does not invent course fees, pricing, instructor claims, or guaranteed completion stats.
 */
export const DEVELOPMENT_PROGRAMS: ProgramItem[] = [
  {
    id: 'sample-fullstack',
    title: 'Full-Stack Software Engineering',
    category: 'Full Stack & Software',
    duration: 'Estimated 24 Weeks',
    level: 'Intermediate',
    description:
      'Curriculum structure preview covering modern frontend interfaces, distributed backend services, and clean system architectures.',
    skills: ['TypeScript', 'React', 'Node.js', 'Docker', 'PostgreSQL'],
  },
  {
    id: 'sample-systems',
    title: 'Systems Architecture & Backend Services',
    category: 'Full Stack & Software',
    duration: 'Estimated 16 Weeks',
    level: 'Advanced',
    description:
      'Curriculum structure preview covering scalable APIs, relational & document datastores, caching strategies, and robust service design.',
    skills: ['Node.js', 'Express', 'SQL', 'Redis', 'REST Architecture'],
  },
  {
    id: 'sample-iot-embedded',
    title: 'IoT & Embedded Systems Engineering',
    category: 'IoT & Embedded Systems',
    duration: 'Estimated 16 Weeks',
    level: 'Intermediate',
    description:
      'Curriculum structure preview covering microcontrollers, ESP32/Raspberry Pi, sensor interfacing, and industrial IoT monitoring.',
    skills: ['ESP32', 'Embedded C', 'Raspberry Pi', 'MQTT', 'Sensors'],
  },
  {
    id: 'sample-ai-ds',
    title: 'AI & Data Science Systems',
    category: 'AI & Data Science',
    duration: 'Estimated 20 Weeks',
    level: 'Intermediate',
    description:
      'Curriculum structure preview exploring predictive analytics, machine learning pipelines, data visualization, and applied models.',
    skills: ['Python', 'Pandas', 'Machine Learning', 'Data Pipelines', 'Deep Learning'],
  },
];
