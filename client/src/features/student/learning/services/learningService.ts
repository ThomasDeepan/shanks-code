import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import { ProposedLessonCompletionResponse } from '@/services/api/types';
import { LearningCourse } from '../types';
import {
  DEVELOPMENT_LEARNING_COURSES,
  getLearningCourseById,
} from '../data/mockLearningData';

/**
 * Learning Service
 * Manages active course playback syllabus, lesson content, and lesson completion dispatch.
 *
 * Proposed Endpoints:
 * - GET /api/student/courses/:id
 * - POST /api/student/courses/:courseId/lessons/:lessonId/complete
 */
export const learningService = {
  /**
   * Retrieves interactive learning course syllabus and lesson details.
   */
  async getCourse(courseId: string): Promise<LearningCourse | null> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      const found = getLearningCourseById(courseId) || DEVELOPMENT_LEARNING_COURSES[0];
      // Return a deep clone so local completions during demo don't permanently corrupt the constant
      return found ? JSON.parse(JSON.stringify(found)) : null;
    }

    // Live mode: dispatch to real Node.js/Express backend (No silent fallback!)
    return apiClient.get<LearningCourse>(`/student/courses/${courseId}`);
  },

  /**
   * Submits lesson completion and receives progression unlock status.
   *
   * Proposed Endpoint:
   * POST /api/student/courses/:courseId/lessons/:lessonId/complete
   */
  async completeLesson(
    courseId: string,
    lessonId: string
  ): Promise<ProposedLessonCompletionResponse> {
    if (apiConfig.isMock) {
      // Simulate realistic network latency for completion request
      await new Promise((resolve) => setTimeout(resolve, 300));

      const course = getLearningCourseById(courseId) || DEVELOPMENT_LEARNING_COURSES[0];
      const allLessons = course ? course.modules.flatMap((m) => m.lessons) : [];
      const currentIdx = allLessons.findIndex((l) => l.id === lessonId);
      const nextLesson =
        currentIdx !== -1 && currentIdx < allLessons.length - 1
          ? allLessons[currentIdx + 1]
          : undefined;

      const completedCount =
        allLessons.filter((l) => l.id === lessonId || l.status === 'completed').length;
      const totalCount = allLessons.length;
      const updatedCourseProgress =
        totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

      return {
        completedLessonId: lessonId,
        status: 'completed',
        nextLessonId: nextLesson?.id,
        nextLessonStatus: nextLesson ? 'in-progress' : undefined,
        updatedCourseProgress,
      };
    }

    // Live mode: dispatch to real Node.js/Express backend (No silent fallback!)
    return apiClient.post<ProposedLessonCompletionResponse>(
      `/student/courses/${courseId}/lessons/${lessonId}/complete`
    );
  },
};

export default learningService;
