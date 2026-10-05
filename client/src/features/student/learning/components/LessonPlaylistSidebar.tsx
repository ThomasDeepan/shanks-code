import React, { useState, useEffect } from 'react';
import {
  ListVideo,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronRight,
  Clock,
  X,
} from 'lucide-react';
import { LearningCourse } from '../types';

export interface LessonPlaylistSidebarProps {
  course: LearningCourse;
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const LessonPlaylistSidebar: React.FC<LessonPlaylistSidebarProps> = ({
  course,
  currentLessonId,
  onSelectLesson,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
}) => {
  // Modules accordion expanded state (all default open)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    course.modules.forEach((mod) => {
      map[mod.id] = true;
    });
    return map;
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen && onCloseMobileDrawer) {
        onCloseMobileDrawer();
      }
    };
    if (isMobileDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawerOpen, onCloseMobileDrawer]);

  // Calculate course total and completed count
  let totalLessons = 0;
  let completedLessons = 0;
  course.modules.forEach((mod) => {
    mod.lessons.forEach((l) => {
      totalLessons++;
      if (l.status === 'completed') completedLessons++;
    });
  });
  const progressPct =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const sidebarBody = (
    <div className="h-full flex flex-col bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-2xs">
      {/* Sidebar Header & Course Progress */}
      <div className="p-3 sm:p-3.5 border-b border-slate-200 bg-slate-50/90 space-y-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#1B2A4A]/10 text-[#1B2A4A] flex items-center justify-center border border-[#1B2A4A]/15">
              <ListVideo className="w-3 h-3" aria-hidden="true" />
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-[#1A1F2B] tracking-tight">
              Course Syllabus
            </h2>
          </div>

          {onCloseMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              aria-label="Close course syllabus drawer"
              className="lg:hidden p-1 rounded-md text-slate-500 hover:text-[#1A1F2B] hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="font-semibold text-[#5B6472]">Curriculum Progress</span>
            <span className="font-bold text-[#1B2A4A] font-mono">{progressPct}%</span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Curriculum progress: ${progressPct} percent completed`}
            className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden border border-slate-200/50"
          >
            <div
              className="bg-[#1B2A4A] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#5B6472]">
            <span>{course.modules.length} Modules</span>
            <span>{completedLessons} of {totalLessons} completed</span>
          </div>
        </div>
      </div>

      {/* Playlist Content: Single Unified Divided Accordion List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-200/80 scrollbar-thin">
        {course.modules.map((mod, modIdx) => {
          const isExpanded = expandedModules[mod.id] ?? true;
          const modCompleted = mod.lessons.filter((l) => l.status === 'completed').length;

          return (
            <div key={mod.id} className="bg-white">
              {/* Module Header Button */}
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                aria-expanded={isExpanded}
                aria-controls={`playlist-mod-${mod.id}`}
                className="w-full flex items-center justify-between py-2.5 px-3 bg-slate-50/80 hover:bg-slate-100/80 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B2A4A] select-none border-b border-slate-100"
              >
                <div className="min-w-0 pr-2 space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1B2A4A] block font-mono">
                    Module {String(modIdx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xs font-bold text-[#1A1F2B] truncate leading-tight">
                    {mod.title.replace(/^Module \d+:\s*/, '')}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
                  <span className="text-[10px] font-mono text-[#5B6472] bg-white px-1.5 py-0.5 rounded border border-slate-200/80 font-medium">
                    {modCompleted}/{mod.lessons.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  )}
                </div>
              </button>

              {/* Lessons in Module (Divided list, no floating cards) */}
              {isExpanded && (
                <div
                  id={`playlist-mod-${mod.id}`}
                  className="divide-y divide-slate-100 bg-white"
                >
                  {mod.lessons.map((les, lesIdx) => {
                    const isActive = les.id === currentLessonId;
                    const isLocked = les.status === 'locked';

                    return (
                      <button
                        key={les.id}
                        type="button"
                        disabled={isLocked}
                        aria-disabled={isLocked}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => {
                          if (!isLocked) {
                            onSelectLesson(les.id);
                            onCloseMobileDrawer?.();
                          }
                        }}
                        aria-label={`Lesson ${lesIdx + 1}: ${les.title}, status: ${les.status}${isActive ? ', currently active lesson' : ''
                          }${les.duration ? `, duration: ${les.duration}` : ''}`}
                        className={`w-full flex items-start gap-2.5 py-2 px-3 text-left transition-all min-h-[38px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B2A4A] ${isActive
                            ? 'bg-[#FDF3D9] border-l-[3px] border-[#D9A62B] text-[#1B2A4A] font-semibold'
                            : isLocked
                              ? 'opacity-60 bg-slate-50/30 cursor-not-allowed text-[#5B6472] border-l-[3px] border-transparent'
                              : 'hover:bg-slate-50/90 text-[#5B6472] hover:text-[#1B2A4A] font-normal border-l-[3px] border-transparent'
                          }`}
                      >
                        {/* Status Icon */}
                        <div className="mt-0.5 shrink-0">
                          {les.status === 'completed' ? (
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-[#D9A62B]"
                              aria-hidden="true"
                            />
                          ) : isActive ? (
                            <PlayCircle
                              className="w-3.5 h-3.5 text-[#D9A62B]"
                              aria-hidden="true"
                            />
                          ) : isLocked ? (
                            <Lock
                              className="w-3.5 h-3.5 text-[#5B6472]"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlayCircle
                              className="w-3.5 h-3.5 text-[#5B6472]"
                              aria-hidden="true"
                            />
                          )}
                        </div>

                        {/* Title and Metadata */}
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <p
                            className={`text-xs leading-snug line-clamp-2 ${isActive
                                ? 'font-bold text-[#1B2A4A]'
                                : isLocked
                                  ? 'text-[#5B6472] font-normal'
                                  : 'text-[#1A1F2B] font-medium'
                              }`}
                          >
                            <span className="font-mono text-[#5B6472] font-normal mr-1 text-[11px]">
                              {String(lesIdx + 1).padStart(2, '0')}.
                            </span>
                            {les.title}
                          </p>

                          <div className="flex items-center gap-2 text-[10px] text-[#5B6472]">
                            <span className="flex items-center gap-1 font-medium font-mono">
                              <Clock className="w-2.5 h-2.5 text-[#5B6472]" aria-hidden="true" />
                              {les.duration}
                            </span>
                            {isActive && (
                              <span className="inline-flex items-center font-bold text-[#6E4F06] bg-[#FDF3D9] px-1.5 py-0.2 rounded text-[9px] border border-[#D9A62B]/40">
                                Now Playing
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar Column */}
      <aside
        aria-label="Course Playlist Sidebar"
        className="hidden lg:block w-72 xl:w-80 shrink-0 h-[calc(100vh-6.5rem)] sticky top-3"
      >
        {sidebarBody}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Course Playlist Drawer"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity"
            onClick={onCloseMobileDrawer}
            aria-hidden="true"
          />

          {/* Drawer Body */}
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarBody}
          </div>
        </div>
      )}
    </>
  );
};

export default LessonPlaylistSidebar;
