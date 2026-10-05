import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import AppliedProgramsTracks from '@/features/programs/components/AppliedProgramsTracks';

/**
 * Learning principles — restored from the original `ExperientialLearningSection`.
 * Kept verbatim in substance; presented as a compact strip above the track grid.
 */
const learningPrinciples = [
  { action: 'LEARN', modifier: 'Innovatively', desc: 'Modern problem solving & systems thinking' },
  { action: 'BUILD', modifier: 'Confidently', desc: 'Production-ready software & hardware prototypes' },
  { action: 'GROW', modifier: 'Continuously', desc: 'Evolve with rapid technology & industrial cycles' },
  { action: 'IMPACT', modifier: 'Globally', desc: 'Tangible solutions to real-world challenges' },
];

/**
 * ProgramsPreviewSection
 * The homepage "what we teach" section. Carries the learning philosophy and the
 * programs preview; workshop/practical-exposure content lives in the Workshops
 * section so the two never repeat each other.
 */
export const ProgramsPreviewSection: React.FC = () => {
  return (
    <section
      aria-labelledby="programs-preview-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#FAFAF9] py-14 md:py-20"
    >
      <PageContainer>
        <div className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3 reveal-on-scroll">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              Programs
            </div>
            <h2
              id="programs-preview-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
            >
              Eight applied tracks, built around real work.
            </h2>
            <p className="text-base leading-relaxed text-[#5F5A50]">
              Every track is delivered as working software and hardware — versioned, demonstrated and
              reviewed, not lectured alone.
            </p>
          </div>

          <Link
            to="/programs"
            className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
          >
            <span>Browse the full catalog</span>
            <ArrowRight
              className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Restored educational philosophy statement */}
        <div className="reveal-on-scroll mb-9 rounded-xl border border-[#2F4368] bg-[#0F1930] p-6 shadow-elevated sm:p-8 md:mb-12">
          <div className="max-w-3xl space-y-3">
            <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D9A62B]">
              Educational Philosophy
            </span>
            <h3 className="font-display text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl">
              &ldquo;We don&apos;t just teach technology — we build skills, confidence, and future
              leaders.&rdquo;
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Education should not be passive memorization. We architect learning as an active,
              empowering discipline where students write code, debug hardware, and engineer functional
              systems.
            </p>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-5 border-t border-[#2F4368] pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {learningPrinciples.map((item) => (
              <li key={item.action} className="space-y-1">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-mono text-sm font-extrabold tracking-wider text-[#D9A62B]">
                    {item.action}
                  </span>
                  <span className="text-xs font-semibold text-white">{item.modifier}</span>
                </span>
                <p className="text-xs leading-relaxed text-slate-300">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <AppliedProgramsTracks showIntroHeading={false} />
      </PageContainer>
    </section>
  );
};

export default ProgramsPreviewSection;