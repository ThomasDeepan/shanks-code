import React, { useMemo } from 'react';
import Seo from '@/components/common/Seo';
import HeroSection from '../components/HeroSection';
import CompanyStatsSection from '../components/CompanyStatsSection';
import ProgramsPreviewSection from '../components/ProgramsPreviewSection';
import WorkshopsSection from '@/features/workshops/components/WorkshopsSection';
import TechDomainsSection from '../components/TechDomainsSection';
import ServicesSection from '../components/ServicesSection';
import ResearchDevelopmentSection from '../components/ResearchDevelopmentSection';
import WhyShanksCodeSection from '../components/WhyShanksCodeSection';
import AboutSection from '../components/AboutSection';
import RecognitionSection from '@/features/about/components/RecognitionSection';
import AlumniOutcomesSection from '../components/AlumniOutcomesSection';
import ContactCTASection from '../components/ContactCTASection';
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/constants/site';

/**
 * Homepage order — each section owns one question, and no two sections repeat
 * the same information:
 *   1. Hero        — what is Shank's Code?
 *   2. Impact      — how much work has been done?          (only stats band)
 *   3. Programs    — what do you teach? + learning philosophy
 *   4. Workshops   — what practical exposure happens on campus?
 *   5. Capability  — which engineering domains?            (animated graph)
 *   6. Services    — who do you work with and how?
 *   7. R&D         — what research do you do?
 *   8. Why Us      — what makes the delivery different?
 *   9. About       — who are you, vision, methodology?
 *  10. Recognition — what credentials back you?
 *  11. Outcomes    — what do students actually finish?
 *  12. CTA        — how do we start?
 *
 * Each section shows a preview; the complete content lives on its own route
 * (/about, /services, /rnd, /programs, /workshops) and is shared through the
 * feature folders rather than duplicated.
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
        <ProgramsPreviewSection />
        <WorkshopsSection />
        <TechDomainsSection />
        <ServicesSection />
        <ResearchDevelopmentSection />
        <WhyShanksCodeSection />
        <AboutSection />
        <RecognitionSection />
        <AlumniOutcomesSection />
        <ContactCTASection />
      </div>
    </>
  );
};

export default HomePage;