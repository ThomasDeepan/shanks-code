import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  Code2,
  Cpu,
  Handshake,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

interface ServiceItem {
  title: string;
  description: string;
  Icon: React.ElementType;
  badge?: string;
  /** Restored capability chips from the original services section. */
  detail?: string;
}

interface ServiceDomain {
  index: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  items: ServiceItem[];
}

const serviceDomains: ServiceDomain[] = [
  {
    index: '01',
    title: 'Learning & Academic Programs',
    summary: 'Skill training, live lab environments and accredited internships for engineering students.',
    image: '/images/services-academic-training.jpg',
    imageAlt:
      'Instructor running a practical training session with engineering students at a college lab bench',
    items: [
      {
        title: 'Technical Training Programs',
        description: 'Classroom, online and hybrid delivery across emerging technology domains.',
        Icon: GraduationCap,
      },
      {
        title: 'College Skill Development',
        description: 'Helping institutions align course outcomes with real workplace expectations.',
        Icon: Building2,
      },
      {
        title: 'Internship Programs',
        description: 'AICTE-approved internships on live industry projects and systems.',
        Icon: Handshake,
        badge: 'AICTE Approved',
      },
    ],
  },
  {
    index: '02',
    title: 'Technology & Engineering',
    summary: 'Custom software systems, intelligent automation and hardware-software integration.',
    image: '/images/services-tech-engineering.jpg',
    imageAlt:
      'Engineer developing a web application while testing microcontroller telemetry at a workstation',
    items: [
      {
        title: 'Software Development',
        description: 'Web platforms, backend services, APIs and databases for institutions and businesses.',
        Icon: Code2,
        detail: 'Cloud APIs • Modern Web Frontends • Databases',
      },
      {
        title: 'IoT & Automation',
        description: 'Sensor networks, industrial telemetry and remote monitoring dashboards.',
        Icon: Cpu,
        detail: 'Sensors • ESP32 • Industrial Telemetry',
      },
    ],
  },
  {
    index: '03',
    title: 'Institutional Partnerships',
    summary: 'MoUs, faculty enablement and career readiness for colleges and technical communities.',
    image: '/images/services-career-partnerships.jpg',
    imageAlt: 'Coordinator and mentor reviewing a student project plan with engineering graduates',
    items: [
      {
        title: 'Career Readiness',
        description: 'Portfolio curation, resume and mock-interview preparation for engineering roles.',
        Icon: GraduationCap,
        detail: 'Mock Interviews • Portfolio Reviews • Guidance',
      },
      {
        title: 'College MoUs & Faculty Enablement',
        description: 'Long-term collaborations for applied R&D, faculty training and lab access.',
        Icon: Building2,
        detail: 'College MoUs • Faculty Training • R&D Labs',
      },
    ],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full border-b border-[#D3DAE6] bg-[#EEF1F6] py-14 md:py-20"
    >
      <PageContainer>
        <div className="mb-9 max-w-3xl space-y-3 reveal-on-scroll md:mb-12">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
            Services
          </div>
          <h2
            id="services-heading"
            className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl lg:text-4xl"
          >
            What we do for students, colleges and industry
          </h2>
          <p className="text-base leading-relaxed text-[#5F5A50]">
            Three practice areas, one delivery standard: work that runs and can be evaluated.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {serviceDomains.map((domain, index) => (
            <article
              key={domain.index}
              className={`reveal-on-scroll stagger-${index + 1} hover-lift flex flex-col gap-5 rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-xs`}
            >
              <div className="overflow-hidden rounded-lg border border-[#D3DAE6]">
                <img
                  src={domain.image}
                  alt={domain.imageAlt}
                  width={800}
                  height={450}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>

              <div className="space-y-1.5 border-b border-[#E8E6E1] pb-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97]">
                  Domain {domain.index}
                </span>
                <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A]">
                  {domain.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#5F5A50]">{domain.summary}</p>
              </div>

              <ul className="space-y-3.5">
                {domain.items.map((item) => (
                  <li key={item.title} className="flex gap-2.5">
                    <item.Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
                    <span>
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold leading-snug text-[#2E2A24]">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="rounded-full border border-[#D9A62B]/50 bg-[#FDF3D9] px-2 py-0.5 text-[11px] font-semibold text-[#6E4F06]">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-[#5F5A50]">
                        {item.description}
                      </span>
                      {item.detail && (
                        <span className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-[#1B2A4A]">
                          <CheckCircle2
                            className="mt-0.5 h-3 w-3 shrink-0 text-[#D9A62B]"
                            aria-hidden="true"
                          />
                          {item.detail}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Workshops cross-link */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#D9A62B]/40 bg-[#FDF3D9] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
            <div>
              <h3 className="text-[15px] font-bold text-[#6E4F06]">
                Looking for a workshop at your campus?
              </h3>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#6E4F06]/85">
                We run hands-on technical workshops for engineering colleges, polytechnic colleges and
                academic institutions.
              </p>
            </div>
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
  );
};

export default ServicesSection;