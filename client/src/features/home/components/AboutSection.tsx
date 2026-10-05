import React from 'react';
import { Target, Compass, CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

/**
 * Restored from the original `AboutSection` — the proven 5-step applied
 * engineering methodology. It was previously removed as duplicative of the R&D
 * workflow; both are now kept because they are distinct: this is the student
 * project methodology, the R&D one is the research lifecycle.
 */
const methodologySteps = [
  {
    title: 'Problem Discovery & Industrial Requirements',
    desc: 'Formulate projects from live industry problem statements, user needs, and practical engineering constraints.',
  },
  {
    title: 'System Architecture & Schematic Design',
    desc: 'Plan hardware circuit topologies, sensor schematics, database schemas, and clean software architecture.',
  },
  {
    title: 'Iterative Implementation & Git Version Control',
    desc: 'Write production-grade code, interface microcontrollers, and commit verifiable milestones on GitHub.',
  },
  {
    title: 'Bench Testing, Telemetry & Simulation',
    desc: 'Subject prototypes to stress testing, logic analyzer validation, sensor calibration, and performance benchmarks.',
  },
  {
    title: 'Project Defense, IP Evaluation & Deployment',
    desc: 'Deliver formal technical reviews, investigate patentability, and deploy operational software and embedded hardware.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-20"
    >
      <PageContainer>
        {/* Identity + visual */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97] sm:text-xs">
              About Shank&apos;s Code Edutech
            </div>
            <h2
              id="about-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
            >
              An operating training and research company, not a course marketplace.
            </h2>
            <p className="text-base leading-relaxed text-[#5F5A50]">
              Founded in 2023 in Villupuram, Tamil Nadu, we work with engineering and polytechnic
              students, colleges and industry partners on three things: practical technical training,
              accredited internships, and applied research with real prototypes.
            </p>
            <p className="text-sm leading-relaxed text-[#5F5A50]">
              Our purpose is narrow and practical — close the distance between what a syllabus covers and
              what an engineering job actually requires, then leave students with work they can show.
            </p>
          </div>

          <div className="reveal-on-scroll stagger-1 lg:col-span-5">
            <div className="group relative overflow-hidden rounded-xl border border-[#D3DAE6] bg-white shadow-sm">
              <img
                src="/images/about-rnd-workspace.jpg"
                alt="Engineers testing an IoT sensor circuit board with an oscilloscope while reviewing live telemetry"
                width={700}
                height={450}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.01] sm:h-64 lg:h-72"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2">
          <div className="reveal-on-scroll space-y-2.5 rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Target className="h-5 w-5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
              <h3 className="font-display text-base font-bold tracking-tight text-[#1B2A4A]">
                Vision
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#5F5A50]">
              Become a recognised education and applied-research organisation that delivers sustainable
              engineering capability through technology-driven, verifiable training.
            </p>
          </div>

          <div className="reveal-on-scroll stagger-1 space-y-2.5 rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Compass className="h-5 w-5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
              <h3 className="font-display text-base font-bold tracking-tight text-[#1B2A4A]">
                Mission
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#5F5A50]">
              Run dedicated R&amp;D labs, deliver industry-oriented project learning, support student patent
              filings and publications, and build indigenous technology for real problems.
            </p>
          </div>
        </div>

        {/* Proven engineering methodology (restored) */}
        <div className="reveal-on-scroll mt-10 rounded-xl border border-[#D3DAE6] bg-[#EEF1F6] p-6 shadow-xs md:mt-14 sm:p-8">
          <div className="mb-8 max-w-2xl space-y-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97]">
              Proven Engineering Pedagogy
            </div>
            <h3 className="font-display text-xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-2xl">
              5-Step Applied Engineering Methodology
            </h3>
            <p className="text-sm leading-relaxed text-[#5F5A50]">
              Our structured educational framework turns theoretical concepts into verified practical
              mastery, so every learner builds demonstrable skills without shortcuts.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {methodologySteps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col rounded-lg border border-[#D3DAE6] bg-white p-4 shadow-xs transition-colors hover:border-[#1B2A4A]/50"
              >
                <span className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-md bg-[#1B2A4A] font-mono text-xs font-bold text-white shadow-2xs">
                  0{index + 1}
                </span>
                <h4 className="text-sm font-bold leading-snug tracking-tight text-[#1B2A4A]">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A50]">{step.desc}</p>
              </li>
            ))}
          </ol>

          <p className="mt-5 flex flex-col gap-2 rounded-lg border border-[#D3DAE6] bg-white p-4 shadow-2xs text-xs sm:flex-row sm:items-center sm:gap-3">
            <span className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
              <span className="font-bold text-[#1B2A4A]">Continuous Institutional Review:</span>
            </span>
            <span className="text-[#5F5A50]">
              Evaluated against AICTE internship criteria, code cleanliness benchmarks, and industrial
              security standards.
            </span>
          </p>
        </div>
      </PageContainer>
    </section>
  );
};

export default AboutSection;