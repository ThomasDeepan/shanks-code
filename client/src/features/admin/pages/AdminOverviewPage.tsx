import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Wrench,
  Megaphone,
  FlaskConical,
  Users,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import AdminPageShell from '../components/AdminPageShell';
import adminService from '../services/adminService';
import type { ProgramItem } from '@/features/programs/components/ProgramCard';
import type { Workshop } from '@/features/workshops/types';
import type { AdminStudentRecord, Announcement, RndProject } from '../types';
import { apiConfig } from '@/services/api/config';

/**
 * AdminOverviewPage — route `/admin/dashboard`
 *
 * Operational summary of the content the admin manages. Every figure is read
 * from the same source of truth as the public pages — nothing here is a
 * hard-coded claim.
 */

interface OverviewCounts {
  programs: number;
  workshops: number;
  announcements: number;
  publishedAnnouncements: number;
  rndProjects: number;
  students: number;
}

const SECTIONS = [
  {
    to: '/admin/dashboard/programs',
    label: 'Programs',
    icon: GraduationCap,
    description: 'Add, edit and retire catalog programs, durations, levels and eligibility.',
  },
  {
    to: '/admin/dashboard/workshops',
    label: 'Workshops',
    icon: Wrench,
    description: 'Manage workshop sessions, institutions, locations, dates and imagery.',
  },
  {
    to: '/admin/dashboard/announcements',
    label: 'Announcements',
    icon: Megaphone,
    description: 'Create announcements and control whether they are published.',
  },
  {
    to: '/admin/dashboard/research',
    label: 'R&D Projects',
    icon: FlaskConical,
    description: 'Maintain applied research project records and their current stage.',
  },
  {
    to: '/admin/dashboard/students',
    label: 'Students',
    icon: Users,
    description: 'Review student accounts and enrollment-related information.',
  },
];

export const AdminOverviewPage: React.FC = () => {
  const [counts, setCounts] = useState<OverviewCounts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [programs, workshops, announcements, rndProjects, students] = await Promise.all([
          adminService.list('programs') as Promise<ProgramItem[]>,
          adminService.list('workshops') as Promise<Workshop[]>,
          adminService.list('announcements') as Promise<Announcement[]>,
          adminService.list('rndProjects') as Promise<RndProject[]>,
          adminService.listStudents() as Promise<AdminStudentRecord[]>,
        ]);

        if (!isActive) return;

        setCounts({
          programs: programs.length,
          workshops: workshops.length,
          announcements: announcements.length,
          publishedAnnouncements: announcements.filter((item) => item.published).length,
          rndProjects: rndProjects.length,
          students: students.length,
        });
      } catch {
        if (isActive) setError('Unable to load the dashboard summary.');
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void load();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <AdminPageShell
      title="Dashboard"
      description="Manage the content students, colleges and visitors see on the Shank's Code website."
    >
      {error && (
        <p role="alert" className="rounded-lg border border-[#F0C9B4] bg-[#FBEAE3] p-4 text-sm text-[#B4552C]">
          {error}
        </p>
      )}

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Programs', value: counts?.programs },
          { label: 'Workshops', value: counts?.workshops },
          {
            label: 'Announcements',
            value: counts ? `${counts.publishedAnnouncements}/${counts.announcements}` : undefined,
          },
          { label: 'Student records', value: counts?.students },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-[#D3DAE6] bg-white p-4 shadow-2xs"
          >
            <span className="font-display text-2xl font-extrabold leading-none tracking-tight text-[#1B2A4A]">
              {isLoading ? '—' : (metric.value ?? 0)}
            </span>
            <span className="mt-1.5 block text-xs font-medium text-[#5C6F97]">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Management sections */}
      <div className="mb-8">
        <h2 className="mb-4 font-display text-base font-bold tracking-tight text-[#1B2A4A]">
          Management areas
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <li key={section.to}>
              <Link
                to={section.to}
                className="group flex h-full flex-col rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-2xs transition-colors hover:border-[#1B2A4A]/40 hover:bg-[#EEF1F6]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] text-[#1B2A4A]">
                  <section.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="mt-3 flex items-center gap-1.5 text-[15px] font-bold tracking-tight text-[#1B2A4A]">
                  {section.label}
                  <ArrowRight
                    className="h-3.5 w-3.5 text-[#D9A62B] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 text-xs leading-relaxed text-[#5F5A50]">
                  {section.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Environment / security note */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-2xs">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
        <div className="space-y-1.5 text-sm leading-relaxed text-[#5F5A50]">
          <p className="font-semibold text-[#1B2A4A]">Data source and access control</p>
          <p>
            Content mode:{' '}
            <span className="font-mono text-xs font-semibold text-[#1B2A4A]">
              {apiConfig.isLive ? 'live backend API' : 'browser content store (development)'}
            </span>
            . In live mode every write below is an authenticated admin API call and the backend
            re-verifies the administrator role on each request. No credentials or service keys are
            stored in the browser.
          </p>
        </div>
      </div>
    </AdminPageShell>
  );
};

export default AdminOverviewPage;
