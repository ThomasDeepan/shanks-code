import { DevelopmentCourse } from '../types';
import { calculateCourseProgress } from '../utils/progress';

export { calculateCourseProgress };

/**
 * Enrolled course records and modular curriculum syllabus.
 */
export const DEVELOPMENT_ENROLLED_COURSES: DevelopmentCourse[] = [
  {
    id: 'dev-course-01',
    title: 'Full-Stack Software Engineering',
    description:
      'Build production-ready web applications using TypeScript, React component architecture, custom hook composition, and REST API integration with authenticated session handling.',
    category: 'Full Stack',
    modules: [
      {
        id: 'mod-01-01',
        title: 'Module 1: Modern JavaScript & TypeScript Foundations',
        description: 'Type-safe application engineering with TypeScript compiler configurations, union discriminants, asynchronous Promise pipelines, and Vite module bundling.',
        lessons: [
          {
            id: 'les-01-01',
            title: 'TypeScript Type System & Interface Design',
            status: 'completed',
            duration: '25 min',
          },
          {
            id: 'les-01-02',
            title: 'Asynchronous Programming & Promise Pipelines',
            status: 'completed',
            duration: '30 min',
          },
          {
            id: 'les-01-03',
            title: 'Modular Architecture & Modern Bundling',
            status: 'completed',
            duration: '20 min',
          },
        ],
      },
      {
        id: 'mod-01-02',
        title: 'Module 2: Component Architecture & State Management',
        description: 'Declarative React component rendering, immutable state updates, React Context boundaries for auth sessions, and custom hook logic extraction.',
        lessons: [
          {
            id: 'les-02-01',
            title: 'Component Lifecycle & Declarative State',
            status: 'completed',
            duration: '35 min',
          },
          {
            id: 'les-02-02',
            title: 'Context API & Global State Containers',
            status: 'in-progress',
            duration: '40 min',
          },
          {
            id: 'les-02-03',
            title: 'Custom Hooks & Reusable Logic Extraction',
            status: 'locked',
            duration: '30 min',
          },
        ],
      },
      {
        id: 'mod-01-03',
        title: 'Module 3: Full-Stack Client-Server Integration',
        description: 'HTTP client implementation, JSON response validation, bearer token authentication persistence, and protected route guards in React Router.',
        lessons: [
          {
            id: 'les-03-01',
            title: 'REST API Consumption & Resilient Fetching',
            status: 'locked',
            duration: '35 min',
          },
          {
            id: 'les-03-02',
            title: 'Client Route Guards & Session Hydration',
            status: 'locked',
            duration: '25 min',
          },
        ],
      },
    ],
  },
  {
    id: 'dev-course-02',
    title: 'Backend Services & Distributed APIs',
    description:
      'Design and build production Node.js and Express backend services with modular routing controllers, relational PostgreSQL schemas, middleware validation, and centralized error handling.',
    category: 'Systems & Cloud',
    modules: [
      {
        id: 'mod-02-01',
        title: 'Module 1: RESTful API Design & Express Middleware',
        description: 'HTTP request-response semantics, idempotent RESTful endpoints, Express router pipelines, and centralized middleware error handling.',
        lessons: [
          {
            id: 'les-21-01',
            title: 'HTTP Semantics & RESTful Contract Principles',
            status: 'completed',
            duration: '25 min',
          },
          {
            id: 'les-21-02',
            title: 'Express Routing & Controller Separation',
            status: 'in-progress',
            duration: '35 min',
          },
          {
            id: 'les-21-03',
            title: 'Centralized Error Handling & Middleware Pipelines',
            status: 'locked',
            duration: '30 min',
          },
        ],
      },
      {
        id: 'mod-02-02',
        title: 'Module 2: Database Persistence & Data Models',
        description: 'Relational database modeling with PostgreSQL, primary and foreign key constraints, index design, schema migrations, and input validation.',
        lessons: [
          {
            id: 'les-22-01',
            title: 'Relational Schema Design & Constraints',
            status: 'locked',
            duration: '40 min',
          },
          {
            id: 'les-22-02',
            title: 'Data Validation & Defensive Programming',
            status: 'locked',
            duration: '30 min',
          },
        ],
      },
    ],
  },
];
