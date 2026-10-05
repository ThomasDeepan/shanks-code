# 02 — Page Map & Routing Architecture: Shank's Code

This document provides the authoritative inventory of all routes, page responsibilities, layout structures, and access control policies for the Shank's Code platform.

> [!NOTE]
> All routes are marked with their confirmation status in accordance with `03-FEATURE-SPEC.md`. Routes marked `REQUIRES APPROVAL` are proposed paths that require human approval before production implementation.

---

## 1. Route Inventory & Access Matrix

### A. Public Showcase Routes
*Layout*: Public Root Layout (`Navbar` + `PageContainer` + `Footer`)  
*Access*: Unrestricted (All visitors)

| URL Route | Page Component | Feature Area | Status | Primary Responsibility |
|---|---|---|---|---|
| `/` | `HomePage` | `features/home` | **CONFIRMED** | Hero, impact metrics, programs preview, workshops preview, services, R&D, about, recognition, audited outcomes, and enrollment call-to-action. |
| `/programs` | `ProgramsPage` | `features/programs` | **CONFIRMED** | Filterable academic catalog, duration/level filters, and curriculum overviews. |
| `/workshops` | `WorkshopsPage` | `features/workshops` | **CONFIRMED** | Hands-on workshop listing for engineering colleges, polytechnic colleges, and academic institutions, with impact figures and a campus workshop request path. |
| `/programs/:id` | `ProgramDetailPage` | `features/programs` | **CONFIRMED** | In-depth program syllabus, prerequisites, career pathways, and syllabus preview modal. |
| `/about` | `AboutPage` | `features/about` | **REQUIRES APPROVAL** | Proposed institutional mission, educational philosophy, and faculty overview. |
| `/services` | `ServicesPage` | `features/services` | **REQUIRES APPROVAL** | Proposed enterprise tech training and institutional partnerships. |
| `/research` | `ResearchPage` | `features/research` | **REQUIRES APPROVAL** | Proposed applied computing labs and engineering publications. |
| `/pricing` | `PricingPage` | `features/pricing` | **REQUIRES APPROVAL** | Proposed program tuition tiers, financing options, and FAQ accordion. |
| `/workshops/:id` | `WorkshopDetailPage` | `features/workshops` | **REQUIRES APPROVAL** | Proposed workshop agenda breakdown and inquiry form. |
| `/testimonials` | `TestimonialsPage` | `features/testimonials` | **REQUIRES APPROVAL** | Proposed graduate career transitions and student reviews. |

---

### B. Authentication Routes
*Layout*: Auth Minimalist Layout (Brand header, centered light card, minimal footer)  
*Access*: Guest Only (Redirects authenticated students directly to `/student/dashboard`)

| URL Route | Page Component | Feature Area | Status | Primary Responsibility |
|---|---|---|---|---|
| `/login` | `LoginPage` | `features/auth` | **CONFIRMED** | Student credential authentication with quick demo one-click login buttons. |
| `/signup` | `SignupPage` | `features/auth` | **REQUIRES APPROVAL** | Proposed new student self-registration with input validation. |
| `/forgot-password` | `ForgotPasswordPage` | `features/auth` | **REQUIRES APPROVAL** | Proposed password recovery initiation and reset instructions. |

---

### C. Authenticated Student Portal Routes
*Layout*: `StudentLayout` (`Sidebar` navigation + Topbar with student profile chip + main content view)  
*Access*: Protected (`ProtectedRoute` requires valid authentication token / session)

| URL Route | Page Component | Feature Area | Status | Primary Responsibility |
|---|---|---|---|---|
| `/student/dashboard` | `StudentDashboard` | `features/student/dashboard` | **CONFIRMED** | Personalized welcome banner, enrolled course cards, and overall progress meter. |
| `/student/courses` | `CoursesPage` | `features/student/courses` | **CONFIRMED** | Grid of enrolled programs and active courses with completion percentages. |
| `/student/courses/:id` | `CourseDetailPage` | `features/student/courses` | **CONFIRMED** | Modular syllabus view, lesson breakdown, resources, and resume learning action. |
| `/student/learning/:courseId` | `LearningPage` | `features/student/learning` | **CONFIRMED** | Interactive lesson environment with video player, lesson list sidebar, and notes panel. |
| `/student/learning/:courseId/:lessonId`| `LessonPage` | `features/student/learning` | **CONFIRMED** | Specific lesson player and completion toggle. |
| `/student/assessments` | `AssessmentsPage` | `features/student/assessments` | **REQUIRES APPROVAL** | Proposed list of upcoming, pending, and completed technical assessments. |
| `/student/assessments/:id` | `AssessmentPage` | `features/student/assessments` | **REQUIRES APPROVAL** | Proposed full-screen timed assessment interface (`ExamTimer`, `QuestionCard`). |
| `/student/results` | `ResultsPage` | `features/student/results` | **REQUIRES APPROVAL** | Proposed assessment gradebook, performance trends, and topic score breakdown. |
| `/student/attendance` | `AttendancePage` | `features/student/attendance` | **REQUIRES APPROVAL** | Proposed attendance ledger, monthly visual calendar, and percentage summary. |
| `/student/schedule` | `SchedulePage` | `features/student/schedule` | **REQUIRES APPROVAL** | Proposed weekly academic calendar and live lecture timetable. |
| `/student/notifications` | `NotificationsPage` | `features/student/notifications` | **REQUIRES APPROVAL** | Proposed system announcements and academic alerts. |
| `/student/profile` | `ProfilePage` | `features/student/profile` | **REQUIRES APPROVAL** | Proposed personal student information view and contact update form. |

---

## 2. Navigation Hierarchy & Breadcrumbs
- **Public Navigation**: Fixed top navigation with direct links to Home, Programs, and a distinct "Student Portal / Login" action button. (Proposed routes like About, Pricing, Workshops to be enabled upon approval).
- **Student Portal Navigation**: Persistent left sidebar containing structured sections:
  1. **Academics** `[CONFIRMED]`: Dashboard, My Courses, Learning
  2. **Evaluations** `[REQUIRES APPROVAL]`: Assessments, Results
  3. **Schedule & Attendance** `[REQUIRES APPROVAL]`: Schedule, Attendance
  4. **Account** `[REQUIRES APPROVAL]`: Notifications, Profile, Logout
