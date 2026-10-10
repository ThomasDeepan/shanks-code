import React from 'react';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon, ShieldCheck, ExternalLink } from 'lucide-react';
import AdminPageShell from '../components/AdminPageShell';
import { apiConfig } from '@/services/api/config';
import { CONTACT, SITE_NAME } from '@/constants/site';

/**
 * AdminSettingsPage — route `/admin/dashboard/settings`
 *
 * Read-only environment and access information. There are deliberately no
 * credential fields here: secrets belong in server-side environment variables,
 * never in the browser bundle.
 */

const CONFIG_ROWS = [
  { label: 'API mode', value: apiConfig.isLive ? 'live' : 'mock', hint: 'Set with VITE_API_MODE' },
  {
    label: 'API base URL',
    value: apiConfig.baseUrl,
    hint: 'Set with VITE_API_BASE_URL',
  },
  {
    label: 'Content persistence',
    value: apiConfig.isLive ? 'Backend database' : 'Browser content store (development)',
    hint: 'Where admin edits are saved',
  },
];

export const AdminSettingsPage: React.FC = () => (
  <AdminPageShell
    title="Settings"
    description="Environment configuration and access notes for this installation."
  >
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-2xs">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] text-[#1B2A4A]">
            <SettingsIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="font-display text-base font-bold tracking-tight text-[#1B2A4A]">
            Environment
          </h2>
        </div>

        <dl className="space-y-3">
          {CONFIG_ROWS.map((row) => (
            <div key={row.label} className="border-b border-[#E8E6E1] pb-3 last:border-0 last:pb-0">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
                {row.label}
              </dt>
              <dd className="mt-0.5 break-words font-mono text-[13px] text-[#1B2A4A]">
                {row.value}
              </dd>
              <dd className="mt-0.5 text-[11px] text-[#5F5A50]">{row.hint}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-2xs">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] text-[#1B2A4A]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="font-display text-base font-bold tracking-tight text-[#1B2A4A]">
            Access control
          </h2>
        </div>

        <ul className="space-y-2.5 text-sm leading-relaxed text-[#5F5A50]">
          <li>
            Admin routes are wrapped in a role check, so typing{' '}
            <span className="font-mono text-xs text-[#1B2A4A]">/admin/dashboard</span> as a student
            is refused before the console renders.
          </li>
          <li>
            The authoritative check is server-side: every admin API endpoint must validate the
            administrator role on the request itself.
          </li>
          <li>
            No API keys, service-role tokens or database credentials exist in the client bundle.
            Sensitive configuration belongs in server-side environment variables.
          </li>
          <li>
            Student authentication and administrator authentication are separate endpoints with
            separate sessions.
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-2xs lg:col-span-2">
        <h2 className="font-display text-base font-bold tracking-tight text-[#1B2A4A]">
          Organisation
        </h2>
        <dl className="mt-3 grid grid-cols-1 gap-3 text-sm text-[#5F5A50] sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
              Organisation
            </dt>
            <dd className="mt-0.5 text-[#1B2A4A]">{SITE_NAME}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
              Headquarters
            </dt>
            <dd className="mt-0.5 text-[#1B2A4A]">{CONTACT.city}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
              Enquiries
            </dt>
            <dd className="mt-0.5">
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-mono text-xs text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-2"
              >
                {CONTACT.email}
              </a>
            </dd>
          </div>
        </dl>

        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-4 hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          View the public website
        </Link>
      </section>
    </div>
  </AdminPageShell>
);

export default AdminSettingsPage;
