import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import WorkshopCard from './WorkshopCard';
import { useWorkshops } from '../hooks/useWorkshops';
import { workshopStats } from '../data/workshopsData';

/**
 * WorkshopsSection (homepage preview)
 * Concise homepage view of Shank's Code hands-on workshops. The complete
 * workshop information lives on `/workshops`.
 *
 * Records come from `workshopService`, the same source the Admin Dashboard
 * writes to, so an admin update is reflected here without a code change.
 */
export const WorkshopsSection: React.FC = () => {
  const { workshops, isLoading, error } = useWorkshops();

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

        {/* Loading / Error / Success states */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-xl border border-[#D3DAE6] bg-white/70"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <p className="rounded-xl border border-[#F0C9B4] bg-[#FBEAE3] p-4 text-sm text-[#B4552C]">
            {error}
          </p>
        )}

        {!isLoading && !error && workshops.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-[#D3DAE6] bg-white p-8 text-center">
            <Wrench className="h-6 w-6 text-[#5C6F97]" aria-hidden="true" />
            <p className="text-sm font-bold text-[#1B2A4A]">No workshops published yet</p>
            <p className="max-w-md text-xs leading-relaxed text-[#5F5A50]">
              Workshop sessions will appear here as soon as they are published.
            </p>
          </div>
        )}

        {!isLoading && !error && workshops.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
              {workshops.slice(0, 4).map((workshop, index) => (
                <div key={workshop.id} className={`reveal-on-scroll stagger-${(index % 4) + 1}`}>
                  <WorkshopCard workshop={workshop} />
                </div>
              ))}
            </div>

            {/* Workshop reach figures live on the Workshops page to keep the
                homepage concise and avoid repeating the same numbers twice. */}
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#5F5A50]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97]">
                Workshop reach
              </span>
              {workshopStats
                .filter((stat) => stat.value !== 'Hands-on')
                .map((stat) => (
                  <span key={stat.label} className="font-semibold text-[#1B2A4A]">
                    {stat.value} {stat.label.toLowerCase()}
                  </span>
                ))}
            </p>
          </>
        )}
      </PageContainer>
    </section>
  );
};

export default WorkshopsSection;
