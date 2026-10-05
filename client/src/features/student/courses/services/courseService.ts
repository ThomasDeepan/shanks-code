import { apiClient } from '@/services/api/client';
import { apiConfig } from '@/services/api/config';
import { DevelopmentCourse } from '../types';
import { DEVELOPMENT_ENROLLED_COURSES } from '../data/mockCoursesData';

/**
 * Course Service
 * Manages student enrolled course retrieval, syllabus inspection, and progress metrics.
 *
 * Proposed Endpoints:
 * - GET /api/student/courses
 * - GET /api/student/courses/:id
 */
export const courseService = {
  /**
   * Retrieves active enrolled courses for the authenticated student.
   */
  async getEnrolledCourses(): Promise<DevelopmentCourse[]> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      return [...DEVELOPMENT_ENROLLED_COURSES];
    }

    // Live mode: dispatch to real Node.js/Express backend (No silent fallback!)
    return apiClient.get<DevelopmentCourse[]>('/student/courses');
  },

  /**
   * Retrieves full syllabus and modular lesson hierarchy for a specific course.
   */
  async getCourseById(courseId: string): Promise<DevelopmentCourse | null> {
    if (apiConfig.isMock) {
      await new Promise((resolve) => setTimeout(resolve, apiConfig.mockDelayMs));
      const found = DEVELOPMENT_ENROLLED_COURSES.find((c) => c.id === courseId);
      return found ? { ...found } : null;
    }

    // Live mode: dispatch to real Node.js/Express backend
    return apiClient.get<DevelopmentCourse>(`/student/courses/${courseId}`);
  },
};

export default courseService;
