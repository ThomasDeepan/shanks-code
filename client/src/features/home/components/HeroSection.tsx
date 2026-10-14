import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';

/**
 * HeroSection
 * Single, strong introduction: what Shank's Code Edutech does, in one sentence,
 * with two clear next steps. Everything that used to sit below the CTAs (the
 * separate R&D text link and the core-domain chip list) duplicated the services,
 * R&D and capability sections further down the page and has been removed.
 */
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
              Practical engineering programs, AICTE-approved internships, hands-on college workshops
              and applied R&amp;D &mdash; for engineering and polytechnic students.
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
                  Request a Workshop
                </Button>
              </Link>
            </div>
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