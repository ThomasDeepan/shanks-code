import React from 'react';
import type { WorkshopStat } from '../types';

interface WorkshopStatsRowProps {
  stats: WorkshopStat[];
}

/**
 * WorkshopStatsRow
 * Compact, card-free impact band. Shared by the homepage preview and the
 * Workshops page so workshop figures are never duplicated elsewhere.
 */
export const WorkshopStatsRow: React.FC<WorkshopStatsRowProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-[#D3DAE6] overflow-hidden rounded-xl border border-[#D3DAE6] bg-white lg:grid-cols-4 lg:divide-y-0">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 px-4 py-5 sm:px-6 sm:py-6">
          <span className="font-display text-2xl font-extrabold leading-none tracking-tight text-[#1B2A4A] sm:text-3xl">
            {stat.value}
          </span>
          <span className="text-xs font-semibold text-[#5F5A50] sm:text-[13px]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default WorkshopStatsRow;