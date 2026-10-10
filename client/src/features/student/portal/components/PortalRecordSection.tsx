import React from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * PortalRecordSection
 * A titled block on the student dashboard that lists backend records when they
 * exist and shows a clear empty state when they do not.
 *
 * The empty state is intentional and truthful: it names exactly what is missing
 * rather than rendering placeholder rows that look like real data.
 */

export interface PortalRecordSectionProps<T> {
  title: string;
  description: string;
  icon: LucideIcon;
  items: T[];
  /** Message shown when `items` is empty, e.g. "No enrolled programs yet." */
  emptyMessage: string;
  /** Optional hint under the empty message. */
  emptyHint?: string;
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
  className?: string;
}

export function PortalRecordSection<T>({
  title,
  description,
  icon: Icon,
  items,
  emptyMessage,
  emptyHint,
  renderItem,
  getKey,
  className = '',
}: PortalRecordSectionProps<T>) {
  return (
    <section
      aria-labelledby={`portal-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className={`rounded-lg border border-slate-200/90 bg-white shadow-2xs ${className}`.trim()}
    >
      <div className="flex items-start gap-2.5 border-b border-slate-200/80 px-4 py-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#D3DAE6] bg-[#EEF1F6] text-[#1B2A4A]">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3
            id={`portal-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-sm font-bold tracking-tight text-[#1B2A4A]"
          >
            {title}
          </h3>
          <p className="text-[11px] leading-relaxed text-[#5F5A50]">{description}</p>
        </div>
      </div>

      <div className="px-4 py-3.5">
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 bg-[#F5F6F8]/60 px-4 py-5 text-center">
            <p className="text-xs font-semibold text-slate-700">{emptyMessage}</p>
            {emptyHint && (
              <p className="mx-auto mt-1 max-w-sm text-[11px] leading-relaxed text-slate-500">
                {emptyHint}
              </p>
            )}
          </div>
        ) : (
          <ul className="space-y-2.5">{items.map((item) => <li key={getKey(item)}>{renderItem(item)}</li>)}</ul>
        )}
      </div>
    </section>
  );
}

export default PortalRecordSection;
