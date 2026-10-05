import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Layers } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import EnrolledCourseCard from '../components/EnrolledCourseCard';
import { DevelopmentCourse } from '../types';
import courseService from '../services/courseService';
import { ApiError } from '@/services/api/errors';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<DevelopmentCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await courseService.getEnrolledCourses();
      setCourses(data);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : 'Unable to retrieve your enrolled courses. Please check your network connection and retry.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="p-3 sm:p-4 md:p-5 lg:p-6 max-w-7xl mx-auto space-y-3.5 sm:space-y-4">
      {/* 1. Compact Academic Header (Consistent with Dashboard Scale) */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 sm:p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B2A4A] flex items-center gap-1.5 font-mono">
                <BookOpen className="w-3.5 h-3.5 text-[#1B2A4A]" aria-hidden="true" />
                Academic Curriculum
              </span>
              <Badge variant="default" size="sm" dot>
                Enrolled Curriculum
              </Badge>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#1A1F2B] leading-snug">
              Enrolled Courses &amp; Syllabus
            </h1>

            <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed">
              Review your enrolled engineering curriculum, monitor modular progression, and resume coursework across all active tracks.
            </p>
          </div>

          {/* Quick Enrolled Status Pill */}
          {!isLoading && !error && courses.length > 0 && (
            <div className="self-start sm:self-center shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1F2B] bg-[#F5F6F8] border border-slate-200 px-3 py-1.5 rounded-md font-mono shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#1B2A4A]" aria-hidden="true" />
                <span>{courses.length} active track{courses.length === 1 ? '' : 's'}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Loading State */}
      {isLoading && (
        <LoadingState message="Loading enrolled engineering courses..." minHeight="min-h-[260px]" />
      )}

      {/* 3. Error State */}
      {!isLoading && error && (
        <ErrorState
          title="Failed to Load Courses"
          message={error}
          onRetry={fetchCourses}
          className="my-6"
        />
      )}

      {/* 4. Empty State */}
      {!isLoading && !error && courses.length === 0 && (
        <EmptyState
          title="No Active Courses Enrolled"
          description="You are not currently enrolled in any academic curriculum tracks. Explore the technical catalog to get started."
          className="my-6"
        />
      )}

      {/* 5. Enrolled Courses List */}
      {!isLoading && !error && courses.length > 0 && (
        <div className="space-y-3.5 sm:space-y-4">
          {courses.map((course) => (
            <EnrolledCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
