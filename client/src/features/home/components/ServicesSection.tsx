import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cpu, GraduationCap } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { serviceDomains } from '@/features/services/data/servicesData';

/**
 * ServicesSection (homepage overview)
 *
 * A brief overview of the three practice areas: one short card each plus a
 * single "Explore More" hand-off. The complete service records — titles,
 * descriptions, AICTE badge and capability chips — remain on `/services`, which
 * renders the same `serviceDomains` data.
 */

const ICONS: React.ElementType[] = [GraduationCap, Code2, Cpu];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-16"
    >
      <PageContainer>
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3 reveal-on-scroll">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              What we do
            </div>
            <h2
              id="services-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
            >
              Three practice areas, one delivery standard.
            </h2>
          </div>

          <Link
            to="/services"
            className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
          >
            <span>Explore More</span>
            <ArrowRight
              className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceDomains.map((domain, index) => {
            const Icon = ICONS[index] ?? Code2;

            return (
              <li
                key={domain.index}
                className={`reveal-on-scroll stagger-${index + 1} hover-lift flex flex-col rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs sm:p-6`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D3DAE6] bg-[#EEF1F6]">
                  <Icon className="h-5 w-5 text-[#1B2A4A]" aria-hidden="true" />
                </span>

                <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A]">
                  {domain.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5F5A50]">
                  {domain.summary}
                </p>
              </li>
            );
          })}
        </ul>
      </PageContainer>
    </section>
  );
};

export default ServicesSection;