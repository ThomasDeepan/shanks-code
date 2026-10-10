import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/features/auth/types';

export interface ProtectedRouteProps {
  children?: React.ReactNode;
  /**
   * Restricts the subtree to a single role.
   *
   * This is a UX-level guard only: it prevents a student from reaching the
   * admin area by typing the URL. The authoritative check is server-side —
   * every admin API endpoint must reject non-admin tokens regardless of what
   * the browser renders.
   */
  allowedRole?: UserRole;
  /** Where an unauthenticated visitor is sent. */
  redirectTo?: string;
}

const FullScreenLoader: React.FC<{ message: string }> = ({ message }) => (
  <div
    role="status"
    aria-live="polite"
    className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-4"
  >
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-8 h-8 rounded-full border-2 border-[#1B2A4A] border-t-transparent animate-spin"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-[#5B6472]">{message}</p>
    </div>
  </div>
);

/** Shown when an authenticated user lacks the role a route requires. */
const AccessDenied: React.FC<{ role: UserRole }> = ({ role }) => (
  <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-4">
    <div className="max-w-md w-full rounded-xl border border-[#D3DAE6] bg-white p-8 text-center shadow-card">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9A62B]/50 bg-[#FDF3D9]">
        <ShieldAlert className="h-6 w-6 text-[#6E4F06]" aria-hidden="true" />
      </div>
      <h1 className="text-xl font-extrabold tracking-tight text-[#1B2A4A]">Access denied</h1>
      <p className="mt-2 text-sm leading-relaxed text-[#5F5A50]">
        Your account does not have {role === 'admin' ? 'administrator' : 'student'} access to this
        area. If you believe this is a mistake, contact the Shank&apos;s Code team.
      </p>
    </div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
  redirectTo,
}) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <FullScreenLoader message="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo ?? '/login'}
        state={{ from: location, requiredRole: allowedRole }}
        replace
      />
    );
  }

  if (allowedRole && role !== allowedRole) {
    // Do not leak admin content: render a refusal instead of redirecting with
    // the admin UI mounted.
    return <AccessDenied role={allowedRole} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
