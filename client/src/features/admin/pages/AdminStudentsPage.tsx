import React, { useEffect, useState } from 'react';
import { Users, Mail, Building2, GraduationCap } from 'lucide-react';
import AdminPageShell from '../components/AdminPageShell';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import Badge from '@/components/ui/Badge';
import adminService from '../services/adminService';
import type { AdminStudentRecord } from '../types';
import { apiConfig } from '@/services/api/config';

/**
 * AdminStudentsPage — route `/admin/dashboard/students`
 *
 * Read view of student accounts and their enrollment-related data.
 *
 * There is deliberately no mock implementation: student records are personal
 * data and must come from the backend. Until the API provides them the page
 * shows a truthful empty state — no sample students are fabricated.
 */
export const AdminStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<AdminStudentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setStudents(await adminService.listStudents());
    } catch {
      setError('Unable to load student records.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <AdminPageShell
      title="Students"
      description="Student accounts, institutions and enrollment information held by the backend."
    >
      {isLoading && <LoadingState message="Loading student records..." minHeight="min-h-[200px]" />}

      {!isLoading && error && (
        <ErrorState title="Failed to load students" message={error} onRetry={load} />
      )}

      {!isLoading && !error && students.length === 0 && (
        <EmptyState
          icon={Users}
          title="No student records available"
          description={
            apiConfig.isMock
              ? 'Student records are only served by the backend, so this list is empty in development mode. No sample students are shown on purpose.'
              : 'No students have registered yet. Records appear here as accounts are created through the Student Portal.'
          }
        />
      )}

      {!isLoading && !error && students.length > 0 && (
        <ul className="space-y-3">
          {students.map((student) => (
            <li
              key={student.id}
              className="rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-2xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-[15px] font-bold tracking-tight text-[#1B2A4A]">
                  {student.name}
                </h2>
                <Badge
                  variant={
                    student.accountStatus === 'active'
                      ? 'good'
                      : student.accountStatus === 'invited'
                      ? 'info'
                      : 'danger'
                  }
                  size="sm"
                >
                  {student.accountStatus}
                </Badge>
              </div>

              <dl className="mt-3 grid grid-cols-1 gap-2 text-xs text-[#5F5A50] sm:grid-cols-3">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
                  <dt className="sr-only">Email</dt>
                  <dd className="truncate font-mono">{student.email}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
                  <dt className="sr-only">Institution</dt>
                  <dd className="truncate">{student.institution ?? 'Not provided'}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
                  <dt className="sr-only">Cohort</dt>
                  <dd className="truncate">{student.cohort ?? 'No cohort'}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </AdminPageShell>
  );
};

export default AdminStudentsPage;
