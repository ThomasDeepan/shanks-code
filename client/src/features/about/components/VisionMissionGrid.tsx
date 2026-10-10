import React from 'react';
import { Target, Compass } from 'lucide-react';
import { visionAndMission } from '../data/aboutContent';

/**
 * VisionMissionGrid
 * Shared by the homepage About section and the `/about` page so the vision and
 * mission statements exist in exactly one place.
 */

export interface VisionMissionGridProps {
  className?: string;
}

export const VisionMissionGrid: React.FC<VisionMissionGridProps> = ({ className = '' }) => {
  const icons = { vision: Target, mission: Compass } as const;

  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${className}`.trim()}>
      {visionAndMission.map((item, index) => {
        const Icon = icons[item.key];

        return (
          <div
            key={item.key}
            className={`reveal-on-scroll ${index === 1 ? 'stagger-1' : ''} space-y-2.5 rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-xs`.trim()}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="h-5 w-5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
              <h3 className="font-display text-base font-bold tracking-tight text-[#1B2A4A]">
                {item.label}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#5F5A50]">{item.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VisionMissionGrid;
