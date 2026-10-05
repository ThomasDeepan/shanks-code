# 06 — Frontend Architecture: Shank's Code

This document defines the architectural patterns, directory structure, data flow, state management, and environment execution modes for the Shank's Code client application.

---

## 1. Directory Structure & Modular Organization

The frontend codebase is organized using a **feature-first, modular architecture**:

```
client/src/
│
├── app/                                 # Application bootstrap & top-level configuration
│   ├── App.tsx                          # Root application component
│   ├── router.tsx                       # Complete React Router configuration
│   └── providers.tsx                    # Top-level context providers wrapper
│
├── components/                          # Shared, reusable application-wide components
│   ├── ui/                              # Atomic primitives (Button, Card, Input, Modal, Badge, etc.)
│   ├── layout/                          # App shells (Navbar, Footer, PageContainer, StudentLayout, Sidebar)
│   └── common/                          # Status & utility UI (SectionHeading, SearchBar, LoadingState, etc.)
│
├── features/                            # Domain-isolated business feature modules
│   ├── home/                            # Public home page & modular sections
│   ├── about/                           # Institutional narrative & faculty
│   ├── programs/                        # Program catalog, details, filter, syllabus modal
│   ├── services/                        # Corporate & enterprise training
│   ├── research/                        # Applied computing lab showcase
│   ├── pricing/                         # Tuition cards, comparison table, FAQ accordion
│   ├── workshops/                       # Bootcamps & webinars
│   ├── testimonials/                    # Graduate reviews & alumni outcomes
│   ├── auth/                            # Login, Signup, ForgotPassword forms & views
│   └── student/                         # Authenticated student learning portal
│       ├── dashboard/                   # Summary metrics, active courses, recent activities
│       ├── courses/                     # Enrolled courses & modular syllabus view
│       ├── learning/                    # Video player, lesson sequence & notes
│       ├── assessments/                 # Exam list, timed exam player (ExamTimer, QuestionCard)
│       ├── results/                     # Performance reports & topic breakdown
│       ├── attendance/                  # Attendance ledger & monthly visual calendar
│       ├── schedule/                    # Timetable view & live lecture cards
│       ├── notifications/               # Alert list & notification cards
│       └── profile/                     # Profile header, edit form, security
│
├── services/                            # HTTP client & API abstraction
│   ├── api.ts                           # Unified API client handling mock/live switching & errors
│   └── endpoints.ts                     # Centralized API endpoint constant definitions
│
├── mocks/                               # Comprehensive, typed mock datasets for frontend development
│   ├── students.ts                      # Student profiles & enrollment records
│   ├── programs.ts                      # Academic programs & detailed syllabi
│   ├── courses.ts                       # Enrolled courses, modules & lesson video metadata
│   ├── assessments.ts                   # Timed quizzes, questions, options, correct answers
│   ├── results.ts                       # Past exam scores & topic analytics
│   └── testimonials.ts                  # Student reviews & graduate outcomes
│
├── hooks/                               # Custom reusable React hooks
│   ├── useAuth.ts                       # Authentication state & login/logout actions
│   └── useApi.ts                        # Data fetching hook handling loading/error/data states
│
├── context/                             # React Context state containers
│   └── AuthContext.tsx                  # Global user session & authentication provider
│
├── types/                               # TypeScript type definitions and interfaces
│   ├── api.ts                           # Generic API response and error contracts
│   ├── auth.ts                          # User, Session, LoginPayload types
│   ├── student.ts                       # Course, Lesson, Assessment, Result, Attendance types
│   └── common.ts                        # UI variant and common prop types
│
├── constants/                           # Immutable configurations and route definitions
│   ├── routes.ts                        # URL path string constants
│   └── navigation.ts                    # Public and student navigation item definitions
│
└── utils/                               # Pure utility helper functions
    ├── formatters.ts                    # Date, time, currency, and percentage formatters
    └── validators.ts                    # Form validation helpers
```

---

## 2. Strict API Mode Architecture

The frontend communicates with data services through an explicit, environment-driven abstraction layer.

### A. Environment Configuration
```env
# client/.env.example
VITE_API_MODE=mock
VITE_API_BASE_URL=http://localhost:5000/api
```

### B. Mode Behaviors
1. **Mock Mode (`VITE_API_MODE=mock`)**:
   - The API layer (`src/services/api.ts`) intercepts requests and resolves typed responses directly from `src/mocks/` with realistic latency simulation (150–300ms).
   - Used for rapid UI development, offline testing, and independent frontend verification.
2. **Live Mode (`VITE_API_MODE=live`)**:
   - The API layer makes standard HTTP fetch requests to `VITE_API_BASE_URL`.
   - Attaches the JWT `Authorization: Bearer <token>` header when an authenticated token is present in `localStorage`.

### C. Zero Silent Fallback Policy
> [!IMPORTANT]
> **Strict Failure Visibility**: If `VITE_API_MODE=live` is configured and the backend server fails, encounters a network timeout, or returns a 5xx error, the client **MUST NOT silently fall back to mock data**.
> 
> The application must transition to an explicit `ErrorState` UI component displaying the error message and a "Retry" button. Silent fallbacks mask integration bugs and create false confidence.

---

## 3. Component Design & State Management

### A. Component Hierarchy & Sizing
- **Small & Focused**: Components should generally not exceed 200–250 lines of code. Sub-elements must be extracted into dedicated child components.
- **Placement Rule**:
  - Components used across multiple features belong in `src/components/ui/`, `src/components/layout/`, or `src/components/common/`.
  - Feature-specific subcomponents must reside within their respective `features/<name>/components/` directory.

### B. State Management
- **Global Session State**: Stored in `AuthContext` (current user, token, authentication status, login/logout functions).
- **Server Data State**: Managed via `useApi` or feature-specific service hooks returning `{ data, loading, error, refetch }`.
- **Local Interactive State**: Standard `useState` / `useReducer` for UI controls (modal open/closed, active tab, form inputs, quiz answer selections).

---

## 4. Four Essential UI States

Every view or component that consumes asynchronous data must handle four distinct states:
1. **Loading State**: Display a tailored `Skeleton` or `LoadingState` spinner. Blank white screens are prohibited.
2. **Success State**: Render the complete, responsive UI with real or mock data.
3. **Empty State**: When an array or list has 0 items (e.g., no notifications, no upcoming exams), render `EmptyState` with an icon, descriptive text, and optional action.
4. **Error State**: When a request fails, render `ErrorState` with a helpful description and a "Try Again" trigger.
