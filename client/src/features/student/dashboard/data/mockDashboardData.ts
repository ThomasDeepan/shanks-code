import { DevelopmentDashboardData } from '../types';

/**
 * Development placeholder data for dashboard UI demonstration.
 * Final student/course data must come from the confirmed backend API contract.
 */
export const DEVELOPMENT_DASHBOARD_DATA: DevelopmentDashboardData = {
  overallCompletionPercentage: 48,
  enrolledCoursesCount: 2,
  activeCourses: [
    {
      id: 'dev-course-01',
      title: 'Full-Stack Software Engineering',
      currentModule: 'Module 2: Component Architecture & State Management',
      progressPercentage: 65,
    },
    {
      id: 'dev-course-02',
      title: 'Backend Services & Distributed APIs',
      currentModule: 'Module 1: RESTful API Design & Express Middleware',
      progressPercentage: 30,
    },
  ],
};
