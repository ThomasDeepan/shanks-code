import React from 'react';
import { GraduationCap } from 'lucide-react';

/**
 * Learning principles — the original educational philosophy statement that
 * previously appeared on the homepage Programs section. Kept verbatim in
 * substance; now presented as a compact strip on `/programs`, which is where a
 * visitor looking for curriculum detail actually needs it.
 */
const learningPrinciples = [
  { action: 'LEARN', modifier: 'Innovatively', desc: 'Modern problem solving & systems thinking' },
  { action: 'BUILD', modifier: 'Confidently', desc: 'Production-ready software & hardware prototypes' },
  { action: 'GROW', modifier: 'Continuously', desc: 'Evolve with rapid technology & industrial cycles' },
  { action: 'IMPACT', modifier: 'Globally', desc: 'Tangible solutions to real-world challenges' },
];

export const ProgramsPhilosophy: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <section
      aria-labelledby="programs-philosophy-heading"
      className={`w-full ${className}`.trim()}
    >
      <div className="reveal-on-scroll rounded-xl border border-[#2F4368] bg-[#0F1930] p-6 shadow-elevated sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D9A62B]">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            Educational Philosophy
          </span>
          <h2
            id="programs-philosophy-heading"
            className="font-display text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl"
          >
            &ldquo;We don&apos;t just teach technology — we build skills, confidence, and future
            leaders.&rdquo;
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Education should not be passive memorization. We architect learning as an active,
            empowering discipline where students write code, debug hardware, and engineer functional
            systems.
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-5 border-t border-[#2F4368] pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {learningPrinciples.map((item) => (
            <li key={item.action} className="space-y-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono text-sm font-extrabold tracking-wider text-[#D9A62B]">
                  {item.action}
                </span>
                <span className="text-xs font-semibold text-white">{item.modifier}</span>
              </span>
              <p className="text-xs leading-relaxed text-slate-300">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProgramsPhilosophy;