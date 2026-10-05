export type LessonStatus = 'completed' | 'in-progress' | 'locked';

export interface DevelopmentLesson {
  id: string;
  title: string;
  status: LessonStatus;
  duration?: string;
}

export interface DevelopmentModule {
  id: string;
  title: string;
  description?: string;
  lessons: DevelopmentLesson[];
}

export interface DevelopmentCourse {
  id: string;
  title: string;
  description: string;
  category?: string;
  modules: DevelopmentModule[];
}

export interface CourseProgressMetrics {
  completedCount: number;
  totalCount: number;
  percentage: number;
}
