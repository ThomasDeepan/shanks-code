import React from 'react';
import { ShieldCheck, Code2 } from 'lucide-react';
import Seo from '@/components/common/Seo';
import AdminLoginForm from '../components/AdminLoginForm';

/**
 * AdminLoginPage — route `/admin/login`
 *
 * Deliberately distinct from the Student Portal entry point: dark navy
 * restricted-access framing, no demo login, and a separate code path
 * (`authService.loginAsAdmin`). The page is excluded from search indexing.
 */
export const AdminLoginPage: React.FC = () => (
  <>
    <Seo
      title="Administrator Sign In"
      description="Restricted administrator sign-in for the Shank's Code management console."
      path="/admin/login"
      noIndex
    />

    <div className="flex min-h-screen items-center justify-center bg-[#0F1930] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-[#2F4368] bg-white shadow-elevated-navy">
          <div className="border-b border-[#2F4368] bg-[#1B2A4A] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2F4368] text-white">
                <ShieldCheck className="h-5 w-5 text-[#D9A62B]" aria-hidden="true" />
              </span>
              <div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D9A62B]">
                  Restricted access
                </div>
                <h1 className="font-display text-lg font-extrabold tracking-tight text-white">
                  Shank&apos;s Code Administration
                </h1>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              This console manages website, student and institution data. Authorisation is verified
              server-side; student accounts cannot reach these routes.
            </p>
          </div>

          <div className="px-6 py-6 sm:px-8">
            <AdminLoginForm />
          </div>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-wider text-slate-400">
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          Shank&apos;s Code Edutech &bull; Villupuram, Tamil Nadu
        </p>
      </div>
    </div>
  </>
);

export default AdminLoginPage;
