/**
 * Student portal record types.
 *
 * These describe the records the portal is READY to display. They are not
 * populated with invented data — `studentPortalService` returns empty
 * collections in mock mode so the dashboard renders truthful empty states until
 * the backend serves real records.
 */

export interface StudentProfileRecord {
  fullName: string;
  email: string;
  institution?: string;
  graduationYear?: string;
  cohort?: string;
  /** Backend-managed enrollment identifiers; empty when unenrolled. */
  enrollmentIds: string[];
}

export interface StudentEnrollmentRecord {
  id: string;
  programTitle: string;
  cohort?: string;
  enrolledOn?: string;
  status: 'active' | 'completed' | 'pending';
  progressPercentage?: number;
}

export interface InternshipRecord {
  id: string;
  organisation: string;
  role: string;
  mode?: string;
  period?: string;
  status: 'applied' | 'ongoing' | 'completed';
}

export interface WorkshopParticipationRecord {
  id: string;
  workshopTitle: string;
  institution: string;
  attendedOn?: string;
  certificateIssued: boolean;
}

export interface CertificateRecord {
  id: string;
  title: string;
  issuedOn?: string;
  reference?: string;
}

export interface ApplicationRecord {
  id: string;
  programTitle: string;
  submittedOn?: string;
  status: 'submitted' | 'under-review' | 'accepted' | 'rejected';
}

export interface StudentAnnouncementRecord {
  id: string;
  title: string;
  body: string;
  date: string;
  audience: 'students' | 'colleges' | 'public';
}

/** Everything the student dashboard reads in one request. */
export interface StudentPortalData {
  profile: StudentProfileRecord | null;
  enrollments: StudentEnrollmentRecord[];
  internships: InternshipRecord[];
  workshops: WorkshopParticipationRecord[];
  certificates: CertificateRecord[];
  applications: ApplicationRecord[];
  announcements: StudentAnnouncementRecord[];
}
