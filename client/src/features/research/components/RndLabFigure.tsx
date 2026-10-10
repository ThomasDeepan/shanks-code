import React from 'react';
import { rndPageCopy } from '../data/researchData';

/**
 * RndLabFigure
 * Applied computing & robotics lab visual used by both the homepage R&D
 * section and the `/rnd` page header. Existing project imagery is reused — no
 * new or stock photography has been introduced.
 */
export const RndLabFigure: React.FC<{ className?: string }> = ({ className = '' }) => (
  <figure className={`group relative overflow-hidden rounded-xl border border-[#D3DAE6] bg-[#1B2A4A] shadow-sm ${className}`.trim()}>
    <img
      src={rndPageCopy.image.src}
      alt={rndPageCopy.image.alt}
      width={rndPageCopy.image.width}
      height={rndPageCopy.image.height}
      loading="lazy"
      decoding="async"
      className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
    />
    <figcaption className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-[#1B2A4A]/85 px-3 py-1.5 text-[11px] font-medium text-white/90">
      {rndPageCopy.image.caption}
    </figcaption>
  </figure>
);

export default RndLabFigure;
