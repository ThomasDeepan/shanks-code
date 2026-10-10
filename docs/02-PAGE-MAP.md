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
| `/` | `HomePage` | `features/home` | **CONFIRMED** | Hero, impact metrics, programs preview, workshops preview, capability graph, services preview, R&D preview, about preview, recognition, audited outcomes, and enrollment call-to-action. |
| `/about` | `AboutPage` | `features/about` | **CONFIRMED** | Institutional identity, vision and mission, delivery commitments, the 5-step applied engineering methodology, recognition/accreditation strip, and the site FAQ. |
| `/services` | `ServicesPage` | `features/services` | **CONFIRMED** | Complete service records for the three practice areas (learning & academic programs, technology & engineering, institutional partnerships), workshop hand-off, FAQ and enquiry CTA. |
| `/rnd` | `RnDPage` | `features/research` | **CONFIRMED** | Applied R&D division: four focus areas, the five-stage research workflow, lab visual and division outcomes. `/research` redirects here. |
| `/programs` | `ProgramsPage` | `features/programs` | **CONFIRMED** | Filterable academic catalog, duration/level filters, and curriculum overviews. |
| `/workshops` | `WorkshopsPage` | `features/workshops` | **CONFIRMED** | Hands-on workshop listing for engineering colleges, polytechnic colleges, and academic institutions, with impact figures and a campus workshop request path. |
| `/programs/:id` | `ProgramDetailPage` | `features/programs` | **REQUIRES APPROVAL** | In-depth program syllabus, prerequisites, career pathways, and syllabus preview modal. |
| `/pricing` | `PricingPage` | `features/pricing` | **REQUIRES APPROVAL** | Proposed program tuition tiers and financing options. |
| `/workshops/:id` | `WorkshopDetailPage` | `features/workshops` | **REQUIRES APPROVAL** | Proposed workshop agenda breakdown and inquiry form. |
| `/testimonials` | `TestimonialsPage` | `features/testimonials` | **REQUIRES APPROVAL** | Proposed graduate career transitions and student reviews. |

---

### B. Authentication Routes
*Layout*: Auth Minimalist Layout (Brand header, centered light card, minimal footer)  
*Access*: Guest Only (Redirects authenticated students directly to `/student/dashboard`)

| URL Route | Page Component | Feature Area | Status | Primary Responsibility |
|---|---|---|---|---|
| `/portal` | `PortalAuthPage` | `features/auth` | **CONFIRMED** | Student Portal authentication entry point reached from the primary navigation, offering SIGN IN and SIGN UP on one screen. |
| `/login` | `LoginPage` | `features/auth` | **CONFIRMED** | Student credential authentication (sign-in tab of the shared `AuthShell`) with quick demo one-click login in mock mode. |
| `/signup` | `SignupPage` | `features/auth` | **CONFIRMED** | New student self-registration with client-side validation; the account is created by the backend (`POST /api/auth/register`). |
| `/admin/login` | `AdminLoginPage` | `features/admin` | **CONFIRMED** | Separate administrator authentication entry point (`POST /api/auth/admin/login`). Visually and functionally distinct from the Student Portal. |
| `/forgot-password` | `ForgotPasswordPage` | `features/auth` | **REQUIRES APPROVAL** | Proposed password recovery initiation and reset instructions. |

---

### B2. Administration Routes
*Layout*: `AdminLayout` (Sidebar navigation + topbar with administrator chip + sign-out)  
*Access*: Protected — `ProtectedRoute allowedRole="admin"`; unauthorised users are refused before the console renders, and the backend re-verifies the admin role on every admin API call.

| URL Route | Page Component | Feature Area | Status | Primary Responsibility |
|---|---|---|---|---|
| `/admin/dashboard` | `AdminOverviewPage` | `features/admin` | **CONFIRMED** | Operational summary (record counts per collection) and links to each management area. |
| `/admin/dashboard/students` | `AdminStudentsPage` | `features/admin` | **CONFIRMED** | Read view of student accounts and enrollment data. Backend-served only; shows an empty state until records exist. |
| `/admin/dashboard/programs` | `AdminProgramsPage` | `features/admin` | **CONFIRMED** | Create / read / update / delete program catalog entries (description, duration, eligibility, status). |
| `/admin/dashboard/workshops` | `AdminWorkshopsPage` | `features/admin` | **CONFIRMED** | Create / read / update / delete workshop sessions (institution, location, date, description, image). |
| `/admin/dashboard/announcements` | `AdminAnnouncementsPage` | `features/admin` | **CONFIRMED** | Create, edit and publish/unpublish announcements. |
| `/admin/dashboard/research` | `AdminResearchPage` | `features/admin` | **CONFIRMED** | Manage applied R&D project records and their stage in the five-stage workflow. |
| `/admin/dashboard/settings` | `AdminSettingsPage` | `features/admin` | **CONFIRMED** | Read-only environment and access-control information. Contains no credential fields by design. |

> [!IMPORTANT]
> Destructive actions always pass through `ConfirmDialog`, which names the record before deletion is executed.

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
- **Public Navigation**: Sticky top navigation with direct links to Home, About, Services, R&D, Programs and Workshops, plus a visually prominent "Student Portal" action that leads to `/portal` (sign in / sign up). Active state is derived from the current pathname.
- **Student Portal Navigation**: Persistent left sidebar containing structured sections:
  1. **Academics** `[CONFIRMED]`: Dashboard, My Courses, Learning
  2. **Evaluations** `[REQUIRES APPROVAL]`: Assessments, Results
  3. **Schedule & Attendance** `[REQUIRES APPROVAL]`: Schedule, Attendance
  4. **Account** `[REQUIRES APPROVAL]`: Notifications, Profile, Logout
