import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import ServiceDomainCard from '@/features/services/components/ServiceDomainCard';
import { serviceDomains } from '@/features/services/data/servicesData';

/**
 * ServicesSection (homepage preview)
 * Concise homepage view of the three service practice areas. The complete
 * service descriptions live on `/services`; this section shows the domain
 * titles, summaries, every service title, badge and capability chip.
 *
 * Content is unchanged from the previous inline version — only relocated into
 * `features/services` so the page and the homepage cannot drift apart.
 */
export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-20"
    >
      <PageContainer>
        <div className="mb-9 max-w-3xl space-y-3 reveal-on-scroll md:mb-12">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
            Services
          </div>
          <h2
            id="services-heading"
            className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
          >
            What we do for students, colleges and industry
          </h2>
          <p className="text-base leading-relaxed text-[#5F5A50]">
            Three practice areas, one delivery standard: work that runs and can be evaluated.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {serviceDomains.map((domain, index) => (
            <div key={domain.index} className={`reveal-on-scroll stagger-${index + 1} flex`}>
              <ServiceDomainCard domain={domain} variant="summary" className="w-full" />
            </div>
          ))}
        </div>

        {/* Full services page + workshops cross-links */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[#D9A62B]/40 bg-[#FDF3D9] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
            <div>
              <h3 className="text-[15px] font-bold text-[#6E4F06]">
                Looking for a workshop at your campus?
              </h3>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#6E4F06]/85">
                We run hands-on technical workshops for engineering colleges, polytechnic colleges and
                academic institutions.
              </p>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to="/services"
              className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
            >
              <span>All services</span>
              <ArrowRight
                className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/workshops"
              className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
            >
              <span>See workshops</span>
              <ArrowRight
                className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default ServicesSection;
