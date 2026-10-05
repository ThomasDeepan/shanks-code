# 04 — User Flows: Shank's Code

This document outlines standard user journeys across the public platform and the authenticated student portal.

> [!NOTE]
> Each user flow is tagged with its confirmation status based on `03-FEATURE-SPEC.md`. Flows marked `REQUIRES APPROVAL` represent proposed interaction models and must receive explicit confirmation before being finalized for production implementation.

---

## Flow 1: Prospective Student Discovers a Program & Reviews Syllabus `[CONFIRMED]`

```mermaid
sequenceDiagram
    autonumber
    actor Visitor
    participant Browser
    participant ProgramsPage
    participant ProgramDetailPage
    participant SyllabusModal

    Visitor->>Browser: Navigates to /programs
    Browser->>ProgramsPage: Renders program catalog with category filters
    Visitor->>ProgramsPage: Selects "Full Stack Engineering" filter
    ProgramsPage->>Browser: Updates filtered grid
    Visitor->>ProgramsPage: Clicks "View Curriculum" on program card
    Browser->>ProgramDetailPage: Navigates to /programs/:id
    ProgramDetailPage->>Browser: Renders program outcomes, prerequisites, and modules
    Visitor->>ProgramDetailPage: Clicks "Preview Syllabus"
    ProgramDetailPage->>SyllabusModal: Opens accessible modal with full week-by-week topic breakdown
    Visitor->>SyllabusModal: Reviews syllabus and closes modal
```

---

## Flow 2: Student Authentication & Portal Onboarding `[CONFIRMED]`

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Browser
    participant LoginPage
    participant AuthContext
    participant Dashboard

    Student->>Browser: Navigates to /login (or clicks "Student Portal" in Navbar)
    Browser->>LoginPage: Renders login form with email/password and Demo Login option
    alt Standard Login
        Student->>LoginPage: Inputs student email and password, clicks "Sign In"
        LoginPage->>AuthContext: Dispatches login action with credentials
    else Quick Demo Access
        Student->>LoginPage: Clicks "Quick Demo Student Login"
        LoginPage->>AuthContext: Dispatches demo student credentials
    end
    AuthContext->>Browser: Persists user session token in localStorage
    Browser->>Dashboard: Redirects to /student/dashboard
    Dashboard->>Browser: Displays personalized welcome banner, active courses, and stats
```

---

## Flow 3: Student Continues Learning (Course Module to Lesson Player) `[CONFIRMED]`

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Dashboard
    participant CoursesPage
    participant LearningPage
    participant VideoPlayer

    Student->>Dashboard: Clicks "Resume Course" on active course card
    Dashboard->>LearningPage: Navigates to /student/learning/:courseId/:lessonId
    LearningPage->>VideoPlayer: Loads current lesson video & resources
    LearningPage->>Student: Displays interactive lesson outline in sidebar
    Student->>VideoPlayer: Watches technical video lecture
    Student->>LearningPage: Clicks "Mark as Completed & Next"
    LearningPage->>LearningPage: Updates progress indicator, selects next lesson in sequence
```

---

## Flow 4: Student Takes a Timed Assessment `[REQUIRES APPROVAL]`

> [!WARNING]
> This flow depends on the proposed Timed Assessment & Quiz Engine feature and is **subject to project owner approval**.

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant AssessmentsPage
    participant AssessmentPage
    participant ExamTimer
    participant QuestionCard
    participant ResultsPage

    Student->>AssessmentsPage: Views list of assigned assessments
    Student->>AssessmentsPage: Clicks "Start Exam" on active test card
    AssessmentsPage->>AssessmentPage: Enters /student/assessments/:id (Fullscreen quiz layout)
    AssessmentPage->>ExamTimer: Initializes countdown timer (e.g. 45:00)
    loop Answering Questions
        AssessmentPage->>QuestionCard: Displays question prompt & options
        Student->>QuestionCard: Selects option (A/B/C/D)
        Student->>AssessmentPage: Clicks "Next Question"
    end
    alt Manual Submission
        Student->>AssessmentPage: Clicks "Submit Exam"
        AssessmentPage->>Student: Prompts confirmation modal ("Are you sure? 2 questions unanswered")
        Student->>AssessmentPage: Confirms submission
    else Timer Expires (00:00)
        ExamTimer->>AssessmentPage: Emits time-expired event
        AssessmentPage->>AssessmentPage: Triggers automatic submission
    end
    AssessmentPage->>ResultsPage: Redirects to /student/results with performance breakdown
    ResultsPage->>Student: Displays final score, percentage, and topic analytics
```

---

## Flow 5: Student Monitors Attendance & Weekly Timetable `[REQUIRES APPROVAL]`

> [!WARNING]
> This flow depends on the proposed Attendance Ledger and Schedule features and is **subject to project owner approval**.

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant StudentLayout
    participant AttendancePage
    participant SchedulePage

    Student->>StudentLayout: Clicks "Attendance" in sidebar
    StudentLayout->>AttendancePage: Renders monthly calendar grid (Present/Absent/Holiday pills)
    Student->>AttendancePage: Reviews total classes attended & percentage threshold
    Student->>StudentLayout: Clicks "Schedule" in sidebar
    StudentLayout->>SchedulePage: Renders weekly timetable view
    SchedulePage->>Student: Displays upcoming lectures, assigned faculty, and session timings
```
