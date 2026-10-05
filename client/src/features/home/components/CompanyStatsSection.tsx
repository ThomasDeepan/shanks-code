import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { impactMetrics } from '../data/impactMetrics';

/**
 * CompanyStatsSection
 * Compact, card-free credibility band placed directly below the hero.
 * This is the only place on the homepage that presents these metrics —
 * workshop figures are owned by the Workshops section.
 */
export const CompanyStatsSection: React.FC = () => {
  return (
    <section
      aria-label="Company impact metrics"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-9 md:py-12"
    >
      <PageContainer>
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#D3DAE6]">
          {impactMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`reveal-on-scroll stagger-${index + 1} flex flex-col justify-center gap-1 ${
                index === 0 ? 'lg:pr-8' : index === 3 ? 'lg:pl-8' : 'lg:px-8'
              } ${index % 2 === 1 ? 'pl-6' : ''}`}
            >
              <span className="font-display text-3xl font-extrabold leading-none tracking-tight text-[#1B2A4A] sm:text-4xl">
                {metric.animated ? (
                  <AnimatedCounter
                    target={metric.target}
                    suffix={metric.suffix}
                    duration={1100 + index * 80}
                    className="font-display text-[#1B2A4A]"
                  />
                ) : (
                  `${metric.target}${metric.suffix}`
                )}
              </span>
              <h3 className="text-sm font-bold leading-snug tracking-tight text-[#1B2A4A] sm:text-[15px]">
                {metric.label}
              </h3>
              <p className="max-w-[220px] text-xs leading-relaxed text-[#5F5A50]">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default CompanyStatsSection;