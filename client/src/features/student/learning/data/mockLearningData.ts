import { LearningCourse, DetailedLesson } from '../types';

/**
 * Enrolled course curriculum data for student learning environment.
 * Provides detailed module syllabus, technical lecture metadata, and reference code.
 */
export const DEVELOPMENT_LEARNING_COURSES: LearningCourse[] = [
  {
    id: 'dev-course-01',
    title: 'Full-Stack Software Engineering',
    category: 'Full Stack',
    modules: [
      {
        id: 'mod-01-01',
        title: 'Module 1: Modern JavaScript & TypeScript Foundations',
        lessons: [
          {
            id: 'les-01-01',
            moduleId: 'mod-01-01',
            moduleTitle: 'Module 1: Modern JavaScript & TypeScript Foundations',
            courseId: 'dev-course-01',
            title: 'TypeScript Type System & Interface Design',
            status: 'completed',
            duration: '25 min',
            videoDurationSeconds: 1500,
            summary:
              'Define strict TypeScript interfaces, discriminated unions, and generic constraints to enforce compile-time data contracts across application boundaries.',
            keyTakeaways: [
              'Use discriminated unions with a status literal tag to represent idle, loading, success, and error API states without runtime type assertions.',
              'Enable strict compiler options (strictNullChecks, noImplicitAny) in tsconfig.json to prevent unhandled null or undefined references.',
              'Model shared data contracts using extensible interfaces and reserve type aliases for unions, intersections, and mapped types.',
            ],
            notes:
              'Strong type contracts establish clear architectural boundaries between frontend components and backend payload schemas. In React applications, typing component props ensures that breaking API changes are caught immediately during compilation rather than in production.',
            codeSnippet: {
              language: 'typescript',
              code: `interface UserProfile {\n  id: string;\n  name: string;\n  role: 'student' | 'instructor' | 'admin';\n}\n\ntype AsyncState<T> =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: T }\n  | { status: 'error'; message: string };`,
            },
          },
          {
            id: 'les-01-02',
            moduleId: 'mod-01-01',
            moduleTitle: 'Module 1: Modern JavaScript & TypeScript Foundations',
            courseId: 'dev-course-01',
            title: 'Asynchronous Programming & Promise Pipelines',
            status: 'completed',
            duration: '30 min',
            videoDurationSeconds: 1800,
            summary:
              'Coordinate asynchronous data fetching using async/await, concurrent Promise.allSettled execution, and structured error handling for network requests.',
            keyTakeaways: [
              'Execute independent network requests concurrently with Promise.allSettled to prevent one failing endpoint from aborting the entire page render.',
              'Structure async functions with explicit try/catch blocks that normalize HTTP response status codes into typed application error objects.',
              'Attach AbortController signals to window.fetch calls to cancel pending network requests when a user navigates away from a view.',
            ],
            notes:
              'Decouple network communication from presentation components. Encapsulating fetch calls in dedicated client services standardizes header injection, Bearer token attachment, and JSON payload deserialization.',
            codeSnippet: {
              language: 'typescript',
              code: `const fetchCourseDetails = async (id: string, signal?: AbortSignal): Promise<Course> => {\n  const response = await fetch(\`/api/courses/\${id}\`, { signal });\n  if (!response.ok) {\n    throw new Error(\`HTTP \${response.status}: Failed to retrieve course \${id}\`);\n  }\n  return response.json();\n};`,
            },
          },
          {
            id: 'les-01-03',
            moduleId: 'mod-01-01',
            moduleTitle: 'Module 1: Modern JavaScript & TypeScript Foundations',
            courseId: 'dev-course-01',
            title: 'Modular Architecture & Modern Bundling',
            status: 'completed',
            duration: '20 min',
            videoDurationSeconds: 1200,
            summary:
              'Structure frontend codebases with ES module exports, feature-based directory organization, code splitting, and Vite production bundle optimization.',
            keyTakeaways: [
              'Organize project code into domain feature directories (e.g. features/student, features/auth) rather than flat technical layers.',
              'Implement route-level dynamic imports using React.lazy to split heavy bundles into smaller, on-demand JavaScript chunks.',
              'Verify tree-shaking efficacy by auditing build output with rollup-plugin-visualizer to remove bloated or unreferenced packages.',
            ],
            notes:
              'Modern frontend bundling focuses on minimizing JavaScript payload size and speeding up the browser First Contentful Paint (FCP). Avoid importing entire monolithic libraries when only individual utilities are required.',
          },
        ],
      },
      {
        id: 'mod-01-02',
        title: 'Module 2: Component Architecture & State Management',
        lessons: [
          {
            id: 'les-02-01',
            moduleId: 'mod-01-02',
            moduleTitle: 'Module 2: Component Architecture & State Management',
            courseId: 'dev-course-01',
            title: 'Component Lifecycle & Declarative State',
            status: 'completed',
            duration: '35 min',
            videoDurationSeconds: 2100,
            summary:
              'Manage component rendering cycles with useState and useEffect, enforce immutable state updates, and clean up browser event listeners.',
            keyTakeaways: [
              'Compute derived values synchronously during the render cycle rather than duplicating them into secondary state variables.',
              'Always return a cleanup callback from useEffect when binding window event listeners, intervals, or WebSocket subscriptions.',
              'Update nested state objects immutably using object spread syntax or reducer actions to ensure React detects reference changes.',
            ],
            notes:
              'Pure components produce predictable UI outputs for identical prop and state inputs. Keeping render functions free of side effects eliminates subtle re-render loops and stale closure bugs.',
          },
          {
            id: 'les-02-02',
            moduleId: 'mod-01-02',
            moduleTitle: 'Module 2: Component Architecture & State Management',
            courseId: 'dev-course-01',
            title: 'Context API & Global State Containers',
            status: 'in-progress',
            duration: '40 min',
            videoDurationSeconds: 2400,
            summary:
              'Implement scoped React Context providers for authentication and active learning state, eliminating prop drilling while controlling re-render boundaries.',
            keyTakeaways: [
              'Separate independent application concerns into focused contexts (e.g. AuthContext vs. LearningContext) to minimize unnecessary component re-renders.',
              'Provide custom consumer hooks (e.g. useAuth) that check for null context and raise descriptive exceptions when accessed outside their provider.',
              'Memoize context provider values with useMemo and useCallback to avoid re-rendering consumer components on unrelated parent updates.',
            ],
            notes:
              'React Context is best suited for low-frequency global invariants such as user authentication tokens, active permissions, and theme settings. Rapidly updating state should be kept in local state or dedicated stores.',
            codeSnippet: {
              language: 'typescript',
              code: `export const useAuth = (): AuthContextType => {\n  const context = useContext(AuthContext);\n  if (!context) {\n    throw new Error('useAuth must be invoked within an AuthProvider subtree');\n  }\n  return context;\n};`,
            },
          },
          {
            id: 'les-02-03',
            moduleId: 'mod-01-02',
            moduleTitle: 'Module 2: Component Architecture & State Management',
            courseId: 'dev-course-01',
            title: 'Custom Hooks & Reusable Logic Extraction',
            status: 'locked',
            duration: '30 min',
            videoDurationSeconds: 1800,
            summary:
              'Extract stateful logic, asynchronous query lifecycles, and window event listeners into composable, testable custom React hooks.',
            keyTakeaways: [
              'Encapsulate repetitive data-fetching, loading states, and error handling into reusable custom hooks returning typed tuples or objects.',
              'Prefix hook names with "use" so automated linter plugins enforce the fundamental Rules of Hooks.',
              'Design custom hooks with sensible default options while allowing consuming components to override parameters when necessary.',
            ],
            notes:
              'Custom hooks decouple UI rendering from underlying business logic and browser APIs. This separation allows complex state transitions to be thoroughly unit tested in isolation.',
          },
        ],
      },
      {
        id: 'mod-01-03',
        title: 'Module 3: Full-Stack Client-Server Integration',
        lessons: [
          {
            id: 'les-03-01',
            moduleId: 'mod-01-03',
            moduleTitle: 'Module 3: Full-Stack Client-Server Integration',
            courseId: 'dev-course-01',
            title: 'REST API Consumption & Resilient Fetching',
            status: 'locked',
            duration: '35 min',
            videoDurationSeconds: 2100,
            summary:
              'Build a resilient API client module featuring Bearer token authorization headers, HTTP status mapping, request timeouts, and typed JSON responses.',
            keyTakeaways: [
              'Construct a centralized API client that automatically serializes JSON payloads and handles Authorization header attachment.',
              'Map HTTP response statuses (401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error) to user-facing notification banners.',
              'Implement configurable request timeouts using AbortSignal.timeout() to guard against frozen UI states on degraded connections.',
            ],
            notes:
              'Client-side network layers must handle unexpected offline conditions and transient errors gracefully. Always provide informative feedback and actionable retry triggers rather than unhandled rejections.',
          },
          {
            id: 'les-03-02',
            moduleId: 'mod-01-03',
            moduleTitle: 'Module 3: Full-Stack Client-Server Integration',
            courseId: 'dev-course-01',
            title: 'Client Route Guards & Session Hydration',
            status: 'locked',
            duration: '25 min',
            videoDurationSeconds: 1500,
            summary:
              'Secure student portal routes with React Router guard components, hydrate user sessions from localStorage on startup, and handle post-login redirects.',
            keyTakeaways: [
              'Implement a ProtectedRoute wrapper that evaluates session token presence before granting access to student dashboard routes.',
              'Persist the target route in navigation state so students are redirected back to their intended lesson after successful login.',
              'Display accessible loading skeleton states while validating stored session tokens during the initial application bootstrap.',
            ],
            notes:
              'Route guards prevent unauthorized navigation in the single-page application shell, but every protected backend API endpoint must independently authenticate session tokens with every request.',
          },
        ],
      },
    ],
  },
  {
    id: 'dev-course-02',
    title: 'Backend Services & Distributed APIs',
    category: 'Systems & Cloud',
    modules: [
      {
        id: 'mod-02-01',
        title: 'Module 1: RESTful API Design & Express Middleware',
        lessons: [
          {
            id: 'les-21-01',
            moduleId: 'mod-02-01',
            moduleTitle: 'Module 1: RESTful API Design & Express Middleware',
            courseId: 'dev-course-02',
            title: 'HTTP Semantics & RESTful Contract Principles',
            status: 'completed',
            duration: '25 min',
            videoDurationSeconds: 1500,
            summary:
              'Apply standard HTTP verbs, idempotency rules, URL resource naming conventions, and consistent JSON payload envelopes to REST API contracts.',
            keyTakeaways: [
              'Ensure GET, PUT, and DELETE routes are strictly idempotent, while POST routes handle non-idempotent resource creation.',
              'Structure URL endpoints using plural nouns for resource collections (e.g. /api/v1/courses) and query parameters for filtering.',
              'Standardize JSON response payloads using consistent envelopes with dedicated data, pagination, and error fields.',
            ],
            notes:
              'Adhering to strict REST conventions allows frontend teams to integrate endpoints predictably and enables transparent caching policies across intermediate proxy servers and CDNs.',
          },
          {
            id: 'les-21-02',
            moduleId: 'mod-02-01',
            moduleTitle: 'Module 1: RESTful API Design & Express Middleware',
            courseId: 'dev-course-02',
            title: 'Express Routing & Controller Separation',
            status: 'in-progress',
            duration: '35 min',
            videoDurationSeconds: 2100,
            summary:
              'Organize Express applications with a three-layer architecture: route declarations, controller request parsers, and domain service functions.',
            keyTakeaways: [
              'Keep Express route files focused on endpoint declarations and middleware bindings.',
              'Use controllers strictly to validate request parameters and format outgoing HTTP responses.',
              'Encapsulate business logic and database queries in service modules that are independent of Express req/res objects.',
            ],
            notes:
              'Decoupling business logic from the Express framework allows service modules to be reused across different entry points (such as background queue workers or CLI tasks) and simplifies automated testing.',
          },
          {
            id: 'les-21-03',
            moduleId: 'mod-02-01',
            moduleTitle: 'Module 1: RESTful API Design & Express Middleware',
            courseId: 'dev-course-02',
            title: 'Centralized Error Handling & Middleware Pipelines',
            status: 'locked',
            duration: '30 min',
            videoDurationSeconds: 1800,
            summary:
              'Build centralized Express error-handling middleware with typed application errors, status code mapping, and structured logging.',
            keyTakeaways: [
              'Register a 4-argument error-handling middleware function (err, req, res, next) as the final step in the Express app pipeline.',
              'Define custom application error classes (e.g. NotFoundError, ValidationError) that carry predefined HTTP status codes.',
              'Sanitize internal database error messages and stack traces in production environments before sending responses to the client.',
            ],
            notes:
              'Centralized error handling guarantees that all unhandled promise rejections and operational exceptions are intercepted, logged with request metadata, and returned with appropriate HTTP status codes.',
          },
        ],
      },
      {
        id: 'mod-02-02',
        title: 'Module 2: Database Persistence & Data Models',
        lessons: [
          {
            id: 'les-22-01',
            moduleId: 'mod-02-02',
            moduleTitle: 'Module 2: Database Persistence & Data Models',
            courseId: 'dev-course-02',
            title: 'Relational Schema Design & Constraints',
            status: 'locked',
            duration: '40 min',
            videoDurationSeconds: 2400,
            summary:
              'Design normalized relational database schemas with primary keys, foreign key constraints, cascading policies, and B-tree indexing strategies.',
            keyTakeaways: [
              'Enforce data integrity at the database layer using foreign key constraints and appropriate ON DELETE behaviors.',
              'Place B-tree indexes on foreign keys and frequently filtered columns to maintain high query throughput under load.',
              'Manage schema changes exclusively through versioned, reversible migration files rather than ad-hoc manual alterations.',
            ],
            notes:
              'Relational schema constraints protect against orphaned records and invalid states regardless of which service or process accesses the database.',
          },
          {
            id: 'les-22-02',
            moduleId: 'mod-02-02',
            moduleTitle: 'Module 2: Database Persistence & Data Models',
            courseId: 'dev-course-02',
            title: 'Data Validation & Defensive Programming',
            status: 'locked',
            duration: '30 min',
            videoDurationSeconds: 1800,
            summary:
              'Validate and sanitize incoming HTTP request payloads at the API boundary using schema validation libraries before executing database queries.',
            keyTakeaways: [
              'Validate request bodies, query strings, and URL route parameters against strict schemas before passing data to domain services.',
              'Sanitize text inputs to neutralize SQL injection and cross-site scripting attack vectors.',
              'Return structured 400 Bad Request responses with field-level validation errors to help frontend clients highlight invalid form inputs.',
            ],
            notes:
              'Rigorous boundary validation ensures that internal database queries and business logic only ever process valid, strongly typed payloads.',
          },
        ],
      },
    ],
  },
];

/**
 * Retrieves a course by ID from enrolled course records.
 */
export const getLearningCourseById = (courseId: string): LearningCourse | undefined => {
  return DEVELOPMENT_LEARNING_COURSES.find((c) => c.id === courseId);
};

/**
 * Finds a specific lesson and its parent module and course by IDs.
 */
export const findLessonDetails = (
  courseId: string,
  lessonId: string
): { course: LearningCourse; module: LearningCourse['modules'][0]; lesson: DetailedLesson } | null => {
  const course = getLearningCourseById(courseId);
  if (!course) return null;

  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { course, module: mod, lesson };
    }
  }

  return null;
};
