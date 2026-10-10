import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import Button from '@/components/ui/Button';
import RndFocusGrid from '../components/RndFocusGrid';
import RndWorkflowPanel from '../components/RndWorkflowPanel';
import RndLabFigure from '../components/RndLabFigure';
import { rndAreas, rndPageCopy, workflowSteps } from '../data/researchData';
import { absoluteUrl } from '@/constants/site';

/**
 * RnDPage — route `/rnd` (canonical; `/research` redirects here)
 *
 * The dedicated Applied R&D route. Focus areas, the five-stage workflow and the
 * lab visual are shared with the homepage R&D section through
 * `features/research`, so no research content is duplicated or re-worded.
 */

/** Outcomes the lab actually targets. Stated as intent, not as claims. */
const LAB_OUTCOMES = [
  'Bench-validated prototypes with documented test results.',
  'Patentable invention filings where novelty review supports it.',
  'Publications and technical papers from completed research tracks.',
  'Indigenous technology solutions for real regional and industrial problems.',
  'Reusable components that feed directly into student programs.',
];

export const RnDPage: React.FC = () => {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: rndPageCopy.title,
        url: absoluteUrl('/rnd'),
        description: rndPageCopy.intro,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Applied R&D focus areas',
        itemListElement: rndAreas.map((area, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: area.title,
          description: area.description,
        })),
      },
    ],
    []
  );

  return (
    <>
      <Seo
        title="Applied R&D — AI, Embedded, Analytics & Security Research"
        description="Shank's Code applied R&D: research that survives the bench. Focus areas in AI and Machine Learning, Embedded Systems & Robotics, Data Analytics & Telemetry, and Cybersecurity & Cloud — built, validated, published or patented."
        path="/rnd"
        jsonLd={jsonLd}
      />

      <PublicPageShell>
        <PageHeader
          eyebrow={rndPageCopy.eyebrow}
          title={rndPageCopy.title}
          intro={rndPageCopy.intro}
          image={{
            src: rndPageCopy.image.src,
            alt: rndPageCopy.image.alt,
            width: rndPageCopy.image.width,
            height: rndPageCopy.image.height,
          }}
          pills={rndAreas.map((area) => area.title)}
          pillsLabel="R&D focus areas"
        />
      </PublicPageShell>

      {/* Focus areas */}
      <section aria-labelledby="rnd-areas-heading" className="w-full bg-[#EEF1F6] py-14 md:py-20">
        <PageContainer>
          <div className="mb-8 max-w-3xl space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              Focus areas
            </div>
            <h2
              id="rnd-areas-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
            >
              Four research areas, one engineering standard
            </h2>
            <p className="text-base leading-relaxed text-[#5F5A50]">
              Each area pairs a research question with an engineering deliverable, so a project ends in
              something testable rather than a report.
            </p>
          </div>

          <RndFocusGrid />
        </PageContainer>
      </section>

      {/* Workflow */}
      <section aria-labelledby="rnd-workflow-heading" className="w-full bg-[#FAFAF9] py-14 md:py-20">
        <PageContainer>
          <div className="mb-8 max-w-3xl space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
              Research lifecycle
            </div>
            <h2
              id="rnd-workflow-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
            >
              How an R&amp;D engagement runs
            </h2>
            <ol className="flex flex-wrap gap-2 pt-1" aria-label="R&D workflow stages">
              {workflowSteps.map((step) => (
                <li
                  key={step.step}
                  className="rounded-full border border-[#D3DAE6] bg-white px-3 py-1 font-mono text-[11px] font-semibold text-[#1B2A4A]"
                >
                  {step.step} {step.title}
                </li>
              ))}
            </ol>
          </div>

          <RndWorkflowPanel />

          <p className="mx-auto mt-6 max-w-3xl text-xs leading-relaxed text-[#5C6F97]">
            {rndPageCopy.methodologyNote}
          </p>
        </PageContainer>
      </section>

      {/* Lab + outcomes */}
      <section aria-labelledby="rnd-lab-heading" className="w-full bg-[#EEF1F6] py-14 md:py-20">
        <PageContainer>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
                Inside the lab
              </div>
              <h2
                id="rnd-lab-heading"
                className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
              >
                What the division is working towards
              </h2>

              <ul className="space-y-3 pt-1">
                {LAB_OUTCOMES.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-2.5 rounded-lg border border-[#D3DAE6] bg-white p-3.5 shadow-2xs"
                  >
                    <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                    <span className="text-[13px] leading-snug text-[#2E2A24]">{outcome}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link to="/services" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    rightIcon={<ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />}
                  >
                    R&amp;D partnerships
                  </Button>
                </Link>
                <Link to="/programs" className="w-full sm:w-auto">
                  <Button variant="outline" size="md" fullWidth>
                    Training programs
                  </Button>
                </Link>
              </div>
            </div>

            <RndLabFigure className="reveal-on-scroll stagger-1 lg:col-span-5" />
          </div>
        </PageContainer>
      </section>
    </>
  );
};

export default RnDPage;
