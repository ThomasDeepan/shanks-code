import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import Button from '@/components/ui/Button';
import VisionMissionGrid from '../components/VisionMissionGrid';
import MethodologySection from '../components/MethodologySection';
import RecognitionSection from '../components/RecognitionSection';
import CoreCommitmentSection from '../components/CoreCommitmentSection';
import CapabilityMapSection from '../components/CapabilityMapSection';
import FaqSection from '@/features/faq/components/FaqSection';
import { faqItems } from '@/features/faq/data/faqData';
import { aboutIdentity, aboutPageCopy } from '../data/aboutContent';
import { absoluteUrl, CONTACT } from '@/constants/site';

/**
 * AboutPage — route `/about`
 *
 * The dedicated About route. All copy is sourced from `features/about/data`
 * and the shared components, so this page and the homepage About section can
 * never disagree. Nothing was removed from the site to create it.
 */

export const AboutPage: React.FC = () => {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': absoluteUrl('/#organization'),
        name: "Shank's Code Edutech",
        url: absoluteUrl('/'),
        logo: absoluteUrl('/favicon.svg'),
        foundingDate: String(CONTACT.founded),
        description: aboutPageCopy.intro,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Villupuram',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        areaServed: 'IN',
        knowsAbout: [
          'Technical training',
          'Engineering student training',
          'AI and Data Science',
          'Full Stack Development',
          'IoT and Embedded Systems',
          'Applied R&D',
          'Internships',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: aboutPageCopy.title,
        url: absoluteUrl('/about'),
        description: aboutPageCopy.intro,
        about: { '@id': absoluteUrl('/#organization') },
      },
    ],
    []
  );

  return (
    <>
      <Seo
        title="About Shank's Code Edutech — Training & Applied R&D Company"
        description="Learn who Shank's Code Edutech is: a technical training and applied R&D company in Villupuram, Tamil Nadu, working with engineering students, colleges and industry partners."
        path="/about"
        jsonLd={jsonLd}
      />

      <PublicPageShell>
        <PageHeader
          eyebrow={aboutPageCopy.eyebrow}
          title={aboutPageCopy.title}
          intro={aboutPageCopy.intro}
          image={aboutPageCopy.image}
          pills={[
            'Engineering students',
            'Polytechnic students',
            'Colleges & institutions',
            'Industry partners',
            'Applied R&D',
          ]}
          pillsLabel="Who we work with"
        />
      </PublicPageShell>

      {/* Vision & Mission */}
      <section aria-labelledby="vision-mission-heading" className="w-full bg-[#EEF1F6] py-14 md:py-20">
        <PageContainer>
          <div className="mb-8 max-w-3xl space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              Vision &amp; Mission
            </div>
            <h2
              id="vision-mission-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
            >
              {aboutIdentity.headline}
            </h2>
            <div className="space-y-3">
              {aboutIdentity.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-[#5F5A50]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <VisionMissionGrid />
        </PageContainer>
      </section>

      {/* Core commitment + delivery pillars — relocated here from the homepage.
          This replaces the previous four-card "How we work" grid, whose content is
          fully covered by the primary pillar and supporting pillars below. */}
      <div className="w-full bg-[#FAFAF9]">
        <CoreCommitmentSection />
      </div>

      {/* Proven engineering methodology (shared component, full width) */}
      <MethodologySection />

      {/* Animated capability map — relocated here from the homepage */}
      <CapabilityMapSection />

      {/* Recognition / credentials (shared with homepage) */}
      <div className="w-full bg-[#FAFAF9]">
        <RecognitionSection />
      </div>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="w-full bg-[#EEF1F6] py-14 md:py-20">
        <PageContainer>
          <div id="faq-heading">
            <FaqSection
              items={faqItems}
              description="Straight answers about what Shank's Code is, what we teach, how workshops run and how the Student Portal works."
            />
          </div>
        </PageContainer>
      </section>

      {/* CTA */}
      <section aria-labelledby="about-cta-heading" className="w-full bg-[#FAFAF9] pb-16 md:pb-20">
        <PageContainer>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-[#D3DAE6] bg-white p-7 text-center shadow-xs sm:p-9">
            <h2
              id="about-cta-heading"
              className="font-display text-xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-2xl"
            >
              Ready to see the programs these commitments produce?
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/programs" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  rightIcon={<ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />}
                >
                  Explore programs
                </Button>
              </Link>
              <Link to="/workshops" className="w-full sm:w-auto">
                <Button variant="outline" size="md" fullWidth>
                  College workshops
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
};

export default AboutPage;
