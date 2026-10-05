# 07 — API Contract & Backend Coordination: Shank's Code

This document defines the formal REST API contract between the Shank's Code React frontend client and the Node.js/Express REST backend.

> [!IMPORTANT]
> **API Confirmation Status**:
> The backend REST server is currently being implemented by the backend engineering team in Node.js/Express.
> - **CONFIRMED FRONTEND REQUIREMENTS**: The data shapes and workflow interactions required by the approved frontend UI components are finalized and documented below.
> - **PROPOSED BACKEND ENDPOINTS**: All route paths, HTTP methods, and payload envelopes represent proposed client-server contracts and are designated as **PENDING BACKEND CONFIRMATION**.
> - **ZERO SILENT FALLBACK**: In `VITE_API_MODE=live`, the frontend communicates directly with `VITE_API_BASE_URL`. If the backend is unavailable or returns an error status, the frontend presents an explicit error state with **ZERO silent fallback to mock data**.

---

## 1. Frontend-Backend Architecture Overview

The frontend architecture cleanly decouples UI rendering from HTTP transport:

```
                 React UI Components
                    (LoginPage, Dashboard, Courses, Learning)
                          │
                          ▼
                   Feature Services
        (authService, courseService, learningService, programService)
                          │
                          ▼
                      API Client
                (src/services/api/client.ts)
                          │
         ┌────────────────┴────────────────┐
         │                                 │
    [MOCK MODE]                       [LIVE MODE]
  (VITE_API_MODE=mock)             (VITE_API_MODE=live)
         │                                 │
  Typed Dev Datasets             HTTP fetch to Node.js/Express
 (Simulated 250ms Latency)        (Bearer Token / JSON Envelope)
                                           │
                                           ▼
                                   PostgreSQL / Database
```

---

## 2. Endpoint Confirmation Status Matrix

| Endpoint Route | Method | Access | Client Status | Backend Status | Description |
|---|---|---|---|---|---|
| `/api/auth/login` | POST | Public | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Authenticates student credentials; returns bearer token & profile. |
| `/api/auth/me` | GET | Protected | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Validates active session token and returns fresh user profile. |
| `/api/auth/logout` | POST | Protected | **PROPOSED** | **PENDING BACKEND CONFIRMATION** | Invalidates active server session or token blacklist. |
| `/api/programs` | GET | Public | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Catalog of academic technical tracks with optional category filter. |
| `/api/programs/:id` | GET | Public | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Detailed single program overview, skills, and syllabus modules. |
| `/api/student/dashboard` | GET | Protected | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Student progress overview, enrolled course count, and active tracks. |
| `/api/student/courses` | GET | Protected | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Active enrolled courses list with modular completion percentages. |
| `/api/student/courses/:id` | GET | Protected | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Full course syllabus tree (Modules, Lessons, statuses, video metadata). |
| `/api/student/courses/:courseId/lessons/:lessonId/complete` | POST | Protected | **CONFIRMED (Frontend)** | **PENDING BACKEND CONFIRMATION** | Marks lesson complete, computes course progress, unlocks next lesson. |

---

## 3. Detailed Endpoint Contracts (Proposed / Pending Backend Sign-Off)

### A. Authentication Contracts

#### 1. `POST /api/auth/login`
- **Purpose**: Authenticates student credentials and returns an authenticated user profile and bearer token.
- **Access**: Public
- **Request Headers**:
  `Content-Type: application/json`
- **Proposed Request Body**:
  ```json
  {
    "email": "demo.student@shankscode.com",
    "password": "Password123!"
  }
  ```
- **Proposed Success Response (`200 OK`)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "stu_01",
      "name": "Demo Student",
      "email": "demo.student@shankscode.com",
      "role": "student",
      "cohort": "Full-Stack Cohort 2026-A",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
  }
  ```
- **Client Requirements**:
  - `user.id`: Unique student identifier string (UUID or ObjectID string).
  - `user.name`: Full display name of the student.
  - `user.email`: Registered email address.
  - `user.role`: Must be `'student'` for student portal access.
  - `user.cohort` *(Optional)*: Cohort display label.
  - `user.avatar` *(Optional)*: Avatar URL string.

#### 2. `GET /api/auth/me`
- **Purpose**: Validates active session token and refreshes current profile upon page reload.
- **Access**: Protected
- **Request Headers**:
  `Authorization: Bearer <token>`
- **Proposed Success Response (`200 OK`)**:
  ```json
  {
    "user": {
      "id": "stu_01",
      "name": "Demo Student",
      "email": "demo.student@shankscode.com",
      "role": "student",
      "cohort": "Full-Stack Cohort 2026-A"
    }
  }
  ```

#### 3. `POST /api/auth/logout`
- **Purpose**: Informs backend to revoke/blacklist the bearer token or clear server session cookie.
- **Access**: Protected
- **Request Headers**:
  `Authorization: Bearer <token>`
- **Proposed Success Response (`200 OK` or `204 No Content`)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

---

### B. Programs Catalog Contracts

#### 1. `GET /api/programs`
- **Purpose**: Retrieves public catalog of technical training programs for curriculum discovery.
- **Access**: Public
- **Query Parameters**:
  - `category` *(Optional)*: Filter by track (e.g. `'Full Stack & Software'`, `'IoT & Embedded Systems'`, `'AI & Data Science'`).
  - `search` *(Optional)*: Keyword search query string.
- **Proposed Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": "sample-fullstack",
      "title": "Full-Stack Software Engineering",
      "category": "Full Stack & Software",
      "duration": "Estimated 24 Weeks",
      "level": "Intermediate",
      "description": "Curriculum structure preview covering modern frontend interfaces, distributed backend services, and clean system architectures.",
      "skills": ["TypeScript", "React", "Node.js", "Docker", "PostgreSQL"]
    }
  ]
  ```

#### 2. `GET /api/programs/:id`
- **Purpose**: Retrieves single program curriculum structure.
- **Access**: Public
- **Proposed Success Response (`200 OK`)**: Single program object matching the above schema.

---

### C. Student Dashboard Contract

#### 1. `GET /api/student/dashboard`
- **Purpose**: Retrieves high-level student overview, overall completion metrics, and active courses summary.
- **Access**: Protected
- **Request Headers**:
  `Authorization: Bearer <token>`
- **Proposed Success Response (`200 OK`)**:
  ```json
  {
    "overallCompletionPercentage": 48,
    "enrolledCoursesCount": 2,
    "activeCourses": [
      {
        "id": "dev-course-01",
        "title": "Full-Stack Software Engineering",
        "currentModule": "Module 2: Component Architecture & State Management",
        "progressPercentage": 65
      },
      {
        "id": "dev-course-02",
        "title": "Backend Services & Distributed APIs",
        "currentModule": "Module 1: RESTful API Design & Express Middleware",
        "progressPercentage": 30
      }
    ]
  }
  ```

---

### D. Student Enrolled Courses & Syllabus Contracts

#### 1. `GET /api/student/courses`
- **Purpose**: Retrieves all enrolled courses with full modular syllabus and lesson statuses for the authenticated student.
- **Access**: Protected
- **Request Headers**:
  `Authorization: Bearer <token>`
- **Proposed Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": "dev-course-01",
      "title": "Full-Stack Software Engineering",
      "description": "Build production-ready web applications using TypeScript...",
      "category": "Full Stack",
      "modules": [
        {
          "id": "mod-01-01",
          "title": "Module 1: Modern JavaScript & TypeScript Foundations",
          "description": "Type-safe application engineering with TypeScript...",
          "lessons": [
            {
              "id": "les-01-01",
              "title": "TypeScript Type System & Interface Design",
              "status": "completed",
              "duration": "25 min"
            },
            {
              "id": "les-01-02",
              "title": "Asynchronous Programming & Promise Pipelines",
              "status": "in-progress",
              "duration": "30 min"
            },
            {
              "id": "les-01-03",
              "title": "Modular Architecture & Modern Bundling",
              "status": "locked",
              "duration": "20 min"
            }
          ]
        }
      ]
    }
  ]
  ```

#### 2. `GET /api/student/courses/:id`
- **Purpose**: Retrieves full detailed learning environment syllabus for a single course, including lecture notes, key takeaways, and video metadata.
- **Access**: Protected
- **Request Headers**:
  `Authorization: Bearer <token>`
- **Proposed Success Response (`200 OK`)**:
  ```json
  {
    "id": "dev-course-01",
    "title": "Full-Stack Software Engineering",
    "category": "Full Stack",
    "modules": [
      {
        "id": "mod-01-01",
        "title": "Module 1: Modern JavaScript & TypeScript Foundations",
        "lessons": [
          {
            "id": "les-01-01",
            "moduleId": "mod-01-01",
            "moduleTitle": "Module 1: Modern JavaScript & TypeScript Foundations",
            "courseId": "dev-course-01",
            "title": "TypeScript Type System & Interface Design",
            "status": "completed",
            "duration": "25 min",
            "videoDurationSeconds": 1500,
            "summary": "Define strict TypeScript interfaces, discriminated unions, and generic constraints...",
            "keyTakeaways": [
              "Use discriminated unions with a status literal tag...",
              "Enable strict compiler options in tsconfig.json..."
            ],
            "notes": "Strong type contracts establish clear architectural boundaries...",
            "codeSnippet": {
              "language": "typescript",
              "code": "interface UserProfile {\n  id: string;\n  name: string;\n}"
            }
          }
        ]
      }
    ]
  }
  ```

---

### E. Lesson Completion Contract

#### 1. `POST /api/student/courses/:courseId/lessons/:lessonId/complete`
- **Purpose**: Records completion of a specific lesson for the authenticated student, updates overall course progression, and returns next unlocked lesson ID.
- **Access**: Protected
- **Request Headers**:
  `Authorization: Bearer <token>`
- **Proposed Success Response (`200 OK`)**:
  ```json
  {
    "completedLessonId": "les-01-01",
    "status": "completed",
    "nextLessonId": "les-01-02",
    "nextLessonStatus": "in-progress",
    "updatedCourseProgress": 50
  }
  ```

---

## 4. Hierarchy Model & Frontend Adapters

The UI hierarchy follows:
```
Course
  └── Module
        └── Lesson
```

### Lesson Status Enumeration (Confirmed Requirement)
Lessons must have one of three status values:
- `'completed'`: Student has marked the lesson finished.
- `'in-progress'`: Active current lesson available for study.
- `'locked'`: Subsequent lesson locked until prerequisites/prior lessons are completed.

Frontend adapter functions in `src/features/student/courses/services/courseService.ts` and `src/features/student/learning/services/learningService.ts` decouple the UI from database column naming differences.

---

## 5. Standard Error Format Envelope (Proposed)

Unless customized by the backend team, the standard error response envelope is:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested course syllabus module does not exist.",
    "details": []
  }
}
```

### HTTP Status Code Handling Matrix

| HTTP Status | Category | Frontend Error Handling & User Presentation |
|---|---|---|
| `400 Bad Request` | Client Error | Displays server validation message or "The request could not be processed." |
| `401 Unauthorized` | Auth Failure | **Automatic Session Invalidation**: Clears stored session, dispatches `shanks:session-expired` event, redirects to `/login`, and displays "Your session has expired. Please sign in again." |
| `403 Forbidden` | Authorization | Displays "You do not have permission to access this course or feature." |
| `404 Not Found` | Missing Resource | Displays "The requested resource or course material could not be found." |
| `409 Conflict` | State Conflict | Displays "A conflict occurred with your current course state. Please refresh and try again." |
| `422 Unprocessable`| Validation | Displays specific validation error or "The submitted information is incomplete or invalid." |
| `429 Too Many Req`| Rate Limiting | Displays "Too many requests. Please wait a moment before trying again." |
| `500 Server Error` | Backend Failure | Displays friendly non-technical message: "The learning platform server encountered an error. Our engineering team has been notified." |
| `Network Failure` | Offline / Down | Displays "Unable to reach the server. Please check your internet connection or try again shortly." |

---

## 6. Authentication & Authorization Strategy

### Current Frontend Implementation
- **Transport**: `Authorization: Bearer <token>` HTTP header automatically injected by `src/services/api/client.ts`.
- **Status**: **PENDING BACKEND CONFIRMATION**. (Backend may select Header Bearer JWT or `httpOnly` secure cookies).
- **Session Storage**: Client stores `{ token, user }` in `localStorage` under `shanks_code_student_session`.
- **Session Expiration Event**: When the backend returns HTTP 401, `apiClient` executes `handleSessionExpiration()`, triggering `AuthContext` to clear authentication and redirect to `/login`.

---

## 7. Concrete Backend Questions Pending Confirmation

Before flipping the frontend to `VITE_API_MODE=live`, the following architectural questions must be confirmed by the backend team:

1. **Authentication Strategy**:
   - Will the backend use `Authorization: Bearer <JWT>` headers or `httpOnly` cookies for token transport?
   *(Frontend currently defaults to Bearer token injection).*
2. **Error Envelope Structure**:
   - Does the backend error response follow `{ error: { code, message, details } }` or `{ message: string }`?
   *(Frontend handles both).*
3. **Identifier Types**:
   - Are IDs represented as UUID v4 strings, MongoDB ObjectIDs, or integer IDs?
   *(Frontend types use `string`).*
4. **Lesson Completion Semantics**:
   - Does `POST /api/student/courses/:courseId/lessons/:lessonId/complete` automatically calculate and return `nextLessonId` and `updatedCourseProgress`?
   *(Frontend service is prepared to consume these fields).*
5. **CORS Configuration**:
   - Does Express CORS middleware permit origins `http://localhost:5173` (Vite dev server) and expose `Authorization` headers?
