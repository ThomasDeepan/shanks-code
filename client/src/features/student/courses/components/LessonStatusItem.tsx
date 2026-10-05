import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, PlayCircle, Lock, Clock, Info } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { DevelopmentLesson, LessonStatus } from '../types';

export interface LessonStatusItemProps {
  lesson: DevelopmentLesson;
  index: number;
  courseId?: string;
}

const statusConfig: Record<
  LessonStatus,
  {
    label: string;
    icon: React.ReactNode;
    badgeVariant: 'good' | 'info' | 'default';
    rowClasses: string;
    textClasses: string;
  }
> = {
  completed: {
    label: 'Completed',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A62B] shrink-0" aria-hidden="true" />,
    badgeVariant: 'good',
    rowClasses: 'bg-white hover:bg-[#EEF1F6]/50 text-[#1B2A4A]',
    textClasses: 'text-[#1B2A4A] font-medium',
  },
  'in-progress': {
    label: 'In Progress',
    icon: <PlayCircle className="w-3.5 h-3.5 text-[#1B2A4A] shrink-0" aria-hidden="true" />,
    badgeVariant: 'info',
    rowClasses: 'bg-[#EEF1F6]/60 hover:bg-[#EEF1F6] text-[#1B2A4A]',
    textClasses: 'text-[#1B2A4A] font-semibold',
  },
  locked: {
    label: 'Locked',
    icon: <Lock className="w-3.5 h-3.5 text-[#5F5A50] shrink-0" aria-hidden="true" />,
    badgeVariant: 'default',
    rowClasses: 'bg-slate-50/40 opacity-70 cursor-not-allowed text-[#5F5A50]',
    textClasses: 'text-[#5F5A50] font-normal',
  },
};

export const LessonStatusItem: React.FC<LessonStatusItemProps> = ({ lesson, index, courseId }) => {
  const [lockedNotice, setLockedNotice] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentLesson = Boolean(
    courseId && location.pathname === `/student/learning/${courseId}/${lesson.id}`
  );

  const config = statusConfig[lesson.status];

  const handleRowClick = () => {
    if (lesson.status === 'locked') {
      setLockedNotice(true);
      return;
    }
    if (courseId) {
      navigate(`/student/learning/${courseId}/${lesson.id}`);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleRowClick}
        aria-disabled={lesson.status === 'locked'}
        aria-current={isCurrentLesson ? 'page' : undefined}
        aria-label={`Lesson ${index + 1}: ${lesson.title}, status: ${config.label}${
          lesson.duration ? `, duration: ${lesson.duration}` : ''
        }${isCurrentLesson ? ', currently active lesson' : ''}`}
        className={`w-full text-left flex items-center justify-between min-h-[38px] px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B2A4A] ${
          isCurrentLesson
            ? 'bg-[#FDF3D9] font-semibold text-[#1B2A4A] border-l-2 border-[#D9A62B]'
            : config.rowClasses
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {config.icon}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[#5B6472] font-mono text-[11px] shrink-0">
              {String(index + 1).padStart(2, '0')}.
            </span>
            <span className={`leading-snug truncate ${config.textClasses}`}>
              {lesson.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 pl-1.5">
          {lesson.duration && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#5B6472] font-mono">
              <Clock className="w-3 h-3 text-[#5B6472] shrink-0" aria-hidden="true" />
              {lesson.duration}
            </span>
          )}

          <Badge variant={config.badgeVariant} size="sm">
            {config.label}
          </Badge>
        </div>
      </button>

      {/* Locked Lesson Inline Notice */}
      {lockedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="mx-3 my-1.5 p-2.5 rounded-md bg-[#FBEAE3] border border-[#F0C9B4] text-[#B4552C] text-xs flex items-center justify-between gap-2 animate-in fade-in"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Info className="w-3.5 h-3.5 text-[#B4552C] shrink-0" aria-hidden="true" />
            <span className="leading-relaxed">
              This lesson is locked. Complete preceding lessons in this track to unlock lecture access.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLockedNotice(false)}
            className="text-[11px] font-semibold text-[#B4552C] hover:text-[#1B2A4A] underline shrink-0 p-0.5"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonStatusItem;
