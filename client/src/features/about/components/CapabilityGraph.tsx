import React, { useId, useState } from 'react';
import { Binary, BrainCircuit, Cpu, FlaskConical } from 'lucide-react';
import { TECH_DOMAIN_NODES, TECH_CORE } from '../data/capabilityDomains';
import type { TechDomainNode } from '../data/capabilityDomains';

const NODE_ICONS: Record<string, React.ElementType> = {
  software: Binary,
  'ai-data': BrainCircuit,
  'iot-embedded': Cpu,
  rnd: FlaskConical,
};

/**
 * Connector geometry. Node centres sit at 31% / 69% of the padded grid, so the
 * hub is always exactly at 50% / 50%. Expressed as percentages so the drawing
 * stays aligned with the CSS grid at every breakpoint without magic numbers.
 */
const CONNECTOR_ENDPOINTS: ReadonlyArray<readonly [number, number]> = [
  [31, 31],
  [69, 31],
  [31, 69],
  [69, 69],
];

/**
 * TechDomainGraph
 * Restored animated technology graph using the original `TECH_DOMAIN_NODES` data.
 *
 * Built with an SVG connector layer plus a CSS grid of real buttons rather than
 * a WebGL scene, so it:
 *   - never overflows (the SVG scales, labels live in normal grid flow),
 *   - is keyboard navigable and screen-reader friendly,
 *   - costs no extra dependency and no WebGL context,
 *   - honours `prefers-reduced-motion`.
 */
export const TechDomainGraph: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(TECH_DOMAIN_NODES[0].id);
  const gradientId = useId();

  const active: TechDomainNode =
    TECH_DOMAIN_NODES.find((node) => node.id === activeId) ?? TECH_DOMAIN_NODES[0];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = TECH_DOMAIN_NODES.length - 1;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = index === 0 ? lastIndex : index - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const next = TECH_DOMAIN_NODES[nextIndex];
      setActiveId(next.id);
      event.currentTarget.parentElement
        ?.querySelectorAll<HTMLButtonElement>('[data-tech-node]')
        [nextIndex]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
      {/* Graph canvas */}
      <div className="lg:col-span-7">
        <div className="relative aspect-square w-full rounded-xl border border-[#D3DAE6] bg-[#EEF1F6] p-[12%] sm:aspect-[4/3] lg:aspect-square">
          {/* Animated connector layer (decorative) */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2F4368" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#D9A62B" stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {CONNECTOR_ENDPOINTS.map(([x, y], index) => {
              const isActive = TECH_DOMAIN_NODES[index].id === active.id;
              return (
                <line
                  key={x + String(y)}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={`url(#${gradientId})`}
                  strokeWidth={isActive ? 0.9 : 0.55}
                  strokeDasharray="4 4"
                  className={isActive ? 'tech-edge-active' : 'tech-edge'}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {/* Concentric hub rings */}
            <circle cx="50" cy="50" r="13" className="tech-hub-ring" />
            <circle cx="50" cy="50" r="13" className="tech-hub-ring tech-hub-ring-delayed" />
          </svg>

          {/* Central hub */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2F4368] bg-[#1B2A4A] shadow-subtle sm:h-16 sm:w-16">
              <span className="h-2 w-2 rounded-full bg-[#D9A62B]" aria-hidden="true" />
            </span>
            <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1B2A4A] sm:text-[11px]">
              {TECH_CORE.name}
            </span>
          </div>

          {/* Domain nodes */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
            {TECH_DOMAIN_NODES.map((node, index) => {
              const Icon = NODE_ICONS[node.id] ?? Cpu;
              const isActive = node.id === active.id;

              return (
                <div key={node.id} className="flex items-center justify-center">
                  <button
                    type="button"
                    data-tech-node
                    onClick={() => setActiveId(node.id)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    aria-pressed={isActive}
                    className={`group flex w-full max-w-[190px] flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 sm:gap-2 sm:px-3 sm:py-3 ${
                      isActive
                        ? 'border-[#D9A62B] bg-white shadow-subtle'
                        : 'border-[#D3DAE6] bg-white/70 hover:border-[#1B2A4A]/40 hover:bg-white'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors sm:h-5 sm:w-5 ${
                        isActive ? 'text-[#D9A62B]' : 'text-[#1B2A4A]'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-display text-[11px] font-bold leading-tight tracking-tight text-[#1B2A4A] sm:text-[13px]">
                      {node.name}
                    </span>
                    <span className="hidden font-mono text-[9px] uppercase leading-tight tracking-wider text-[#5C6F97] sm:block">
                      {node.category}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active domain readout */}
      <div className="lg:col-span-5">
        <div className="reveal-on-scroll rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs sm:p-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5C6F97]">
            {active.category}
          </p>
          <h4 className="mt-1.5 font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A] sm:text-xl">
            {active.name}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#5F5A50]">{active.desc}</p>

          <p className="mt-4 border-t border-[#E8E6E1] pt-4 text-xs leading-relaxed text-[#5F5A50]">
            Select a domain — use arrow keys to move between them — to see how each capability is
            applied across training, workshops and applied R&amp;D.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechDomainGraph;