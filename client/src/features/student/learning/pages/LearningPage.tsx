import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ListVideo,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import VideoPlayerArea from '../components/VideoPlayerArea';
import LessonHeader from '../components/LessonHeader';
import LessonNotesTabs from '../components/LessonNotesTabs';
import LessonPlaylistSidebar from '../components/LessonPlaylistSidebar';
import { LearningCourse, DetailedLesson } from '../types';
import learningService from '../services/learningService';
import { ApiError } from '@/services/api/errors';

export const LearningPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId?: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<LearningCourse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [completionAlert, setCompletionAlert] = useState<string | null>(null);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const [, setIsCompleting] = useState<boolean>(false);

  // Fetch course from service
  const fetchCourse = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const targetId = courseId || 'dev-course-01';
      const data = await learningService.getCourse(targetId);
      setCourse(data);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : 'Unable to retrieve course learning environment. Please check your connection and retry.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  // Flatten all lessons in order
  const allLessons = useMemo(() => {
    if (!course) return [];
    const list: DetailedLesson[] = [];
    course.modules.forEach((mod) => {
      mod.lessons.forEach((l) => list.push(l));
    });
    return list;
  }, [course]);

  // Determine active lesson
  const currentLesson = useMemo(() => {
    if (!course || allLessons.length === 0) return null;
    if (lessonId) {
      const found = allLessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
    // Fallback: first in-progress or first lesson
    return allLessons.find((l) => l.status === 'in-progress') || allLessons[0];
  }, [course, lessonId, allLessons]);

  // Auto-redirect if lessonId is missing in URL
  useEffect(() => {
    if (course && !lessonId && currentLesson) {
      navigate(`/student/learning/${course.id}/${currentLesson.id}`, { replace: true });
    }
  }, [course, lessonId, currentLesson, navigate]);

  // Compute previous and next lesson IDs
  const { previousLessonId, nextLessonId } = useMemo(() => {
    if (!currentLesson || allLessons.length === 0) {
      return { previousLessonId: undefined, nextLessonId: undefined };
    }
    const idx = allLessons.findIndex((l) => l.id === currentLesson.id);
    const prev = idx > 0 ? allLessons[idx - 1].id : undefined;
    const next = idx < allLessons.length - 1 ? allLessons[idx + 1].id : undefined;
    return { previousLessonId: prev, nextLessonId: next };
  }, [currentLesson, allLessons]);

  // Calculate course completion progress
  const progressPercentage = useMemo(() => {
    if (!course) return 0;
    const total = allLessons.length;
    const completed = allLessons.filter((l) => l.status === 'completed').length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [course, allLessons]);

  // Handle switching lessons
  const handleNavigateLesson = (targetLessonId: string) => {
    if (!course) return;
    setCompletionAlert(null);
    setCompletionError(null);
    navigate(`/student/learning/${course.id}/${targetLessonId}`);
  };

  // Handle "Mark as Completed & Next"
  const handleMarkCompletedAndNext = async () => {
    if (!course || !currentLesson) return;

    setIsCompleting(true);
    setCompletionAlert(null);
    setCompletionError(null);

    try {
      const completionResult = await learningService.completeLesson(course.id, currentLesson.id);

      const currentIdx = allLessons.findIndex((l) => l.id === currentLesson.id);
      const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

      // Update course lesson states locally
      setCourse((prevCourse) => {
        if (!prevCourse) return prevCourse;

        return {
          ...prevCourse,
          modules: prevCourse.modules.map((mod) => ({
            ...mod,
            lessons: mod.lessons.map((les) => {
              if (les.id === currentLesson.id) {
                return { ...les, status: 'completed' };
              }
              if (
                completionResult.nextLessonId &&
                les.id === completionResult.nextLessonId &&
                les.status === 'locked'
              ) {
                return { ...les, status: completionResult.nextLessonStatus || 'in-progress' };
              }
              return les;
            }),
          })),
        };
      });

      if (nextLesson) {
        setCompletionAlert(`Lesson completed! Advanced to: ${nextLesson.title}`);
        navigate(`/student/learning/${course.id}/${nextLesson.id}`);
      } else {
        setCompletionAlert('Congratulations! You have completed all lessons in this curriculum track.');
      }
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : 'Unable to register lesson completion. Please try again.';
      setCompletionError(message);
    } finally {
      setIsCompleting(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="p-3.5 sm:p-5 lg:p-6 max-w-7xl mx-auto">
        <LoadingState message="Loading curriculum workspace..." minHeight="min-h-[420px]" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-3.5 sm:p-5 lg:p-6 max-w-7xl mx-auto space-y-4">
        <ErrorState
          title="Failed to Load Course"
          message={error}
          onRetry={fetchCourse}
          className="my-8"
        />
        <div className="text-center">
          <Link to="/student/courses">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" aria-hidden="true" />}
            >
              Return to Enrolled Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // If course or lesson is not found
  if (!course || !currentLesson) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <Card variant="default" className="p-6 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#FBEAE3] text-[#B4552C] flex items-center justify-center mx-auto">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <CardHeader className="p-0 space-y-1">
            <CardTitle as="h2" className="text-lg font-bold text-[#1A1F2B]">
              Course or Lesson Not Found
            </CardTitle>
            <p className="text-xs sm:text-sm text-[#5B6472]">
              The requested learning route does not match enrolled course records.
            </p>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <Link to="/student/courses">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" aria-hidden="true" />}
              >
                Return to Enrolled Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-5 lg:p-6 max-w-7xl mx-auto space-y-3.5 sm:space-y-4">
      {/* 1. Academic Context & Breadcrumbs Bar: Courses -> Course -> Module -> Lesson */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border border-slate-200/90 rounded-lg p-2.5 sm:p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      >
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#5B6472] min-w-0">
          <Link
            to="/student/courses"
            className="font-medium text-[#5B6472] hover:text-[#1B2A4A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded"
          >
            Courses
          </Link>
          <ChevronRight className="w-3 h-3 text-[#5B6472] shrink-0" aria-hidden="true" />
          <Link
            to="/student/courses"
            className="font-medium text-[#1A1F2B] hover:text-[#1B2A4A] transition-colors truncate max-w-[160px] sm:max-w-[220px]"
            title={course.title}
          >
            {course.title}
          </Link>
          <ChevronRight className="w-3 h-3 text-[#5B6472] shrink-0" aria-hidden="true" />
          <span
            className="text-[#5B6472] font-medium truncate max-w-[140px] sm:max-w-[180px]"
            title={currentLesson.moduleTitle}
          >
            {currentLesson.moduleTitle.replace(/^Module \d+:\s*/, '')}
          </span>
          <ChevronRight className="w-3 h-3 text-[#5B6472] shrink-0" aria-hidden="true" />
          <span
            className="text-[#1B2A4A] font-semibold truncate max-w-[160px] sm:max-w-[220px]"
            title={currentLesson.title}
          >
            {currentLesson.title}
          </span>
        </div>

        {/* Mobile Playlist Drawer Trigger */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden text-xs py-1 px-2.5 h-7"
            leftIcon={<ListVideo className="w-3.5 h-3.5 text-[#1B2A4A]" aria-hidden="true" />}
            aria-label="Open course playlist drawer"
          >
            Syllabus ({progressPercentage}%)
          </Button>
        </div>
      </nav>

      {/* Completion Alert Banner */}
      {completionAlert && (
        <div
          role="status"
          aria-live="polite"
          className="p-3 rounded-lg bg-[#FDF3D9] border border-[#D9A62B]/50 text-[#6E4F06] text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-[#D9A62B] shrink-0" aria-hidden="true" />
            <span className="font-semibold leading-relaxed break-words">{completionAlert}</span>
          </div>
          <button
            type="button"
            onClick={() => setCompletionAlert(null)}
            className="text-xs font-bold text-[#6E4F06] hover:text-[#1B2A4A] underline shrink-0 p-0.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Completion Error Banner */}
      {completionError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-3 rounded-lg bg-[#FBEAE3] border border-[#F0C9B4] text-[#B4552C] text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2 min-w-0">
            <AlertCircle className="w-4 h-4 text-[#B4552C] shrink-0" aria-hidden="true" />
            <span className="font-semibold leading-relaxed break-words">{completionError}</span>
          </div>
          <button
            type="button"
            onClick={() => setCompletionError(null)}
            className="text-xs font-bold text-[#B4552C] hover:text-[#1B2A4A] underline shrink-0 p-0.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Two-Column Learning Workspace */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
        {/* Left Column: Video Player, Lesson Header & Notes Tabs */}
        <div className="flex-1 min-w-0 w-full space-y-3.5 sm:space-y-4">
          {/* 1. Video Player Area */}
          <VideoPlayerArea lesson={currentLesson} />

          {/* 2. Lesson Title, Module Info & Navigation Controls */}
          <LessonHeader
            lesson={currentLesson}
            previousLessonId={previousLessonId}
            nextLessonId={nextLessonId}
            courseId={course.id}
            onNavigateLesson={handleNavigateLesson}
            onMarkCompletedAndNext={handleMarkCompletedAndNext}
          />

          {/* 3. Lesson Overview, Lecture Notes & Takeaways Tabs */}
          <LessonNotesTabs lesson={currentLesson} />
        </div>

        {/* Right Column: Persistent Desktop Playlist Sidebar */}
        <LessonPlaylistSidebar
          course={course}
          currentLessonId={currentLesson.id}
          onSelectLesson={handleNavigateLesson}
          isMobileDrawerOpen={isMobileDrawerOpen}
          onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
        />
      </div>
    </div>
  );
};

export default LearningPage;
