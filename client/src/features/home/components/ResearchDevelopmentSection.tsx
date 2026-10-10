import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import RndFocusGrid from '@/features/research/components/RndFocusGrid';
import RndWorkflowPanel from '@/features/research/components/RndWorkflowPanel';
import RndLabFigure from '@/features/research/components/RndLabFigure';

/**
 * ResearchDevelopmentSection (homepage)
 * Concise homepage view of applied R&D. The four focus areas and the five-stage
 * workflow are shared with the dedicated `/rnd` page via `features/research`.
 */
export const ResearchDevelopmentSection: React.FC = () => {
  return (
    <section
      id="rd"
      aria-labelledby="rnd-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-20"
    >
      <span id="rnd" className="pointer-events-none invisible absolute top-0 block" aria-hidden="true" />
      <PageContainer>
        {/* Section header with laboratory visual */}
        <div className="mb-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 md:mb-14">
          <div className="space-y-4 reveal-on-scroll lg:col-span-7">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C6F97]">
              Applied R&amp;D Division
            </div>
            <h2
              id="rnd-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
            >
              Research that has to survive the bench.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#5F5A50]">
              Our R&amp;D division takes problems from industry and campus, builds the prototype, validates
              it on the bench, and publishes or patents what comes out of it.
            </p>
          </div>

          <RndLabFigure className="reveal-on-scroll stagger-1 lg:col-span-5" />
        </div>

        {/* Focus areas */}
        <RndFocusGrid className="mb-10 md:mb-14" />

        {/* Five-stage workflow */}
        <RndWorkflowPanel />
      </PageContainer>
    </section>
  );
};

export default ResearchDevelopmentSection;
