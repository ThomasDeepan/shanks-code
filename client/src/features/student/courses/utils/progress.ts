import { DevelopmentModule, CourseProgressMetrics } from '../types';

/**
 * Calculates course progress directly derived from lesson completion states.
 * Ensures the calculated percentage is clamped between 0 and 100.
 */
export const calculateCourseProgress = (modules: DevelopmentModule[]): CourseProgressMetrics => {
  let completedCount = 0;
  let totalCount = 0;

  modules.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      totalCount++;
      if (lesson.status === 'completed') {
        completedCount++;
      }
    });
  });

  const percentage =
    totalCount > 0
      ? Math.min(100, Math.max(0, Math.round((completedCount / totalCount) * 100)))
      : 0;

  return { completedCount, totalCount, percentage };
};

export default calculateCourseProgress;
