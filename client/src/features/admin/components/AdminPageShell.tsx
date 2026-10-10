import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * AdminPageShell
 * Consistent page chrome for every admin section: breadcrumb back to the
 * dashboard, section title, optional description and a comfortable content
 * column capped at 1280px.
 */

export interface AdminPageShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Optional right-aligned actions in the header row. */
  actions?: React.ReactNode;
}

export const AdminPageShell: React.FC<AdminPageShellProps> = ({
  title,
  description,
  children,
  actions,
}) => (
  <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-6 lg:px-6">
    <nav aria-label="Breadcrumb" className="mb-3">
      <Link
        to="/admin/dashboard"
        className="inline-flex items-center gap-1.5 rounded text-xs font-semibold text-[#5C6F97] transition-colors hover:text-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Dashboard
      </Link>
    </nav>

    <header className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <h1 className="font-display text-xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-[#5F5A50]">{description}</p>
        )}
      </div>
      {actions}
    </header>

    {children}
  </div>
);

export default AdminPageShell;
