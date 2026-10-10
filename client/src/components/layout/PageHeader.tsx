import React from 'react';

/**
 * PageHeader
 * Shared editorial page header for the dedicated public routes (`/about`,
 * `/services`, `/rnd`). Gives every page a consistent single `<h1>` and keeps
 * heading hierarchy correct across the site (one H1 per page, sections use H2).
 *
 * Presentation only — no page content lives here.
 */

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro: string;
  /** Optional supporting image rendered in the right-hand column. */
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  /** Optional pill list rendered under the intro (e.g. workshop audiences). */
  pills?: string[];
  pillsLabel?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  intro,
  image,
  pills,
  pillsLabel,
  children,
}) => {
  const textColumnClass = image ? 'lg:col-span-7' : 'lg:col-span-9';

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`space-y-4 ${textColumnClass} reveal-on-scroll`}>
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
          {eyebrow}
        </div>

        <h1 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-[#5F5A50] sm:text-lg">
          {intro}
        </p>

        {pills && pills.length > 0 && (
          <ul
            className="flex flex-wrap gap-2 pt-1"
            aria-label={pillsLabel ?? 'Key topics'}
          >
            {pills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-[#D3DAE6] bg-white px-3 py-1 text-xs font-medium text-[#2E2A24]"
              >
                {pill}
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>

      {image && (
        <div className={`${image ? 'lg:col-span-5' : ''} reveal-on-scroll stagger-1`.trim()}>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width ?? 800}
            height={image.height ?? 450}
            loading="lazy"
            decoding="async"
            className="h-56 w-full rounded-xl border border-[#D3DAE6] object-cover shadow-sm sm:h-64 lg:h-72"
          />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
