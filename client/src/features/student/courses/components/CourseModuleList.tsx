import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Layers } from 'lucide-react';
import LessonStatusItem from './LessonStatusItem';
import { DevelopmentModule } from '../types';

export interface CourseModuleListProps {
  modules: DevelopmentModule[];
  courseId?: string;
}

export const CourseModuleList: React.FC<CourseModuleListProps> = ({ modules, courseId }) => {
  // All modules expanded by default for full academic visibility, with individual toggle support
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    modules.forEach((mod) => {
      initial[mod.id] = true;
    });
    return initial;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="border border-slate-200/90 rounded-md overflow-hidden bg-white divide-y divide-slate-200/80">
      {modules.map((mod, modIndex) => {
        const isExpanded = expandedModules[mod.id] ?? true;
        const completedLessons = mod.lessons.filter((l) => l.status === 'completed').length;
        const totalLessons = mod.lessons.length;

        return (
          <div key={mod.id} className="bg-white">
            {/* Module Accordion Header */}
            <button
              type="button"
              onClick={() => toggleModule(mod.id)}
              aria-expanded={isExpanded}
              aria-controls={`module-lessons-${mod.id}`}
              className={`w-full flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 text-left transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B2A4A] ${
                isExpanded ? 'bg-slate-50/70 hover:bg-slate-50' : 'bg-white hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                    isExpanded
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                      : 'bg-[#E7ECF5] text-[#1B2A4A] border-[#C7D3E8]'
                  }`}
                >
                  <Layers className="w-3 h-3" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#1B2A4A] uppercase tracking-wider font-mono">
                      Module {String(modIndex + 1).padStart(2, '0')}:
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1A1F2B] truncate">
                      {mod.title.replace(/^Module \d+:\s*/, '')}
                    </h4>
                  </div>
                  <span className="text-[11px] text-[#5B6472] font-mono hidden sm:inline-block">
                    ({completedLessons}/{totalLessons} completed)
                  </span>
                </div>
              </div>

              {/* Chevron Affordance */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-[#5B6472] font-mono sm:hidden">
                  {completedLessons}/{totalLessons}
                </span>
                <div className="text-[#5B6472]">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </div>
              </div>
            </button>

            {/* Nested Lessons List */}
            {isExpanded && (
              <div
                id={`module-lessons-${mod.id}`}
                className="border-t border-slate-100 bg-white"
              >
                {mod.description && (
                  <p className="text-[11px] sm:text-xs text-[#5B6472] px-3 py-2 sm:px-4 bg-slate-50/50 border-b border-slate-100 leading-relaxed font-normal">
                    {mod.description}
                  </p>
                )}
                <div className="divide-y divide-slate-100">
                  {mod.lessons.map((lesson, lessonIndex) => (
                    <LessonStatusItem
                      key={lesson.id}
                      lesson={lesson}
                      index={lessonIndex}
                      courseId={courseId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseModuleList;
