import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import VisionMissionGrid from '@/features/about/components/VisionMissionGrid';
import { aboutIdentity } from '@/features/about/data/aboutContent';

/**
 * AboutSection (homepage)
 * Compact homepage view of who Shank's Code is. The identity copy, vision,
 * mission and the full 5-step methodology are shared with the dedicated
 * `/about` page via `features/about`, so the two can never drift apart and
 * nothing has been removed from the site.
 */
export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-20"
    >
      <PageContainer>
        {/* Identity + visual */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97] sm:text-xs">
              {aboutIdentity.eyebrow}
            </div>
            <h2
              id="about-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
            >
              {aboutIdentity.headline}
            </h2>
            {aboutIdentity.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-[#5F5A50]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="reveal-on-scroll stagger-1 lg:col-span-5">
            <div className="group relative overflow-hidden rounded-xl border border-[#D3DAE6] bg-white shadow-sm">
              <img
                src={aboutIdentity.image.src}
                alt={aboutIdentity.image.alt}
                width={aboutIdentity.image.width}
                height={aboutIdentity.image.height}
                loading="lazy"
                decoding="async"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.01] sm:h-64 lg:h-72"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <VisionMissionGrid className="mt-10 md:mt-12" />
      </PageContainer>
    </section>
  );
};

export default AboutSection;
