export type LessonStatus = 'completed' | 'in-progress' | 'locked';

export interface DetailedLesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  courseId: string;
  title: string;
  status: LessonStatus;
  duration: string;
  videoDurationSeconds: number;
  summary: string;
  keyTakeaways: string[];
  notes: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface LearningModule {
  id: string;
  title: string;
  lessons: DetailedLesson[];
}

export interface LearningCourse {
  id: string;
  title: string;
  category: string;
  modules: LearningModule[];
}
