import React from 'react';
import {
  GraduationCap,
  Building2,
  Code2,
  Cpu,
  Handshake,
  CheckCircle2,
} from 'lucide-react';
import type { ServiceDomain, ServiceItem } from '../data/servicesData';

/**
 * ServiceDomainCard
 * Presentational card for one service domain, shared by the homepage preview
 * and the dedicated `/services` page so both render identical records.
 *
 * `variant="summary"` is used on the homepage: it keeps the domain title,
 * summary, every service title, badge and capability chip, and defers only the
 * one-line service description to the full page.
 */

const ICONS: Record<ServiceItem['icon'], React.ElementType> = {
  'graduation-cap': GraduationCap,
  'building-2': Building2,
  'code-2': Code2,
  cpu: Cpu,
  handshake: Handshake,
};

export type ServiceDomainCardVariant = 'summary' | 'full';

export interface ServiceDomainCardProps {
  domain: ServiceDomain;
  variant?: ServiceDomainCardVariant;
  className?: string;
}

export const ServiceDomainCard: React.FC<ServiceDomainCardProps> = ({
  domain,
  variant = 'full',
  className = '',
}) => {
  const isFull = variant === 'full';

  return (
    <article
      className={`flex flex-col gap-5 rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-xs hover-lift ${className}`.trim()}
    >
      <div className="overflow-hidden rounded-lg border border-[#D3DAE6]">
        <img
          src={domain.image}
          alt={domain.imageAlt}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="space-y-1.5 border-b border-[#E8E6E1] pb-4">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C6F97]">
          Domain {domain.index}
        </span>
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[#1B2A4A]">
          {domain.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-[#5F5A50]">{domain.summary}</p>
      </div>

      <ul className="space-y-3.5">
        {domain.items.map((item) => {
          const Icon = ICONS[item.icon] ?? Code2;

          return (
            <li key={item.title} className="flex gap-2.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold leading-snug text-[#2E2A24]">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="rounded-full border border-[#D9A62B]/50 bg-[#FDF3D9] px-2 py-0.5 text-[11px] font-semibold text-[#6E4F06]">
                      {item.badge}
                    </span>
                  )}
                </span>

                {isFull && (
                  <span className="mt-0.5 block text-xs leading-relaxed text-[#5F5A50]">
                    {item.description}
                  </span>
                )}

                {item.detail && (
                  <span className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-[#1B2A4A]">
                    <CheckCircle2
                      className="mt-0.5 h-3 w-3 shrink-0 text-[#D9A62B]"
                      aria-hidden="true"
                    />
                    {item.detail}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default ServiceDomainCard;
