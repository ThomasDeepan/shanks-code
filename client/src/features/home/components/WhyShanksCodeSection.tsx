import React from 'react';
import {
  Wrench,
  GraduationCap,
  Lightbulb,
  Building2,
  Award,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

interface Pillar {
  title: string;
  desc: string;
  Icon: React.ElementType;
  badge?: string;
}

/**
 * Restored from the original `WhyChooseUsSection` — the primary educational
 * pillar, its proof points, and the five supporting capabilities. Content is
 * preserved; presentation uses the current refined card and spacing language.
 */
const supportingPillars: Pillar[] = [
  {
    title: 'Expert Faculty & Mentors',
    desc: 'Learn directly from experienced practitioners, research engineers, and active industry architects with hands-on systems expertise.',
    Icon: GraduationCap,
  },
  {
    title: 'Innovation & R&D Driven',
    desc: 'We promote applied research, patent ideation, and technical invention to solve measurable regional and industrial challenges.',
    Icon: Lightbulb,
  },
  {
    title: 'Industry Collaborations',
    desc: 'Active institutional engagements with engineering institutions, industry hubs, and technology incubator ecosystems.',
    Icon: Building2,
  },
  {
    title: 'Recognized Credentials',
    desc: 'Earn verified completion certificates backed by AICTE-approved internship workflows and industry project defense.',
    Icon: Award,
    badge: 'AICTE Aligned',
  },
  {
    title: 'Career Support & Placement Readiness',
    desc: 'Rigorous technical interview prep, Git portfolio curation, and direct placement assistance for engineering careers.',
    Icon: Briefcase,
    badge: 'Industry Integrated',
  },
];

const proofPoints = [
  'Real-world engineering problem statements and live industry use cases.',
  'Interactive coding environments, hardware sensor kits, and functional prototypes.',
  'Continuous project evaluations with tangible Git repository commits.',
];

const commitmentTags = ['Verifiable Standards', 'Applied R&D Focus', 'Defensible Prototypes'];

export const WhyShanksCodeSection: React.FC = () => {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#FAFAF9] py-14 md:py-20"
    >
      <PageContainer>
        {/* Mission statement */}
        <div className="mb-10 max-w-3xl space-y-4 md:mb-14 reveal-on-scroll">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
            Our Core Commitment
          </div>
          <h2
            id="why-choose-heading"
            className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
          >
            Verifiable education, applied research, measurable impact.
          </h2>
          <div className="rounded-r-lg border-l-2 border-[#D9A62B] bg-[#EEF1F6]/60 py-2.5 pl-4">
            <p className="text-sm font-semibold italic leading-relaxed text-[#1B2A4A] sm:text-base">
              &ldquo;Empowering learners. Building innovators. Creating a smarter tomorrow.&rdquo;
            </p>
            <span className="mt-1 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#5C6F97]">
              Institutional Mission &bull; Shank&apos;s Code Edutech
            </span>
          </div>
          <ul className="flex flex-wrap gap-2 pt-1">
            {commitmentTags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-[#D3DAE6] bg-[#EEF1F6] px-3 py-1 font-mono text-xs font-medium text-[#1B2A4A]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Primary pillar + supporting capabilities */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="reveal-on-scroll relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#D3DAE6] bg-[#EEF1F6] p-6 shadow-xs lg:col-span-5">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-[#1B2A4A]" aria-hidden="true" />

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md border border-[#D9A62B]/50 bg-[#FDF3D9] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#6E4F06]">
                  Primary Pillar
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D3DAE6] bg-white shadow-2xs">
                  <Wrench className="h-5 w-5 text-[#D9A62B]" aria-hidden="true" />
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-2xl">
                  Practical &amp; Hands-On
                </h3>
                <p className="text-sm leading-relaxed text-[#5F5A50]">
                  Industry-relevant curriculum centered on real-world projects, live simulations, and
                  intensive hardware-software labs. We prioritize functional execution over passive
                  lectures.
                </p>
              </div>

              <ul className="space-y-2.5">
                {proofPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 rounded-lg border border-[#D3DAE6] bg-white p-3.5 shadow-2xs"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A62B]"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] leading-snug text-[#2E2A24]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 border-t border-[#D3DAE6] pt-5 text-xs font-semibold text-[#5F5A50]">
              Core Engineering Methodology
            </p>
          </div>

          <ul className="reveal-on-scroll stagger-1 flex flex-col overflow-hidden rounded-xl border border-[#D3DAE6] bg-white shadow-xs lg:col-span-7">
            {supportingPillars.map((pillar, index) => (
              <li
                key={pillar.title}
                className={`flex items-start gap-4 p-5 transition-colors hover:bg-[#EEF1F6]/50 sm:p-6 ${
                  index > 0 ? 'border-t border-[#E8E6E1]' : ''
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] text-[#1B2A4A] transition-colors">
                  <pillar.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold tracking-tight text-[#1B2A4A]">
                      {pillar.title}
                    </span>
                    {pillar.badge && (
                      <span className="shrink-0 rounded border border-[#D9A62B]/30 bg-[#FDF3D9] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#A67C0A]">
                        {pillar.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-[#5F5A50]">
                    {pillar.desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  );
};

export default WhyShanksCodeSection;