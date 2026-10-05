import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Lock,
  Clock,
  Layers,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { DetailedLesson } from '../types';

export interface LessonHeaderProps {
  lesson: DetailedLesson;
  previousLessonId?: string;
  nextLessonId?: string;
  courseId: string;
  onNavigateLesson: (targetLessonId: string) => void;
  onMarkCompletedAndNext: () => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  lesson,
  previousLessonId,
  nextLessonId,
  onNavigateLesson,
  onMarkCompletedAndNext,
}) => {
  const isCompleted = lesson.status === 'completed';

  return (
    <header
      aria-label="Lesson Details and Navigation"
      className="bg-white border border-slate-200/90 rounded-lg p-3.5 sm:p-4 shadow-2xs space-y-3"
    >
      {/* 1. Module Context, Status & Duration Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1B2A4A] font-mono truncate max-w-md">
          <Layers className="w-3.5 h-3.5 text-[#1B2A4A] shrink-0" aria-hidden="true" />
          <span className="truncate">{lesson.moduleTitle}</span>
        </div>

        <div className="flex items-center gap-2">
          {lesson.duration && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5B6472] font-mono">
              <Clock className="w-3 h-3 text-[#5B6472]" aria-hidden="true" />
              {lesson.duration}
            </span>
          )}

          <Badge
            variant={isCompleted ? 'good' : lesson.status === 'in-progress' ? 'info' : 'default'}
            size="sm"
            icon={
              isCompleted ? (
                <CheckCircle2 className="w-3 h-3 text-[#D9A62B]" aria-hidden="true" />
              ) : lesson.status === 'in-progress' ? (
                <PlayCircle className="w-3 h-3 text-[#1B2A4A]" aria-hidden="true" />
              ) : (
                <Lock className="w-3 h-3 text-[#5F5A50]" aria-hidden="true" />
              )
            }
          >
            {isCompleted ? 'Completed' : lesson.status === 'in-progress' ? 'In Progress' : 'Locked'}
          </Badge>
        </div>
      </div>

      {/* 2. Lesson Title & Technical Summary */}
      <div className="space-y-1">
        <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#1A1F2B] leading-snug">
          {lesson.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed max-w-3xl">
          {lesson.summary}
        </p>
      </div>

      {/* 3. Navigation Controls & Primary Completion Action */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={!previousLessonId}
          onClick={() => previousLessonId && onNavigateLesson(previousLessonId)}
          leftIcon={<ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />}
          aria-label={previousLessonId ? 'Go to previous lesson' : 'No previous lesson available'}
          className="order-2 sm:order-1 min-h-[36px] text-xs font-semibold"
        >
          Previous
        </Button>

        {/* Primary Completion Button */}
        <div className="order-1 sm:order-2 flex-1 sm:flex-initial flex justify-center">
          <Button
            variant="primary"
            size="sm"
            onClick={onMarkCompletedAndNext}
            leftIcon={<CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
            aria-label={
              isCompleted
                ? 'Lesson already completed. Advance to next lesson'
                : 'Mark current lesson as completed and continue to next lesson'
            }
            className="w-full sm:w-auto shadow-2xs min-h-[36px] text-xs font-semibold px-4"
          >
            {isCompleted ? 'Completed • Next Lesson' : 'Mark as Completed & Next'}
          </Button>
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={!nextLessonId}
          onClick={() => nextLessonId && onNavigateLesson(nextLessonId)}
          rightIcon={<ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
          aria-label={nextLessonId ? 'Go to next lesson' : 'No next lesson available'}
          className="order-3 min-h-[36px] text-xs font-semibold"
        >
          Next
        </Button>
      </div>
    </header>
  );
};

export default LessonHeader;
