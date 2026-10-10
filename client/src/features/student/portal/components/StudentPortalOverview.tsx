import React from 'react';
import {
  BookOpen,
  Briefcase,
  Wrench,
  Award,
  FileText,
  Megaphone,
  UserRound,
  BadgeCheck,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import PortalRecordSection from './PortalRecordSection';
import type {
  StudentPortalData,
  ApplicationRecord,
  CertificateRecord,
  InternshipRecord,
  StudentAnnouncementRecord,
  StudentEnrollmentRecord,
  WorkshopParticipationRecord,
} from '../types';

/**
 * StudentPortalOverview
 * The record blocks of the student dashboard: profile, enrolled programs,
 * internships, workshop participation, certificates, applications and
 * announcements.
 *
 * Every block renders a truthful empty state when the backend has no records.
 */

export interface StudentPortalOverviewProps {
  data: StudentPortalData;
}

const statusVariant = (status: string): 'good' | 'info' | 'warning' | 'danger' => {
  switch (status) {
    case 'completed':
    case 'accepted':
      return 'good';
    case 'active':
    case 'ongoing':
    case 'under-review':
      return 'info';
    case 'rejected':
      return 'danger';
    default:
      return 'warning';
  }
};

const Row: React.FC<{ title: string; meta?: string; status?: string }> = ({
  title,
  meta,
  status,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#D3DAE6] bg-[#FAFAF9] px-3 py-2.5">
    <div className="min-w-0">
      <p className="truncate text-[13px] font-semibold text-[#1B2A4A]">{title}</p>
      {meta && <p className="mt-0.5 font-mono text-[11px] text-[#5C6F97]">{meta}</p>}
    </div>
    {status && (
      <Badge variant={statusVariant(status)} size="sm">
        {status}
      </Badge>
    )}
  </div>
);

export const StudentPortalOverview: React.FC<StudentPortalOverviewProps> = ({ data }) => (
  <div className="space-y-3.5 sm:space-y-4">
    {/* Profile */}
    <section
      aria-labelledby="portal-profile-heading"
      className="rounded-lg border border-slate-200/90 bg-white shadow-2xs"
    >
      <div className="flex items-center gap-2.5 border-b border-slate-200/80 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#D3DAE6] bg-[#EEF1F6] text-[#1B2A4A]">
          <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <div>
          <h3
            id="portal-profile-heading"
            className="text-sm font-bold tracking-tight text-[#1B2A4A]"
          >
            Student profile
          </h3>
          <p className="text-[11px] text-[#5F5A50]">Account and academic details</p>
        </div>
      </div>

      <div className="px-4 py-3.5">
        {data.profile ? (
          <dl className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">Name</dt>
              <dd className="mt-0.5 font-medium text-[#1B2A4A]">{data.profile.fullName}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">Email</dt>
              <dd className="mt-0.5 truncate font-mono text-[#1B2A4A]">{data.profile.email}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
                Institution
              </dt>
              <dd className="mt-0.5 text-[#1B2A4A]">
                {data.profile.institution ?? 'Not provided'}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
                Graduation year
              </dt>
              <dd className="mt-0.5 text-[#1B2A4A]">
                {data.profile.graduationYear ?? 'Not provided'}
              </dd>
            </div>
          </dl>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-[#F5F6F8]/60 px-4 py-5 text-center">
            <p className="text-xs font-semibold text-slate-700">No profile details yet.</p>
            <p className="mx-auto mt-1 max-w-sm text-[11px] leading-relaxed text-slate-500">
              Profile information is served by the backend once the student record is confirmed by the
              Shank&apos;s Code team.
            </p>
          </div>
        )}
      </div>
    </section>

    {/* Record grid */}
    <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
      <PortalRecordSection<StudentEnrollmentRecord>
        title="Enrolled programs"
        description="Programs you are registered for"
        icon={BookOpen}
        items={data.enrollments}
        emptyMessage="No enrolled programs yet."
        emptyHint="Enrollment is confirmed by the Shank's Code team for each training batch."
        getKey={(item) => item.id}
        renderItem={(item) => (
          <Row
            title={item.programTitle}
            meta={[item.cohort, item.enrolledOn].filter(Boolean).join(' • ') || undefined}
            status={item.status}
          />
        )}
      />

      <PortalRecordSection<InternshipRecord>
        title="Internships"
        description="AICTE-approved internship records"
        icon={Briefcase}
        items={data.internships}
        emptyMessage="No internships yet."
        emptyHint="Internship applications and allocations appear here once processed."
        getKey={(item) => item.id}
        renderItem={(item) => (
          <Row
            title={`${item.role} — ${item.organisation}`}
            meta={[item.mode, item.period].filter(Boolean).join(' • ') || undefined}
            status={item.status}
          />
        )}
      />

      <PortalRecordSection<WorkshopParticipationRecord>
        title="Workshop participation"
        description="Campus workshops you attended"
        icon={Wrench}
        items={data.workshops}
        emptyMessage="No workshops recorded yet."
        getKey={(item) => item.id}
        renderItem={(item) => (
          <Row
            title={item.workshopTitle}
            meta={[item.institution, item.attendedOn].filter(Boolean).join(' • ') || undefined}
            status={item.certificateIssued ? 'certificate issued' : undefined}
          />
        )}
      />

      <PortalRecordSection<CertificateRecord>
        title="Certificates"
        description="Verified completion credentials"
        icon={Award}
        items={data.certificates}
        emptyMessage="No certificates yet."
        emptyHint="Certificates are issued after a reviewed project defense."
        getKey={(item) => item.id}
        renderItem={(item) => (
          <div className="flex items-start gap-2.5 rounded-md border border-[#D3DAE6] bg-[#FAFAF9] px-3 py-2.5">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-[#1B2A4A]">{item.title}</p>
              <p className="mt-0.5 font-mono text-[11px] text-[#5C6F97]">
                {[item.issuedOn, item.reference].filter(Boolean).join(' • ') || 'Date pending'}
              </p>
            </div>
          </div>
        )}
      />

      <PortalRecordSection<ApplicationRecord>
        title="Applications"
        description="Submitted program applications"
        icon={FileText}
        items={data.applications}
        emptyMessage="No applications submitted."
        getKey={(item) => item.id}
        renderItem={(item) => (
          <Row title={item.programTitle} meta={item.submittedOn} status={item.status} />
        )}
      />

      <PortalRecordSection<StudentAnnouncementRecord>
        title="Announcements"
        description="Notices from the Shank's Code team"
        icon={Megaphone}
        items={data.announcements}
        emptyMessage="No announcements yet."
        getKey={(item) => item.id}
        renderItem={(item) => (
          <div className="rounded-md border border-[#D3DAE6] bg-[#FAFAF9] px-3 py-2.5">
            <p className="text-[13px] font-semibold text-[#1B2A4A]">{item.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#5F5A50]">{item.body}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
              {item.date}
            </p>
          </div>
        )}
      />
    </div>
  </div>
);

export default StudentPortalOverview;
