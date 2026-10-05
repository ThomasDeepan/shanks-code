import React from 'react';
import { Brain, Cpu, BarChart3, ShieldCheck } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

interface RndArea {
  icon: React.ElementType;
  title: string;
  description: string;
}

const rndAreas: RndArea[] = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Predictive models, computer vision and applied deep learning for industrial use.',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems & Robotics',
    description: 'Firmware architecture, sensor telemetry, ESP32/ARM platforms and robotics.',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics & Telemetry',
    description: 'Telemetry ingestion, statistical pipelines and real-time decision dashboards.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Cloud',
    description: 'Perimeter hardening, secure authentication, containerisation and cloud resilience.',
  },
];

const workflowSteps = [
  { step: '01', title: 'Identify', detail: 'Real-world problem and scope definition.' },
  { step: '02', title: 'Research', detail: 'Literature survey and algorithmic design.' },
  { step: '03', title: 'Develop', detail: 'Circuit prototyping, firmware and software builds.' },
  { step: '04', title: 'Test', detail: 'Bench validation and performance verification.' },
  { step: '05', title: 'Deploy', detail: 'Field deployment, publication and patent filing.' },
];

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

          <div className="reveal-on-scroll stagger-1 lg:col-span-5">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-[#D3DAE6] bg-[#1B2A4A] shadow-sm">
              <img
                src="/images/rnd-prototyping-lab.jpg"
                alt="Research engineer calibrating robotics sensors on a bench with an oscilloscope and live telemetry"
                width={800}
                height={500}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <span className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-[#1B2A4A]/85 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                Applied computing &amp; robotics lab
              </span>
            </div>
          </div>
        </div>

        {/* Focus areas */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-14 lg:grid-cols-4">
          {rndAreas.map((area) => (
            <div
              key={area.title}
              className="group rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs transition-colors hover:bg-[#EEF1F6]/50"
            >
              <area.icon className="mb-3 h-5 w-5 text-[#1B2A4A]" aria-hidden="true" />
              <h3 className="text-[15px] font-bold leading-snug tracking-tight text-[#1B2A4A]">
                {area.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A50]">{area.description}</p>
            </div>
          ))}
        </div>

        {/* Five-stage workflow */}
        <div className="reveal-on-scroll overflow-hidden rounded-xl border border-[#2F4368] bg-[#1B2A4A]">
          <div className="border-b border-[#2F4368] px-5 py-5 sm:px-7 sm:py-6">
            <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              Five-stage R&amp;D workflow
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#EEF1F6]/80 sm:text-[13px]">
              A repeatable path from hypothesis to patentable, deployable work.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-px bg-[#2F4368] sm:grid-cols-2 lg:grid-cols-5">
            {workflowSteps.map((item) => (
              <li key={item.step} className="bg-[#1B2A4A] px-5 py-4 sm:px-6 sm:py-5">
                <span className="font-mono text-[11px] font-bold tracking-wider text-[#F5D98A]">
                  {item.step}
                </span>
                <h4 className="mt-1 text-sm font-bold uppercase tracking-wide text-white">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#EEF1F6]/80">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </PageContainer>
    </section>
  );
};

export default ResearchDevelopmentSection;