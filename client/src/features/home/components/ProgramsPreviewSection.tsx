import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import {
  softwareDomains,
  hardwareAiDomains,
} from '@/features/programs/components/AppliedProgramsTracks';

/**
 * ProgramsPreviewSection
 *
 * Selected program highlights only: three cards, one short description each.
 * The complete eight-track catalog and the educational philosophy statement
 * live on `/programs`, which renders the same `AppliedProgramsTracks` data.
 */

/** Two from the software group and one from the hardware/AI group. */
const HIGHLIGHTS = [softwareDomains[0], softwareDomains[1], hardwareAiDomains[0]];

export const ProgramsPreviewSection: React.FC = () => {
  return (
    <section
      aria-labelledby="programs-preview-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#FAFAF9] py-14 md:py-16"
    >
      <PageContainer>
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3 reveal-on-scroll">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              Programs
            </div>
            <h2
              id="programs-preview-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
            >
              Eight applied tracks, built around real work.
            </h2>
          </div>

          <Link
            to="/programs"
            className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
          >
            <span>Explore More</span>
            <ArrowRight
              className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((program, index) => (
            <li
              key={program.title}
              className={`reveal-on-scroll stagger-${index + 1} hover-lift flex flex-col rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs sm:p-6`}
            >
              <span className="inline-flex w-fit rounded-md border border-[#D9A62B]/40 bg-[#FDF3D9] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#6E4F06]">
                {program.tag}
              </span>

              <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A]">
                {program.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#5F5A50]">
                {program.description}
              </p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
};

export default ProgramsPreviewSection;