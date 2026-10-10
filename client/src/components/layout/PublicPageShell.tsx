import React from 'react';
import PageContainer from './PageContainer';

/**
 * PublicPageShell / PageSection
 * Layout primitives for the dedicated public routes.
 *
 * Layout rule (per the layout spec): each block paints a FULL-WIDTH section
 * background, while the content stays inside a centred container capped at
 * 1280px (`PageContainer` default) with comfortable side padding. Nothing is
 * stretched edge to edge and no excessive empty space is introduced.
 */

export interface PublicPageShellProps {
  children: React.ReactNode;
  className?: string;
}

export const PublicPageShell: React.FC<PublicPageShellProps> = ({
  children,
  className = '',
}) => (
  <div
    className={`w-full bg-[#FAFAF9] pb-16 pt-8 sm:pt-10 md:pb-20 md:pt-12 ${className}`.trim()}
  >
    <PageContainer>{children}</PageContainer>
  </div>
);

export interface PageSectionProps {
  children: React.ReactNode;
  /** Section heading — rendered as `<h2>` to keep one `<h1>` per page. */
  title?: string;
  /** Small monospace label above the heading. */
  eyebrow?: string;
  description?: string;
  /** Alternate the section tint so adjacent sections remain distinguishable. */
  tone?: 'warm' | 'cool';
  /** Removes the top divider (use on the first section after the header). */
  flushTop?: boolean;
  headingId?: string;
  className?: string;
}

export const PageSection: React.FC<PageSectionProps> = ({
  children,
  title,
  eyebrow,
  description,
  tone = 'warm',
  flushTop = false,
  headingId,
  className = '',
}) => {
  const background = tone === 'cool' ? 'bg-[#EEF1F6]' : 'bg-[#FAFAF9]';
  const hasHeader = Boolean(title || eyebrow || description);

  return (
    <section
      aria-labelledby={headingId}
      className={`w-full ${background} ${flushTop ? '' : 'mt-12 md:mt-16'} ${className}`.trim()}
    >
      <PageContainer>
        {hasHeader && (
          <div className="mb-8 max-w-3xl space-y-3 md:mb-10">
            {eyebrow && (
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                id={headingId}
                className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base leading-relaxed text-[#5F5A50]">{description}</p>
            )}
          </div>
        )}

        {children}
      </PageContainer>
    </section>
  );
};

export default PublicPageShell;
