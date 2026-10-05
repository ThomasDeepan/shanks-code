import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TechDomainGraph from './TechDomainGraph';

/**
 * TechDomainsSection
 * Hosts the restored animated capability graph. Placed after the workshops
 * section so the visitor sees: what we teach (programs) -> practical exposure
 * (workshops) -> the capability domains both feed into.
 */
export const TechDomainsSection: React.FC = () => {
  return (
    <section
      id="domains"
      aria-labelledby="domains-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#FAFAF9] py-14 md:py-20"
    >
      <PageContainer>
        <div className="mb-9 max-w-3xl space-y-3 reveal-on-scroll md:mb-12">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
            Capability Map
          </div>
          <h2
            id="domains-heading"
            className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
          >
            Four engineering domains, one applied core.
          </h2>
          <p className="text-base leading-relaxed text-[#5F5A50]">
            Every program, workshop and research engagement is built on one of these four capability
            domains. Explore what each one covers.
          </p>
        </div>

        <TechDomainGraph />
      </PageContainer>
    </section>
  );
};

export default TechDomainsSection;