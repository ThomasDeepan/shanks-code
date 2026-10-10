import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { methodologySteps, methodologyCopy } from '../data/aboutContent';

/**
 * MethodologySection
 * The proven 5-step applied engineering methodology, shared by the homepage
 * About section and the `/about` page. Full-width background with a centred
 * content column.
 */
export const MethodologySection: React.FC = () => {
  return (
    <section
      aria-labelledby="methodology-heading"
      className="w-full bg-[#EEF1F6] py-12 md:py-16"
    >
      <PageContainer>
        <div className="reveal-on-scroll rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-xs sm:p-8">
          <div className="mb-8 max-w-2xl space-y-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97]">
              {methodologyCopy.eyebrow}
            </div>
            <h2
              id="methodology-heading"
              className="font-display text-xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-2xl"
            >
              {methodologyCopy.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#5F5A50]">
              {methodologyCopy.description}
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {methodologySteps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col rounded-lg border border-[#D3DAE6] bg-[#FAFAF9] p-4 shadow-xs transition-colors hover:border-[#1B2A4A]/50"
              >
                <span className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-md bg-[#1B2A4A] font-mono text-xs font-bold text-white shadow-2xs">
                  0{index + 1}
                </span>
                <h3 className="text-sm font-bold leading-snug tracking-tight text-[#1B2A4A]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A50]">{step.desc}</p>
              </li>
            ))}
          </ol>

          <p className="mt-5 flex flex-col gap-2 rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] p-4 shadow-2xs text-xs sm:flex-row sm:items-center sm:gap-3">
            <span className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
              <span className="font-bold text-[#1B2A4A]">{methodologyCopy.reviewLabel}</span>
            </span>
            <span className="text-[#5F5A50]">{methodologyCopy.reviewBody}</span>
          </p>
        </div>
      </PageContainer>
    </section>
  );
};

export default MethodologySection;
