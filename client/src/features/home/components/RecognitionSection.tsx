import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import {
  AicteLogo,
  MsmeLogo,
  EdiiTnLogo,
  StartupTnLogo,
} from '@/components/common/AccreditationLogos';

interface RecognitionItem {
  logo: React.ReactNode;
  acronym: string;
  title: string;
  authority: string;
  detail: string;
}

const recognitionItems: RecognitionItem[] = [
  {
    logo: <AicteLogo className="h-11 w-11" />,
    acronym: 'AICTE',
    title: 'Approved Internship Provider',
    authority: 'All India Council for Technical Education',
    detail:
      'Officially approved by AICTE for student technical internship delivery and industry training.',
  },
  {
    logo: <MsmeLogo className="h-11 w-11" />,
    acronym: 'MSME',
    title: 'Recognized Enterprise',
    authority: 'Ministry of MSME, Govt. of India',
    detail:
      'Officially registered and recognized enterprise under the Ministry of Micro, Small & Medium Enterprises.',
  },
  {
    logo: <EdiiTnLogo className="h-11 w-11" />,
    acronym: 'EDII-TN',
    title: 'Mailam Incubation Hub',
    authority: 'Entrepreneurship Development & Innovation Institute',
    detail:
      'Incubated at the EDII-TN Mailam Startup Incubation Hub Foundation for innovation.',
  },
  {
    logo: <StartupTnLogo className="h-11 w-11" />,
    acronym: 'StartupTN',
    title: 'Government Supported',
    authority: 'Government of Tamil Nadu',
    detail:
      'Actively supported by the StartupTN initiative powering the state’s emerging technology ecosystem.',
  },
];

/**
 * RecognitionSection
 * Deliberately compact: a single credential strip rather than four feature
 * cards, since institutional credibility is also summarised in the footer.
 */
export const RecognitionSection: React.FC = () => {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-12 md:py-16"
    >
      <PageContainer>
        <h2
          id="recognition-heading"
          className="mb-6 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]"
        >
          Government recognised &amp; approved
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recognitionItems.map((item) => (
            <li
              key={item.acronym}
              className="reveal-on-scroll flex items-center gap-3.5 rounded-xl border border-[#D3DAE6] bg-white p-4 shadow-xs sm:p-5"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-[#D3DAE6] bg-white p-1 shadow-subtle">
                {item.logo}
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#6E4F06]">
                  {item.acronym}
                </span>
                <span className="mt-0.5 block text-[13px] font-bold leading-snug text-[#1B2A4A]">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-[#5F5A50]">
                  {item.authority}
                </span>
                <span className="mt-1.5 block text-[11px] leading-relaxed text-[#5F5A50]">
                  {item.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
};

export default RecognitionSection;