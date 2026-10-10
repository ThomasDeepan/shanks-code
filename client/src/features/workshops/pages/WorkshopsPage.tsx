import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, CalendarDays } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';
import WorkshopCard from '../components/WorkshopCard';
import WorkshopStatsRow from '../components/WorkshopStatsRow';
import { useWorkshops } from '../hooks/useWorkshops';
import { workshopStats, workshopAudiences } from '../data/workshopsData';
import { absoluteUrl, CONTACT } from '@/constants/site';

/**
 * WorkshopsPage — route `/workshops`
 *
 * The complete workshop information: all four documented sessions (UCEV
 * Villupuram, polytechnic students Vellore, MAM Engineering College, Saveetha
 * Engineering College), the reference statistics and the campus workshop request
 * path. Records are read through `workshopService`, which the Admin Dashboard
 * also writes to.
 */

export const WorkshopsPage: React.FC = () => {
  const { workshops, isLoading, error, reload } = useWorkshops();

  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Technical workshops',
        url: absoluteUrl('/workshops'),
        description:
          'Hands-on technical workshops conducted by Shank’s Code for engineering colleges, polytechnic colleges and academic institutions.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Workshops conducted',
        itemListElement: workshops.map((workshop, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Event',
            name: workshop.title,
            description: workshop.summary,
            location: { '@type': 'Place', name: workshop.location },
            organizer: { '@type': 'Organization', name: "Shank's Code Edutech" },
          },
        })),
      },
    ],
    [workshops]
  );

  return (
    <>
      <Seo
        title="Technical Workshops for Engineering & Polytechnic Colleges"
        description="Shank's Code conducts hands-on technical workshops for engineering colleges, polytechnic colleges and academic institutions — 1000+ students trained across 25+ workshops with 10+ colleges collaborated."
        path="/workshops"
        jsonLd={jsonLd}
      />

      <div className="w-full bg-[#FAFAF9] pb-16 pt-8 sm:pt-10 md:pb-20 md:pt-12">
        <PageContainer>
          <PageHeader
            eyebrow="Workshops"
            title="Hands-on Workshops"
            intro="Practical learning, real experience, and industry exposure through technical workshops conducted for students and academic institutions."
            image={{
              src: '/images/services-academic-training.jpg',
              alt: 'Instructor running a hands-on technical session with engineering students at a college training bench',
              width: 800,
              height: 450,
            }}
            pills={workshopAudiences}
            pillsLabel="Workshop audiences"
          />

          {/* Workshop listing */}
          <div className="mt-12 md:mt-16">
            <div className="mb-6 flex flex-col gap-1.5 border-b border-[#D3DAE6] pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#1B2A4A] sm:text-2xl">
                Workshops Conducted
              </h2>
              <span className="font-mono text-xs text-[#5C6F97]">
                {isLoading ? 'Loading sessions…' : `${workshops.length} documented sessions`}
              </span>
            </div>

            {isLoading && (
              <LoadingState message="Loading workshop sessions..." minHeight="min-h-[220px]" />
            )}

            {!isLoading && error && (
              <ErrorState
                title="Failed to Load Workshops"
                message={error}
                onRetry={reload}
                className="my-6"
              />
            )}

            {!isLoading && !error && workshops.length === 0 && (
              <EmptyState
                icon={CalendarDays}
                title="No workshops published yet"
                description="Workshop sessions will be listed here once published. Get in touch to request a session at your campus."
              />
            )}

            {!isLoading && !error && workshops.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {workshops.map((workshop) => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>
            )}
          </div>

          {/* Impact band — the reference workshop statistics */}
          <div className="mt-10 md:mt-14">
            <WorkshopStatsRow stats={workshopStats} />
          </div>

          {/* Request a workshop */}
          <div className="mt-10 grid grid-cols-1 items-center gap-6 rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-xs sm:p-8 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#1B2A4A] sm:text-2xl">
                Run a workshop at your campus
              </h2>
              <p className="text-sm leading-relaxed text-[#5F5A50]">
                We design session formats for engineering colleges, polytechnic colleges and academic
                institutions around the technical domain your students need.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
              <a
                href={`mailto:${CONTACT.email}?subject=Workshop%20request`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<Mail className="h-4 w-4 text-white" aria-hidden="true" />}
                >
                  Request a Workshop
                </Button>
              </a>
              <Link to="/programs" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  View Programs
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default WorkshopsPage;
