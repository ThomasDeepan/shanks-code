import React, { useMemo } from 'react';
import Seo from '@/components/common/Seo';
import HeroSection from '../components/HeroSection';
import CompanyStatsSection from '../components/CompanyStatsSection';
import ServicesSection from '../components/ServicesSection';
import ProgramsPreviewSection from '../components/ProgramsPreviewSection';
import ResearchWorkshopsHighlights from '../components/ResearchWorkshopsHighlights';
import ContactCTASection from '../components/ContactCTASection';
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/constants/site';

/**
 * Homepage — deliberately short.
 *
 * Six sections only, each answering one question:
 *   1. Hero      — what is Shank's Code?
 *   2. Stats     — how much work has been done?
 *   3. Services  — who do we work with and how?
 *   4. Programs  — what do you teach? (selected highlights)
 *   5. R&D + Workshops — what happens on the bench and on campus?
 *   6. CTA      — how do we start?
 *
 * Everything else that used to live here was moved, not deleted:
 *   - the About identity, vision/mission, recognition, the core-commitment
 *     pillars and the animated capability graph  -> `/about`
 *   - full service records                       -> `/services`
 *   - the R&D focus grid, lab figure and the five-stage workflow -> `/rnd`
 *   - the educational philosophy, the complete eight-track catalog and the
 *     audited cohort outcomes                   -> `/programs`
 *   - the documented workshop sessions and reach figures -> `/workshops`
 */
export const HomePage: React.FC = () => {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'EducationalOrganization',
          '@id': absoluteUrl('/#organization'),
          name: SITE_NAME,
          url: absoluteUrl('/'),
          description: SITE_DESCRIPTION,
          logo: absoluteUrl('/favicon.svg'),
          foundingDate: '2023',
        },
        {
          '@type': 'WebSite',
          '@id': absoluteUrl('/#website'),
          url: absoluteUrl('/'),
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          publisher: { '@id': absoluteUrl('/#organization') },
        },
      ],
    }),
    []
  );

  return (
    <>
      <Seo
        title="Shank's Code Edutech — Practical Technical Training & Applied R&D"
        description="Shank's Code Edutech runs practical engineering programs, AICTE-approved internships, hands-on college workshops and applied R&D for engineering and polytechnic students."
        path="/"
        jsonLd={jsonLd}
      />

      <div className="flex w-full flex-col">
        <HeroSection />
        <CompanyStatsSection />
        <ServicesSection />
        <ProgramsPreviewSection />
        <ResearchWorkshopsHighlights />
        <ContactCTASection />
      </div>
    </>
  );
};

export default HomePage;