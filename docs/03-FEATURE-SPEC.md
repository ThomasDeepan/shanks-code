# 03 — Feature Specification & Scope Boundaries: Shank's Code

This document is the **final authority for feature scope**. Features not documented as `CONFIRMED` in this specification must NOT be assumed to be ready for implementation. Proposed features are tagged as `REQUIRES APPROVAL` and must receive explicit confirmation before development begins.

---

## 1. Feature Status Summary Table

| Feature Area | Component / Sub-feature | Status | Authority / Notes |
|---|---|---|---|
| **Public Showcase** | Home Page (Hero, Value Prop, Featured Programs) | **CONFIRMED** | Primary entry point |
| **Public Showcase** | Program Discovery & Search | **CONFIRMED** | Core curriculum catalog |
| **Public Showcase** | Program Details & Syllabus Outline | **CONFIRMED** | In-depth curriculum breakdown |
| **Public Showcase** | About Page | **REQUIRES APPROVAL** | Proposed institutional story |
| **Public Showcase** | Services Page | **REQUIRES APPROVAL** | Proposed enterprise training |
| **Public Showcase** | Research Page | **REQUIRES APPROVAL** | Proposed lab showcase |
| **Public Showcase** | Pricing Page & Comparison Table | **REQUIRES APPROVAL** | Proposed tuition comparison |
| **Public Showcase** | Workshops Page & Inquiry | **REQUIRES APPROVAL** | Proposed developer bootcamps |
| **Public Showcase** | Testimonials Page & Reviews | **REQUIRES APPROVAL** | Proposed student reviews |
| **Authentication** | Student Login & Demo Login Button | **CONFIRMED** | Required for portal access & testing |
| **Authentication** | Student Registration / Signup | **REQUIRES APPROVAL** | Proposed self-registration flow |
| **Authentication** | Forgot Password Recovery | **REQUIRES APPROVAL** | Proposed recovery workflow |
| **Student Portal** | Student Dashboard (Welcome, Active Courses, Core Progress) | **CONFIRMED** | Primary learning launchpad |
| **Student Portal** | Course & Module Navigation | **CONFIRMED** | Syllabus accordion & lesson index |
| **Student Portal** | Lesson & Video Player Environment | **CONFIRMED** | Multimedia lesson consumption |
| **Student Portal** | Assessments & Timed Examination | **REQUIRES APPROVAL** | Proposed timed quiz engine |
| **Student Portal** | Exam Results & Performance Analytics | **REQUIRES APPROVAL** | Proposed gradebook & score breakdown |
| **Student Portal** | Attendance Ledger & Monthly Calendar | **REQUIRES APPROVAL** | Proposed attendance tracking |
| **Student Portal** | Class Schedule & Timetable | **REQUIRES APPROVAL** | Proposed weekly lecture timetable |
| **Student Portal** | Notifications Feed | **REQUIRES APPROVAL** | Proposed alert feed |
| **Student Portal** | Student Profile View & Edit | **REQUIRES APPROVAL** | Proposed profile management |

---

## 2. Confirmed Features (Approved for Immediate Implementation Planning)

### F-PUB-01: Program Discovery & Catalog `[CONFIRMED]`
- **Description**: Prospective students can view technical training programs offered by Shank's Code.
- **Confirmed Capabilities**:
  - Filter programs by category (e.g., Full Stack, Systems & Cloud, Data & AI).
  - Search programs by keyword.
  - Program cards displaying duration, difficulty level, prerequisites, and brief description.
  - Program detail page with comprehensive module syllabus, tools taught, and career outcomes.
  - Modal window to view/download detailed syllabus.

### F-AUTH-01: Student Authentication & Session Management `[CONFIRMED]`
- **Description**: Secure credential entry to access the protected student portal.
- **Confirmed Capabilities**:
  - Login form with email and password fields and validation.
  - **Quick Demo Student Login** button for instant one-click evaluation without manual typing.
  - Session persistence via token storage in `localStorage`.
  - Route protection: automatic redirection to `/login` if unauthenticated.
  - Logout trigger that terminates the active session and clears storage.

### F-STU-01: Student Dashboard Core `[CONFIRMED]`
- **Description**: Central overview for active students upon login.
- **Confirmed Capabilities**:
  - Personalized welcome banner showing student name and current date.
  - High-level progress metrics: overall completion percentage and enrolled course count.
  - Active course cards displaying current module title and "Resume Learning" action button.

### F-STU-02: Course & Module Navigation `[CONFIRMED]`
- **Description**: Structured breakdown of course content into modules and lessons.
- **Confirmed Capabilities**:
  - Enrolled courses list view.
  - Course detail view showing modular hierarchy (e.g., Module 1: Architecture, Module 2: State Management).
  - Lesson list with clear visual status indicators (`completed`, `in-progress`, `locked`).

### F-STU-03: Lesson Environment & Video Player `[CONFIRMED]`
- **Description**: Focused multimedia learning screen.
- **Confirmed Capabilities**:
  - Clean video player interface for structured video lectures.
  - Interactive lesson playlist sidebar allowing direct navigation between lessons.
  - "Mark as Completed" button updating the student's lesson state.
  - Lesson notes and key takeaways panel below the player.

---

## 3. Proposed Features (Requires Explicit Project Owner Approval)

The following features were inferred from project structure and functional reference patterns. They remain **PROPOSED** until explicitly approved:

### P-PUB-02: About, Services & Research Pages `[REQUIRES APPROVAL]`
- Institutional background, corporate training offerings, and applied research labs.

### P-PUB-03: Pricing & Tier Comparison `[REQUIRES APPROVAL]`
- Tuition breakdown and feature comparison table.

### P-PUB-04: Developer Workshops Catalog `[REQUIRES APPROVAL]`
- Weekend bootcamps and workshop registration inquiry modal.

### P-PUB-05: Testimonials Showcase `[REQUIRES APPROVAL]`
- Student review slider and career outcome showcase.

### P-AUTH-02: Self-Signup & Password Recovery `[REQUIRES APPROVAL]`
- Self-registration form and email-based password reset flow.

### P-STU-04: Assessments & Timed Examination `[REQUIRES APPROVAL]`
- Timed exam countdown (`ExamTimer`), multiple-choice cards (`QuestionCard`), and auto-submission on expiration.

### P-STU-05: Exam Results & Performance Analytics `[REQUIRES APPROVAL]`
- Topic-level scorecards and performance feedback.

### P-STU-06: Attendance Ledger & Monthly Calendar `[REQUIRES APPROVAL]`
- Monthly attendance visual calendar and present/absent percentage tracking.

### P-STU-07: Class Schedule & Timetable `[REQUIRES APPROVAL]`
- Weekly lecture schedule and live meeting room links.

### P-STU-08: Notifications Feed & Student Profile `[REQUIRES APPROVAL]`
- Notification inbox and profile contact info editor.

---

## 4. Explicitly Excluded Features (Out of Scope)

The following features are **strictly unapproved**:

| Excluded Feature | Reason / Guidance |
|---|---|
| **Online Payment Gateways** | No Stripe/PayPal/Razorpay integration. All enrollments follow institutional inquiry. |
| **Coupons & Promotional Codes** | No coupon redemption engine or discount calculation logic. |
| **Automated PDF Certificates** | No PDF rendering libraries or credential minting workflows. |
| **Admin Workflows / CMS** | No administrative dashboards or content management CRUD. |
| **Leave Request Workflows** | No student leave application, approval, or balance tracking forms. |
| **Advanced Predictive Analytics** | No ML-based student grading predictions or external tracking pixels. |
