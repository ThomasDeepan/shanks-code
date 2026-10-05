import React from 'react';
import { CheckCircle2, Quote, ShieldCheck } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

interface OutcomeItem {
  cohort: string;
  domain: string;
  project: string;
  outcome: string;
  recordId: string;
}

const verifiedOutcomes: OutcomeItem[] = [
  {
    cohort: 'AICTE Internship Batch 2024',
    domain: 'Full-Stack Software & Cloud',
    project: 'Multi-tenant institutional telemetry and evaluation portal',
    outcome:
      'Microservices, REST APIs and automated test pipelines deployed as containerised instances.',
    recordId: 'SC-VERIFY-2024-FS01',
  },
  {
    cohort: 'AICTE Internship Batch 2024',
    domain: 'Embedded Systems & Industrial IoT',
    project: 'ESP32 real-time edge sensor telemetry station',
    outcome:
      'Custom PCB design, I2C/SPI sensor interfacing and MQTT streaming to cloud dashboards.',
    recordId: 'SC-VERIFY-2024-IOT02',
  },
  {
    cohort: 'Applied R&D Apprentice 2024',
    domain: 'AI, Machine Learning & Computer Vision',
    project: 'Automated industrial defect identification pipeline',
    outcome:
      'Quantised convolutional networks running edge inference on low-power ARM hardware.',
    recordId: 'SC-VERIFY-2024-AI03',
  },
];

/**
 * AlumniOutcomesSection
 * Shows audited project outcomes. Testimonials are intentionally excluded —
 * they are published only once student consent and partner-college validation
 * are complete, so no placeholder testimonial panel is rendered.
 */
export const AlumniOutcomesSection: React.FC = () => {
  return (
    <section
      id="outcomes"
      aria-labelledby="outcomes-heading"
      className="w-full bg-[#FAFAF9] py-14 md:py-20"
    >
      <PageContainer>
        <div className="mb-9 max-w-3xl space-y-3 reveal-on-scroll md:mb-12">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
            Audited outcomes
          </div>
          <h2
            id="outcomes-heading"
            className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
          >
            Finished work, not completion badges.
          </h2>
          <p className="text-base leading-relaxed text-[#5F5A50]">
            Each program closes with a reviewed, recordable deliverable. A sample of recent cohort work:
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 reveal-on-scroll md:grid-cols-3 lg:gap-6">
          {verifiedOutcomes.map((item) => (
            <li
              key={item.recordId}
              className="hover-lift flex flex-col rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B2A4A]">
                  {item.cohort}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A67C0A]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#D9A62B]" aria-hidden="true" />
                  Audited
                </span>
              </div>

              <div className="mt-3 border-t border-[#E8E6E1] pt-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2F4368]">
                  {item.domain}
                </span>
                <h3 className="mt-1 text-[15px] font-bold leading-snug tracking-tight text-[#1B2A4A]">
                  {item.project}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5F5A50]">{item.outcome}</p>
              </div>

              <p className="mt-auto pt-4 font-mono text-[11px] text-[#5C6F97]">Record {item.recordId}</p>
            </li>
          ))}
        </ul>

        {/* Transparency standard — restored from the original section. This states
            our publication policy; it is not a placeholder for testimonials. */}
        <div className="reveal-on-scroll mt-8 rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs sm:mt-10 sm:p-7">
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-8">
              <div className="flex items-center gap-2">
                <Quote className="h-4 w-4 text-[#D9A62B]" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#A67C0A]">
                  Institutional Transparency Standard
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-[#1B2A4A] sm:text-xl">
                Alumni Testimonials &amp; Career Placement Showcase
              </h3>
              <p className="text-sm leading-relaxed text-[#5F5A50]">
                Direct student feedback, project demonstration videos, and employer placement
                endorsements are published only after formal student consent and partner college
                validation.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-lg border border-[#D9A62B]/30 bg-[#FDF3D9] p-3.5">
                <p className="flex items-center gap-2 font-mono text-xs font-bold text-[#6E4F06]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                  Verified Reviews Audit
                </p>
                <p className="mt-1 text-[11px] text-[#A67C0A]">
                  Submissions from 2023&ndash;2025 cohorts are undergoing institutional review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default AlumniOutcomesSection;