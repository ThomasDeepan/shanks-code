import React from 'react';
import HeroSection from '../components/HeroSection';
import CompanyStatsSection from '../components/CompanyStatsSection';
import ProgramsPreviewSection from '../components/ProgramsPreviewSection';
import WorkshopsSection from '@/features/workshops/components/WorkshopsSection';
import TechDomainsSection from '../components/TechDomainsSection';
import ServicesSection from '../components/ServicesSection';
import ResearchDevelopmentSection from '../components/ResearchDevelopmentSection';
import WhyShanksCodeSection from '../components/WhyShanksCodeSection';
import AboutSection from '../components/AboutSection';
import RecognitionSection from '../components/RecognitionSection';
import AlumniOutcomesSection from '../components/AlumniOutcomesSection';
import ContactCTASection from '../components/ContactCTASection';

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
 */
export const HomePage: React.FC = () => {
  return (
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
  );
};

export default HomePage;