import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import CapabilityGraph from './CapabilityGraph';

/**
 * CapabilityMapSection
 *
 * Hosts the animated capability graph (four engineering domains around the
 * applied core). It was previously a standalone homepage section; it now lives
 * on the `/about` page as part of the organisation description, so the graph
 * is preserved without adding another block to the homepage.
 */
export const CapabilityMapSection: React.FC = () => {
  return (
    <section
      id="domains"
      aria-labelledby="capability-map-heading"
      className="w-full bg-[#EEF1F6] py-14 md:py-20"
    >
      <PageContainer>
        <div className="mb-9 max-w-3xl space-y-3 reveal-on-scroll md:mb-12">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
            Capability Map
          </div>
          <h2
            id="capability-map-heading"
            className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
          >
            Four engineering domains, one applied core.
          </h2>
          <p className="text-base leading-relaxed text-[#5F5A50]">
            Every program, workshop and research engagement is built on one of these four capability
            domains. Select a domain to see what it covers.
          </p>
        </div>

        <CapabilityGraph />
      </PageContainer>
    </section>
  );
};

export default CapabilityMapSection;