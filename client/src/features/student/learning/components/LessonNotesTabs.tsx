import React, { useState } from 'react';
import {
  FileText,
  Lightbulb,
  Code2,
  Copy,
  Check,
  BookOpen,
  Clock,
  Layers,
} from 'lucide-react';
import { DetailedLesson } from '../types';

export interface LessonNotesTabsProps {
  lesson: DetailedLesson;
}

export const LessonNotesTabs: React.FC<LessonNotesTabsProps> = ({ lesson }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'takeaways'>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async (codeString: string) => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <section
      aria-label="Lesson learning resources and curriculum material"
      className="bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-2xs"
    >
      {/* Tab Navigation Bar */}
      <div
        role="tablist"
        aria-label="Lesson learning resources tabs"
        className="flex items-center border-b border-slate-200/90 bg-slate-50/80 px-3 sm:px-4 gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none"
      >
        <button
          type="button"
          role="tab"
          id="tab-overview"
          aria-selected={activeTab === 'overview'}
          aria-controls="panel-overview"
          tabIndex={activeTab === 'overview' ? 0 : -1}
          onClick={() => setActiveTab('overview')}
          className={`py-2.5 px-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] select-none ${
            activeTab === 'overview'
              ? 'border-[#1B2A4A] text-[#1B2A4A]'
              : 'border-transparent text-[#5B6472] hover:text-[#1A1F2B] hover:border-slate-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Lesson Overview</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-notes"
          aria-selected={activeTab === 'notes'}
          aria-controls="panel-notes"
          tabIndex={activeTab === 'notes' ? 0 : -1}
          onClick={() => setActiveTab('notes')}
          className={`py-2.5 px-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] select-none ${
            activeTab === 'notes'
              ? 'border-[#1B2A4A] text-[#1B2A4A]'
              : 'border-transparent text-[#5B6472] hover:text-[#1A1F2B] hover:border-slate-300'
          }`}
        >
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Lecture Notes &amp; Code</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-takeaways"
          aria-selected={activeTab === 'takeaways'}
          aria-controls="panel-takeaways"
          tabIndex={activeTab === 'takeaways' ? 0 : -1}
          onClick={() => setActiveTab('takeaways')}
          className={`py-2.5 px-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] select-none ${
            activeTab === 'takeaways'
              ? 'border-[#1B2A4A] text-[#1B2A4A]'
              : 'border-transparent text-[#5B6472] hover:text-[#1A1F2B] hover:border-slate-300'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Key Takeaways</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-3.5 sm:p-4 md:p-5">
        {/* Tab 1: Lesson Overview */}
        {activeTab === 'overview' && (
          <div
            role="tabpanel"
            id="panel-overview"
            aria-labelledby="tab-overview"
            tabIndex={0}
            className="space-y-4 focus-visible:outline-none"
          >
            {/* Context & Description */}
            <div className="space-y-1.5">
              <h2 className="text-xs sm:text-sm font-bold text-[#1A1F2B] tracking-tight">
                About This Lesson
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed">
                {lesson.summary}
              </p>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-slate-50 border border-slate-200/80 text-[#1A1F2B]">
                <Layers className="w-4 h-4 text-[#1B2A4A] shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#5B6472] block">Curriculum Module</span>
                  <span className="font-semibold truncate block">{lesson.moduleTitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-md bg-slate-50 border border-slate-200/80 text-[#1A1F2B]">
                <Clock className="w-4 h-4 text-[#D9A62B] shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#5B6472] block">Session Length</span>
                  <span className="font-semibold block">{lesson.duration || 'Self-Paced'}</span>
                </div>
              </div>
            </div>

            {/* What you'll learn in this session */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-[#1A1F2B]">
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5B6472]">
                {lesson.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A] mt-2 shrink-0" aria-hidden="true" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Lecture Notes & Code */}
        {activeTab === 'notes' && (
          <div
            role="tabpanel"
            id="panel-notes"
            aria-labelledby="tab-notes"
            tabIndex={0}
            className="space-y-4 focus-visible:outline-none"
          >
            <div className="space-y-1.5">
              <h2 className="text-xs sm:text-sm font-bold text-[#1A1F2B] tracking-tight">
                Technical Lecture Notes
              </h2>
              <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-[#1A1F2B] leading-relaxed font-normal">
                {lesson.notes}
              </div>
            </div>

            {lesson.codeSnippet && (
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-[#5B6472]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#1A1F2B] text-xs">
                    <Code2 className="w-3.5 h-3.5 text-[#1B2A4A]" aria-hidden="true" />
                    Reference Code Snippet
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(lesson.codeSnippet?.code || '')}
                    aria-label="Copy reference code snippet"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium text-[#5B6472] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#D9A62B]" aria-hidden="true" />
                        <span className="text-[#6E4F06] font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#5B6472]" aria-hidden="true" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Monospace Code Editor Block */}
                <div className="rounded-md overflow-hidden border border-slate-800 bg-slate-950 shadow-2xs">
                  <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
                      <span className="ml-1 text-slate-300">
                        snippet.{lesson.codeSnippet.language === 'typescript' ? 'ts' : 'js'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      {lesson.codeSnippet.language}
                    </span>
                  </div>

                  <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200 scrollbar-thin">
                    <code>{lesson.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Key Takeaways */}
        {activeTab === 'takeaways' && (
          <div
            role="tabpanel"
            id="panel-takeaways"
            aria-labelledby="tab-takeaways"
            tabIndex={0}
            className="space-y-3.5 focus-visible:outline-none"
          >
            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold text-[#1A1F2B] tracking-tight">
                Core Engineering Takeaways
              </h2>
              <p className="text-[11px] sm:text-xs text-[#5B6472]">
                Key concepts and implementation principles covered in this lecture.
              </p>
            </div>

            <ol className="divide-y divide-slate-100 border border-slate-200/80 rounded-md overflow-hidden bg-white">
              {lesson.keyTakeaways.map((takeaway, idx) => (
                <li
                  key={idx}
                  className="flex items-baseline gap-3 p-3 hover:bg-slate-50/60 transition-colors"
                >
                  <span className="font-mono text-[10px] font-bold text-[#1B2A4A] shrink-0 bg-[#1B2A4A]/10 px-1.5 py-0.5 rounded border border-[#1B2A4A]/15">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed font-normal">
                      {takeaway}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default LessonNotesTabs;
