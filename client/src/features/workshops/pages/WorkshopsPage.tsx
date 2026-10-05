import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import WorkshopCard from '../components/WorkshopCard';
import WorkshopStatsRow from '../components/WorkshopStatsRow';
import { workshops, workshopStats, workshopAudiences } from '../data/workshopsData';

/**
 * WorkshopsPage
 * Public workshop listing at /workshops. Uses one existing, verified project
 * asset as a contextual header image; individual workshop cards remain
 * typographic because no institutional workshop photography exists yet.
 */
export const WorkshopsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAFAF9] pb-16 pt-8 sm:pt-10 md:pb-20 md:pt-12">
      <PageContainer>
        {/* Page header */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7 reveal-on-scroll">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              Workshops
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
              Hands-on Workshops
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#5F5A50] sm:text-lg">
              Practical learning, real experience, and industry exposure through technical
              workshops conducted for students and academic institutions.
            </p>

            <ul className="flex flex-wrap gap-2 pt-1" aria-label="Workshop audiences">
              {workshopAudiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-[#D3DAE6] bg-white px-3 py-1 text-xs font-medium text-[#2E2A24]"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 reveal-on-scroll stagger-1">
            <img
              src="/images/services-academic-training.jpg"
              alt="Instructor running a hands-on technical session with engineering students at a college training bench"
              width={800}
              height={450}
              loading="lazy"
              className="h-56 w-full rounded-xl border border-[#D3DAE6] object-cover shadow-sm sm:h-64 lg:h-72"
            />
          </div>
        </div>

        {/* Workshop listing */}
        <div className="mt-12 md:mt-16">
          <div className="mb-6 flex flex-col gap-1.5 border-b border-[#D3DAE6] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-xl font-bold tracking-tight text-[#1B2A4A] sm:text-2xl">
              Workshops Conducted
            </h2>
            <span className="font-mono text-xs text-[#5C6F97]">{workshops.length} documented sessions</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {workshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>

        {/* Impact band */}
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
            <a href="mailto:admin@shankscode.com?subject=Workshop%20request" className="w-full sm:w-auto">
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
  );
};

export default WorkshopsPage;