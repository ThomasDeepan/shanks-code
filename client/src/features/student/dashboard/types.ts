export interface DevelopmentCourseItem {
  id: string;
  title: string;
  currentModule: string;
  progressPercentage: number;
}

export interface DevelopmentDashboardData {
  overallCompletionPercentage: number;
  enrolledCoursesCount: number;
  activeCourses: DevelopmentCourseItem[];
}
