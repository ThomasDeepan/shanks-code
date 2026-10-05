import React from 'react';
import { Building2, MapPin, Wrench } from 'lucide-react';
import type { Workshop } from '../types';

interface WorkshopCardProps {
  workshop: Workshop;
}

/**
 * WorkshopCard
 * Renders a single workshop. Photography is optional: when no verified image
 * exists for a workshop, a typographic header panel is used instead of
 * unrelated stock imagery.
 */
export const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
  const hasImage = Boolean(workshop.image);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#D3DAE6] bg-white shadow-xs hover-lift">
      {hasImage ? (
        <img
          src={workshop.image}
          alt={workshop.imageAlt ?? `${workshop.title} at ${workshop.institution}`}
          loading="lazy"
          className="h-40 w-full object-cover sm:h-44"
        />
      ) : (
        <div className="flex h-20 items-center justify-between border-b border-[#D3DAE6] bg-[#EEF1F6] px-5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C6F97]">
            {workshop.code}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#D9A62B]" aria-hidden="true" />
          <Wrench className="h-4 w-4 text-[#1B2A4A]" aria-hidden="true" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="inline-flex w-fit items-center rounded-full border border-[#D9A62B]/50 bg-[#FDF3D9] px-2.5 py-0.5 text-[11px] font-semibold text-[#6E4F06]">
          {workshop.audience}
        </span>

        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A]">
          {workshop.title}
        </h3>

        <div className="flex flex-col gap-1.5 border-y border-[#E8E6E1] py-3 text-[13px] text-[#5F5A50]">
          <span className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
            <span className="font-semibold text-[#2E2A24]">{workshop.institution}</span>
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
            <span>{workshop.location}</span>
          </span>
        </div>

        <p className="text-[13px] leading-relaxed text-[#5F5A50]">{workshop.summary}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1" aria-label="Workshop focus areas">
          {workshop.focus.map((item) => (
            <li
              key={item}
              className="rounded-md border border-[#D3DAE6] bg-[#EEF1F6] px-2 py-0.5 font-mono text-[11px] text-[#1B2A4A]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default WorkshopCard;