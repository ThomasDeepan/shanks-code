import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Cpu, Brain, Layers } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';

const CORE_DOMAINS = [
  { label: 'Full Stack & Software', Icon: Layers },
  { label: 'IoT & Embedded Systems', Icon: Cpu },
  { label: 'AI & Data Science', Icon: Brain },
];

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#FAFAF9] py-12 md:py-16 lg:py-20"
    >
      <PageContainer>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Positioning, Description & CTAs */}
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97] sm:text-xs">
              Shank&apos;s Code Edutech &bull; Practical Technical Training &bull; Applied R&amp;D
            </p>

            <h1
              id="hero-heading"
              className="font-display text-4xl font-extrabold leading-[1.07] tracking-[-0.035em] text-[#1B2A4A] sm:text-5xl lg:text-[3.4rem]"
            >
              Technical training that ends with something you built.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#5F5A50] sm:text-lg">
              Shank&apos;s Code Edutech runs practical engineering programs, AICTE-approved internships,
              hands-on college workshops and applied R&amp;D for engineering and polytechnic students.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link to="/programs" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="btn-bloom"
                  rightIcon={<ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />}
                >
                  Explore Programs
                </Button>
              </Link>
              <Link to="/workshops" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth>
                  Workshops
                </Button>
              </Link>
            </div>

            <Link
              to="/rnd"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-[#5C6F97] transition-colors hover:text-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
            >
              <span>Explore R&amp;D</span>
              <ArrowUpRight className="h-4 w-4 text-[#D9A62B]" aria-hidden="true" />
            </Link>

            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-[#2E2A24]">
              <li className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B2A4A]">
                Core Domains
              </li>
              {CORE_DOMAINS.map(({ label, Icon }) => (
                <li key={label} className="inline-flex items-center gap-1.5 font-medium">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Laboratory Photography */}
          <div className="w-full lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#D3DAE6] bg-white shadow-sm">
              <img
                src="/images/hero-applied-engineering-lab.jpg"
                alt="Mentor and students collaborating on an embedded electronics prototype at a technical laboratory bench"
                className="block aspect-[4/3] h-auto w-full object-cover"
                width={1280}
                height={960}
                loading="eager"
              />
            </div>
            <p className="mt-2.5 flex items-center gap-1.5 px-1 font-mono text-[11px] text-[#5C6F97]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9A62B]" aria-hidden="true" />
              Applied R&amp;D &bull; Hands-on prototyping &bull; Villupuram, TN
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default HeroSection;