import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import WorkshopCard from './WorkshopCard';
import { workshops } from '../data/workshopsData';

/**
 * WorkshopsSection
 * Concise homepage preview of Shank's Code hands-on workshops. Placed directly
 * after the programs preview so visitors understand the practical exposure
 * offering early on the page.
 */
export const WorkshopsSection: React.FC = () => {
  return (
    <section
      aria-labelledby="workshops-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-20"
    >
      <PageContainer>
        {/* Section header with route-level CTA */}
        <div className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3 reveal-on-scroll">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              Workshops
            </div>
            <h2
              id="workshops-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
            >
              Hands-on Workshops
            </h2>
            <p className="text-base leading-relaxed text-[#5F5A50]">
              Practical learning, real experience, and industry exposure through technical workshops
              conducted for students and academic institutions.
            </p>
          </div>

          <Link
            to="/workshops"
            className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
          >
            <span>All workshops</span>
            <ArrowRight
              className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Workshop grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {workshops.map((workshop, index) => (
            <div key={workshop.id} className={`reveal-on-scroll stagger-${(index % 4) + 1}`}>
              <WorkshopCard workshop={workshop} />
            </div>
          ))}
        </div>

        {/* Impact figures live on the Workshops page to keep the homepage concise
            and to avoid repeating the same numbers in two sections. */}
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#5F5A50]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97]">
            Workshop reach
          </span>
          <span className="font-semibold text-[#1B2A4A]">1000+ students trained</span>
          <span className="font-semibold text-[#1B2A4A]">25+ workshops conducted</span>
          <span className="font-semibold text-[#1B2A4A]">10+ colleges collaborated</span>
        </p>
      </PageContainer>
    </section>
  );
};

export default WorkshopsSection;