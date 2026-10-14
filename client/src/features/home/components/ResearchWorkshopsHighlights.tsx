import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Wrench } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { rndAreas } from '@/features/research/data/researchData';
import { useWorkshops } from '@/features/workshops/hooks/useWorkshops';

/**
 * ResearchWorkshopsHighlights
 *
 * A single compact section that answers two questions at once: what the R&D
 * division works on, and what happens on campus. Each half is a short summary
 * plus an "Explore More" hand-off.
 *
 * Relocated from the former homepage R&D section (focus grid, lab figure and
 * five-stage workflow) and Workshops preview (four full workshop cards and the
 * reach strip). Those full views remain on `/rnd` and `/workshops`.
 */
export const ResearchWorkshopsHighlights: React.FC = () => {
  const { workshops, isLoading, error } = useWorkshops();
  const nextWorkshops = workshops.slice(0, 2);

  return (
    <section
      id="rd"
      aria-labelledby="rd-workshops-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-16"
    >
      <PageContainer>
        <div className="mb-8 max-w-2xl space-y-3 reveal-on-scroll md:mb-10">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
            Applied R&amp;D &amp; Workshops
          </div>
          <h2
            id="rd-workshops-heading"
            className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
          >
            Research on the bench, workshops on campus.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Applied R&D summary */}
          <article className="reveal-on-scroll stagger-1 flex flex-col rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D3DAE6] bg-[#EEF1F6]">
              <FlaskConical className="h-5 w-5 text-[#D9A62B]" aria-hidden="true" />
            </span>

            <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A]">
              Applied R&amp;D Division
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#5F5A50]">
              Problems taken from industry and campus, prototyped, bench-validated, then published or
              patented.
            </p>

            <ul className="mt-4 mb-5 flex flex-wrap gap-2">
              {rndAreas.map((area) => (
                <li
                  key={area.title}
                  className="rounded-md border border-[#D3DAE6] bg-[#EEF1F6] px-2.5 py-1 text-[11px] font-semibold text-[#1B2A4A]"
                >
                  {area.title}
                </li>
              ))}
            </ul>

            <Link
              to="/rnd"
              className="group mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
            >
              <span>Explore More</span>
              <ArrowRight
                className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </article>

          {/* Workshops summary */}
          <article className="reveal-on-scroll stagger-2 flex flex-col rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D3DAE6] bg-[#EEF1F6]">
              <Wrench className="h-5 w-5 text-[#1B2A4A]" aria-hidden="true" />
            </span>

            <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A]">
              Campus Workshops
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#5F5A50]">
              Hands-on technical sessions for engineering colleges, polytechnic colleges and academic
              institutions.
            </p>

            <div className="mt-4 mb-5 flex-1">
              {isLoading && (
                <div
                  role="status"
                  aria-live="polite"
                  className="h-[68px] animate-pulse rounded-lg border border-[#D3DAE6] bg-[#EEF1F6]"
                />
              )}

              {!isLoading && error && (
                <p className="rounded-lg border border-[#F0C9B4] bg-[#FBEAE3] p-3 text-xs text-[#B4552C]">
                  {error}
                </p>
              )}

              {!isLoading && !error && nextWorkshops.length === 0 && (
                <p className="rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] p-3 text-xs text-[#5F5A50]">
                  Workshop sessions will appear here as soon as they are published.
                </p>
              )}

              {!isLoading && !error && nextWorkshops.length > 0 && (
                <ul className="space-y-2">
                  {nextWorkshops.map((workshop) => (
                    <li
                      key={workshop.id}
                      className="rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 py-2"
                    >
                      <span className="block text-[13px] font-bold leading-snug text-[#1B2A4A]">
                        {workshop.title}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] text-[#5C6F97]">
                        {workshop.institution} &bull; {workshop.location}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              to="/workshops"
              className="group mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
            >
              <span>Explore More</span>
              <ArrowRight
                className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </article>
        </div>
      </PageContainer>
    </section>
  );
};

export default ResearchWorkshopsHighlights;