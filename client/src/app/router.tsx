import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/common/LoadingState';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import HomePage from '@/features/home/pages/HomePage';

/* -----------------------------------------------------------------------------
 * Route-level code splitting.
 *
 * The homepage ships in the main bundle (it is the entry point for most
 * visitors); every other route — including the authenticated student portal and
 * the admin console — is loaded on demand. This keeps the initial download
 * focused on the public homepage.
 * --------------------------------------------------------------------------- */

const AboutPage = lazy(() => import('@/features/about/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/features/services/pages/ServicesPage'));
const RnDPage = lazy(() => import('@/features/research/pages/RnDPage'));
const ProgramsPage = lazy(() => import('@/features/programs/pages/ProgramsPage'));
const WorkshopsPage = lazy(() => import('@/features/workshops/pages/WorkshopsPage'));

const PortalAuthPage = lazy(() => import('@/features/auth/pages/PortalAuthPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'));

const StudentLayout = lazy(() => import('@/components/layout/StudentLayout'));
const StudentDashboardPage = lazy(
  () => import('@/features/student/dashboard/pages/StudentDashboardPage')
);
const CoursesPage = lazy(() => import('@/features/student/courses/pages/CoursesPage'));
const LearningPage = lazy(() => import('@/features/student/learning/pages/LearningPage'));

const AdminLoginPage = lazy(() => import('@/features/admin/pages/AdminLoginPage'));
const AdminLayout = lazy(() => import('@/features/admin/components/AdminLayout'));
const AdminOverviewPage = lazy(() => import('@/features/admin/pages/AdminOverviewPage'));
const AdminProgramsPage = lazy(() => import('@/features/admin/pages/AdminProgramsPage'));
const AdminWorkshopsPage = lazy(() => import('@/features/admin/pages/AdminWorkshopsPage'));
const AdminAnnouncementsPage = lazy(() => import('@/features/admin/pages/AdminAnnouncementsPage'));
const AdminResearchPage = lazy(() => import('@/features/admin/pages/AdminResearchPage'));
const AdminStudentsPage = lazy(() => import('@/features/admin/pages/AdminStudentsPage'));
const AdminSettingsPage = lazy(() => import('@/features/admin/pages/AdminSettingsPage'));

/** Wraps a lazy element in a Suspense boundary with the standard loader. */
const Lazy: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingState message="Loading page..." minHeight="min-h-[320px]" />}>
    {children}
  </Suspense>
);

// Polished 404 placeholder for unmapped route validation
const NotFoundPlaceholder: React.FC = () => (
  <PageContainer className="py-16 md:py-24">
    <Card className="max-w-md mx-auto p-8 text-center space-y-4 border-slate-200/80 shadow-card bg-white">
      <div className="flex justify-center">
        <Badge variant="attention" size="md">
          404 Error
        </Badge>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1F2B]">
        Page Not Found
      </h1>
      <p className="text-sm text-[#5B6472] leading-relaxed">
        The page you requested does not exist. Use the navigation above, or return to the homepage.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="primary" size="md">
            Return to Home
          </Button>
        </Link>
      </div>
    </Card>
  </PageContainer>
);

export const router = createBrowserRouter([
  /* ---------------------------------------------------------------------
   * A. Public website
   * ------------------------------------------------------------------- */
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: (
          <Lazy>
            <AboutPage />
          </Lazy>
        ),
      },
      {
        path: 'services',
        element: (
          <Lazy>
            <ServicesPage />
          </Lazy>
        ),
      },
      {
        path: 'rnd',
        element: (
          <Lazy>
            <RnDPage />
          </Lazy>
        ),
      },
      // `/research` was the originally proposed path — kept as a redirect so any
      // existing links continue to work.
      {
        path: 'research',
        element: <Navigate to="/rnd" replace />,
      },
      {
        path: 'programs',
        element: (
          <Lazy>
            <ProgramsPage />
          </Lazy>
        ),
      },
      {
        path: 'workshops',
        element: (
          <Lazy>
            <WorkshopsPage />
          </Lazy>
        ),
      },
      {
        // Student Portal authentication entry point (Sign In + Sign Up).
        path: 'portal',
        element: (
          <Lazy>
            <PortalAuthPage />
          </Lazy>
        ),
      },
      {
        path: 'login',
        element: (
          <Lazy>
            <LoginPage />
          </Lazy>
        ),
      },
      {
        path: 'signup',
        element: (
          <Lazy>
            <SignupPage />
          </Lazy>
        ),
      },
      {
        path: '*',
        element: <NotFoundPlaceholder />,
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * B. Student Portal — protected, student session required
   * ------------------------------------------------------------------- */
  {
    path: '/student',
    element: (
      <ProtectedRoute redirectTo="/login">
        <Suspense fallback={<LoadingState message="Loading student portal..." />}>
          <StudentLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/student/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Lazy>
            <StudentDashboardPage />
          </Lazy>
        ),
      },
      {
        path: 'courses',
        element: (
          <Lazy>
            <CoursesPage />
          </Lazy>
        ),
      },
      {
        path: 'learning/:courseId/:lessonId',
        element: (
          <Lazy>
            <LearningPage />
          </Lazy>
        ),
      },
      {
        path: 'learning/:courseId',
        element: (
          <Lazy>
            <LearningPage />
          </Lazy>
        ),
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * C. Administration — separate login, role-protected
   *
   * `ProtectedRoute allowedRole="admin"` refuses the subtree for any signed-in
   * user without the administrator role, so a student cannot reach
   * /admin/dashboard by typing the URL. The backend remains the authoritative
   * check on every admin API call.
   * ------------------------------------------------------------------- */
  {
    path: '/admin/login',
    element: (
      <Lazy>
        <AdminLoginPage />
      </Lazy>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute allowedRole="admin" redirectTo="/admin/login">
        <Suspense fallback={<LoadingState message="Loading administration console..." />}>
          <AdminLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Lazy><AdminOverviewPage /></Lazy> },
      { path: 'programs', element: <Lazy><AdminProgramsPage /></Lazy> },
      { path: 'workshops', element: <Lazy><AdminWorkshopsPage /></Lazy> },
      { path: 'announcements', element: <Lazy><AdminAnnouncementsPage /></Lazy> },
      { path: 'research', element: <Lazy><AdminResearchPage /></Lazy> },
      { path: 'students', element: <Lazy><AdminStudentsPage /></Lazy> },
      { path: 'settings', element: <Lazy><AdminSettingsPage /></Lazy> },
    ],
  },

  /* Fallback for unknown top-level paths such as /admin/anything-else */
  {
    path: '*',
    element: (
      <PublicLayout>
        <NotFoundPlaceholder />
      </PublicLayout>
    ),
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
});

export default router;
