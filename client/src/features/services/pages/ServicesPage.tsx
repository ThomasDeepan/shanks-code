import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import Button from '@/components/ui/Button';
import ServiceDomainCard from '../components/ServiceDomainCard';
import FaqSection from '@/features/faq/components/FaqSection';
import { faqItems } from '@/features/faq/data/faqData';
import { serviceDomains, servicesPageCopy } from '../data/servicesData';
import { absoluteUrl, CONTACT } from '@/constants/site';

/**
 * ServicesPage — route `/services`
 *
 * The dedicated Services route. Renders the complete service records (titles,
 * descriptions, AICTE badge and capability chips) from
 * `features/services/data/servicesData`, the same source the homepage preview
 * uses.
 */

export const ServicesPage: React.FC = () => {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: servicesPageCopy.title,
        url: absoluteUrl('/services'),
        description: servicesPageCopy.intro,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: "Shank's Code services",
        itemListElement: serviceDomains.flatMap((domain) =>
          domain.items.map((item) => ({
            '@type': 'ListItem',
            position: `${domain.index}-${item.title}`,
            item: {
              '@type': 'Service',
              name: item.title,
              description: item.description,
              provider: { '@id': absoluteUrl('/#organization') },
            },
          }))
        ),
      },
    ],
    []
  );

  return (
    <>
      <Seo
        title="Services — Training, Engineering & Institutional Partnerships"
        description="Shank's Code services: practical technical training and AICTE-approved internships for engineering students, custom software and IoT engineering, and college MoUs, faculty enablement and career readiness."
        path="/services"
        jsonLd={jsonLd}
      />

      <PublicPageShell>
        <PageHeader
          eyebrow={servicesPageCopy.eyebrow}
          title={servicesPageCopy.title}
          intro={servicesPageCopy.intro}
          image={{
            src: '/images/services-tech-engineering.jpg',
            alt: 'Engineer developing a web application while testing microcontroller telemetry at a workstation',
            width: 800,
            height: 450,
          }}
          pills={[
            'Technical training',
            'AICTE internships',
            'Software development',
            'IoT & automation',
            'College MoUs',
            'Career readiness',
          ]}
          pillsLabel="Service areas"
        />
      </PublicPageShell>

      {/* Complete service records */}
      <section aria-labelledby="service-domains-heading" className="w-full bg-[#EEF1F6] py-14 md:py-20">
        <PageContainer>
          <h2
            id="service-domains-heading"
            className="sr-only"
          >
            Service domains in detail
          </h2>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
            {serviceDomains.map((domain, index) => (
              <div key={domain.index} className={`reveal-on-scroll stagger-${index + 1} flex`}>
                <ServiceDomainCard domain={domain} variant="full" className="w-full" />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Workshops hand-off */}
      <section aria-labelledby="services-workshop-heading" className="w-full bg-[#FAFAF9] py-12 md:py-16">
        <PageContainer>
          <div className="flex flex-col gap-3 rounded-xl border border-[#D9A62B]/40 bg-[#FDF3D9] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div>
              <h2
                id="services-workshop-heading"
                className="text-[15px] font-bold text-[#6E4F06]"
              >
                Need a workshop at your campus instead of a full program?
              </h2>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#6E4F06]/85">
                We run hands-on technical workshops for engineering colleges, polytechnic colleges and
                academic institutions — see the documented sessions and reach figures.
              </p>
            </div>

            <Link
              to="/workshops"
              className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 transition-colors hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
            >
              <span>See workshops</span>
              <ArrowRight
                className="h-4 w-4 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* FAQ */}
      <section aria-labelledby="services-faq-heading" className="w-full bg-[#EEF1F6] py-14 md:py-20">
        <PageContainer>
          <div id="services-faq-heading">
            <FaqSection
              items={faqItems}
              eyebrow="Services FAQ"
              title="Questions about programs, workshops and collaboration"
              description="Answers grounded in the services we actually run — no unsupported claims."
            />
          </div>
        </PageContainer>
      </section>

      {/* Contact CTA */}
      <section aria-labelledby="services-cta-heading" className="w-full bg-[#FAFAF9] pb-16 md:pb-20">
        <PageContainer>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-[#D3DAE6] bg-white p-7 text-center shadow-xs sm:p-9">
            <h2
              id="services-cta-heading"
              className="font-display text-xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-2xl"
            >
              Tell us which service fits your requirement
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#5F5A50]">
              Students, colleges and industry partners can reach the team directly — we reply with the
              right session format and next step.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={`mailto:${CONTACT.email}?subject=Service%20enquiry`} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<Mail className="h-4 w-4 text-white" aria-hidden="true" />}
                >
                  Email the team
                </Button>
              </a>
              <Link to="/rnd" className="w-full sm:w-auto">
                <Button variant="outline" size="md" fullWidth>
                  Applied R&amp;D partnerships
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
};

export default ServicesPage;
