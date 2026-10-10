import React from 'react';
import { Brain, Cpu, BarChart3, ShieldCheck } from 'lucide-react';
import { rndAreas, type RndAreaIcon } from '../data/researchData';

/**
 * RndFocusGrid
 * The four applied R&D focus areas. Shared by the homepage R&D section and the
 * `/rnd` page.
 */

const ICONS: Record<RndAreaIcon, React.ElementType> = {
  ai: Brain,
  embedded: Cpu,
  analytics: BarChart3,
  security: ShieldCheck,
};

export interface RndFocusGridProps {
  className?: string;
}

export const RndFocusGrid: React.FC<RndFocusGridProps> = ({ className = '' }) => (
  <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`.trim()}>
    {rndAreas.map((area) => {
      const Icon = ICONS[area.icon];

      return (
        <div
          key={area.title}
          className="group rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs transition-colors hover:bg-[#EEF1F6]/50"
        >
          <Icon className="mb-3 h-5 w-5 text-[#1B2A4A]" aria-hidden="true" />
          <h3 className="text-[15px] font-bold leading-snug tracking-tight text-[#1B2A4A]">
            {area.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A50]">{area.description}</p>
        </div>
      );
    })}
  </div>
);

export default RndFocusGrid;
