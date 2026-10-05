import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import DashboardWelcome from '../components/DashboardWelcome';
import ProgressOverview from '../components/ProgressOverview';
import ActiveCourseCard from '../components/ActiveCourseCard';
import { DevelopmentDashboardData } from '../types';
import dashboardService from '../services/dashboardService';
import { ApiError } from '@/services/api/errors';

export const StudentDashboardPage: React.FC = () => {
  const [data, setData] = useState<DevelopmentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await dashboardService.getDashboardData();
      setData(result);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : 'Unable to retrieve your dashboard metrics. Please check your network connection and retry.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return (
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 max-w-7xl mx-auto">
        <LoadingState message="Loading student portal dashboard..." minHeight="min-h-[280px]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 max-w-7xl mx-auto">
        <ErrorState
          title="Failed to Load Dashboard"
          message={error || 'Unable to retrieve your dashboard overview.'}
          onRetry={fetchDashboardData}
          className="my-6"
        />
      </div>
    );
  }

  const hasActiveCourses = data.activeCourses.length > 0;

  return (
    <div className="p-3 sm:p-4 md:p-5 lg:p-6 max-w-7xl mx-auto space-y-3.5 sm:space-y-4">
      {/* 1. Personalized Student Greeting & Context */}
      <DashboardWelcome />

      {/* 2. Unified Academic Progress Summary */}
      <ProgressOverview
        enrolledCoursesCount={data.enrolledCoursesCount}
        overallCompletionPercentage={data.overallCompletionPercentage}
      />

      {/* 3. Active Enrolled Courses Section — Primary Working Area */}
      <section aria-labelledby="active-courses-heading" className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-0.5">
          <div>
            <h2 id="active-courses-heading" className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Active Courses
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Continue your structured coursework and module progression.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200/80 px-2 py-0.5 rounded-full shadow-2xs self-start sm:self-center font-mono">
            {data.activeCourses.length} active course{data.activeCourses.length === 1 ? '' : 's'}
          </span>
        </div>

        {hasActiveCourses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {data.activeCourses.map((course) => (
              <ActiveCourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 text-center shadow-2xs max-w-md mx-auto">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-4 h-4 text-slate-600" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              No Active Courses Enrolled
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              You are not currently enrolled in any active courses. Check the academic catalog for available tracks.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboardPage;
