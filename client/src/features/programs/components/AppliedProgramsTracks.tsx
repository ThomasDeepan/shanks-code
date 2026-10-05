import React from 'react';
import {
  Binary,
  Globe2,
  Cloud,
  Shield,
  Cpu,
  Bot,
  Cog,
  Sprout,
} from 'lucide-react';

export interface AppliedProgramItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  tag: string;
}

export const softwareDomains: AppliedProgramItem[] = [
  {
    title: 'Python & Data Analytics',
    icon: <Binary className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Data transformation, statistical modeling, visualization pipelines, and Pandas/NumPy analytics.',
    tag: 'Data Track',
  },
  {
    title: 'Full Stack Web Development',
    icon: <Globe2 className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Modern reactive frontend architectures, RESTful backend APIs, database design, and cloud deployments.',
    tag: 'Web Track',
  },
  {
    title: 'Cloud Computing & DevOps',
    icon: <Cloud className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Docker containerization, CI/CD automated build pipelines, Linux administration, and scalable infrastructure.',
    tag: 'Cloud Track',
  },
  {
    title: 'Cybersecurity & Defenses',
    icon: <Shield className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Network defenses, authentication boundaries, vulnerability assessments, and defensive engineering.',
    tag: 'Security Track',
  },
];

export const hardwareAiDomains: AppliedProgramItem[] = [
  {
    title: 'Embedded Systems & IoT',
    icon: <Cpu className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Microcontroller programming, sensor integration, ESP32/Raspberry Pi prototyping, and telemetry.',
    tag: 'Hardware Track',
  },
  {
    title: 'Artificial Intelligence & ML',
    icon: <Bot className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Machine learning algorithms, neural network fundamentals, predictive analytics, and computer vision.',
    tag: 'AI Track',
  },
  {
    title: 'Robotics & Automation',
    icon: <Cog className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Actuator kinematics, motor controls, autonomous path navigation, and industrial automation.',
    tag: 'Robotics Track',
  },
  {
    title: 'Smart Agriculture & AgriTech',
    icon: <Sprout className="w-5 h-5 text-[#1B2A4A]" aria-hidden="true" />,
    description: 'Soil moisture telemetry, automated irrigation controllers, precision climate sensing, and rural IoT.',
    tag: 'AgriTech Track',
  },
];

interface AppliedProgramsTracksProps {
  showIntroHeading?: boolean;
  className?: string;
}

export const AppliedProgramsTracks: React.FC<AppliedProgramsTracksProps> = ({
  showIntroHeading = true,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`.trim()}>
      {/* 1. Strong Editorial Introduction */}
      {showIntroHeading && (
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-2.5 reveal-on-scroll">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#5C6F97] font-bold">
            APPLIED TECHNOLOGY PROGRAMS
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1B2A4A] tracking-tight leading-tight">
            Technology learning built around real-world practice.
          </h2>

          <p className="text-sm sm:text-base text-[#5F5A50] leading-relaxed">
            Applied engineering curriculum structured around real-world execution, verified builds, and functional prototypes across high-growth technology domains.
          </p>
        </div>
      )}

      {/* 2. Two Distinct Structural Color Worlds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Track 1: Software & Data Systems (Cool Light Navy Structural Surface #EEF1F6) */}
        <div className="bg-[#EEF1F6] rounded-2xl border border-[#D3DAE6] p-6 sm:p-7 flex flex-col justify-between reveal-on-scroll stagger-1">
          <div>
            {/* Track Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D3DAE6] mb-5">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#5C6F97] font-semibold">
                  Track 01 &bull; Software &amp; Systems
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] tracking-tight mt-0.5">
                  Software &amp; Data Systems
                </h3>
              </div>
              <span className="text-xs font-mono font-medium text-[#5C6F97] bg-white/90 px-2.5 py-1 rounded-md border border-[#D3DAE6] shrink-0">
                4 Applied Tracks
              </span>
            </div>

            {/* Individual Program Rows: Clean White Surfaces #FFFFFF */}
            <div className="space-y-3">
              {softwareDomains.map((domain, idx) => (
                <div
                  key={domain.title}
                  className="bg-white rounded-xl border border-[#D3DAE6] p-4.5 sm:p-5 flex items-start gap-3.5 sm:gap-4 transition-all duration-200 hover:border-[#1B2A4A]/40 hover:shadow-xs"
                >
                  {/* Numbered Program Marker & Navy Icon */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF1F6] border border-[#D3DAE6] flex items-center justify-center text-[#1B2A4A]">
                      {domain.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#5C6F97] mt-1.5 tracking-wider">
                      {`0${idx + 1}`}
                    </span>
                  </div>

                  {/* Program Details: Title Dominates, Quieter Description, Restrained Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-3">
                      <h4 className="text-[15px] sm:text-base font-bold text-[#1B2A4A] tracking-tight leading-snug">
                        {domain.title}
                      </h4>
                      <span className="text-[11px] font-mono text-[#5C6F97] uppercase tracking-wider font-semibold shrink-0">
                        {domain.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#5F5A50] leading-relaxed mt-1.5">
                      {domain.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Track 2: Hardware, Robotics & AI (Warm Light Amber Structural Surface #FDF3D9) */}
        <div className="bg-[#FDF3D9] rounded-2xl border border-[#D3DAE6] p-6 sm:p-7 flex flex-col justify-between reveal-on-scroll stagger-2">
          <div>
            {/* Track Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D3DAE6] mb-5">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#5C6F97] font-semibold">
                  Track 02 &bull; Intelligence &amp; Physical
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] tracking-tight mt-0.5">
                  Hardware, Robotics &amp; AI
                </h3>
              </div>
              <span className="text-xs font-mono font-medium text-[#5C6F97] bg-white/90 px-2.5 py-1 rounded-md border border-[#D3DAE6] shrink-0">
                4 Applied Tracks
              </span>
            </div>

            {/* Individual Program Rows: Clean White Surfaces #FFFFFF */}
            <div className="space-y-3">
              {hardwareAiDomains.map((domain) => (
                <div
                  key={domain.title}
                  className="bg-white rounded-xl border border-[#D3DAE6] p-4.5 sm:p-5 flex items-start gap-3.5 sm:gap-4 transition-all duration-200 hover:border-[#1B2A4A]/40 hover:shadow-xs"
                >
                  {/* Technical Iconography with Restrained Amber Accent */}
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF1F6] border border-[#D3DAE6] flex items-center justify-center text-[#1B2A4A]">
                      {domain.icon}
                    </div>
                    <span
                      className="w-2 h-2 rounded-full bg-[#D9A62B] ring-2 ring-white absolute -top-0.5 -right-0.5"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Program Details: Title Dominates, Quieter Description, Restrained Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-3">
                      <h4 className="text-[15px] sm:text-base font-bold text-[#1B2A4A] tracking-tight leading-snug">
                        {domain.title}
                      </h4>
                      <span className="text-[11px] font-mono text-[#5C6F97] uppercase tracking-wider font-semibold shrink-0">
                        {domain.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#5F5A50] leading-relaxed mt-1.5">
                      {domain.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedProgramsTracks;
