import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export interface ProgressOverviewProps {
  enrolledCoursesCount: number;
  overallCompletionPercentage: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  enrolledCoursesCount,
  overallCompletionPercentage,
}) => {
  const clampedPercentage = Math.min(100, Math.max(0, Math.round(overallCompletionPercentage)));

  return (
    <div
      role="region"
      aria-label="Academic progress overview"
      className="bg-white border border-slate-200/90 rounded-lg p-3 sm:p-4 shadow-2xs"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 sm:divide-slate-200/70 items-center">
        {/* Metric 1: Enrolled Tracks */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-md bg-[#E7ECF5] text-[#1B2A4A] flex items-center justify-center shrink-0 border border-[#C7D3E8]">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1F2B] leading-none">
                {enrolledCoursesCount}
              </span>
              <span className="text-xs font-semibold text-[#5B6472]">
                {enrolledCoursesCount === 1 ? 'Active Course' : 'Active Courses'}
              </span>
            </div>
            <p className="text-[11px] text-[#5B6472] font-medium mt-0.5 truncate">
              Enrolled technical curriculum tracks
            </p>
          </div>
        </div>

        {/* Metric 2: Overall Curriculum Completion */}
        <div className="pt-3 sm:pt-0 sm:pl-6 flex flex-col justify-center space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A62B] shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold text-[#1B2A4A]">
                Curriculum Progress
              </span>
            </div>
            <span className="text-sm font-bold text-[#1B2A4A] tabular-nums font-mono">
              {clampedPercentage}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={clampedPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Overall academic progress: ${clampedPercentage} percent`}
            className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200/50"
          >
            <div
              className="bg-[#1B2A4A] h-full rounded-full transition-all duration-300"
              style={{ width: `${clampedPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#5B6472]">
            <span>Milestones completed</span>
            <span>Self-Paced Progression</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
