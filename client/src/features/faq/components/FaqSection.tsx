import React, { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FaqItem } from '../data/faqData';

/**
 * FaqSection
 * Accessible FAQ accordion built on native buttons + `aria-expanded` /
 * `aria-controls`, so it is keyboard operable and screen-reader friendly
 * without adding a dependency.
 *
 * Renders real structured content: the questions are also emitted as FAQPage
 * JSON-LD by the `Seo` component on the hosting page.
 */

export interface FaqSectionProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items,
  eyebrow = 'FAQ',
  title = 'Frequently asked questions',
  description,
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  if (items.length === 0) return null;

  return (
    <div className={className}>
      <div className="mb-6 max-w-3xl space-y-3">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C6F97]">
          {eyebrow}
        </div>
        <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#1B2A4A] sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="text-base leading-relaxed text-[#5F5A50]">{description}</p>
        )}
      </div>

      <ul className="divide-y divide-[#E8E6E1] overflow-hidden rounded-xl border border-[#D3DAE6] bg-white shadow-xs">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `${baseId}-faq-btn-${index}`;
          const panelId = `${baseId}-faq-panel-${index}`;

          return (
            <li key={item.question}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#EEF1F6]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B2A4A] sm:px-6"
                >
                  <span className="text-[15px] font-bold leading-snug tracking-tight text-[#1B2A4A]">
                    {item.question}
                  </span>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#D3DAE6] bg-[#EEF1F6] text-[#1B2A4A]">
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </span>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 sm:px-6"
                >
                  <p className="max-w-3xl text-[13px] leading-relaxed text-[#5F5A50] sm:text-sm">
                    {item.answer}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FaqSection;
