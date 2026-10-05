import React from 'react';
import { createBrowserRouter, Navigate, Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import HomePage from '@/features/home/pages/HomePage';
import ProgramsPage from '@/features/programs/pages/ProgramsPage';
import WorkshopsPage from '@/features/workshops/pages/WorkshopsPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import StudentLayout from '@/components/layout/StudentLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import StudentDashboardPage from '@/features/student/dashboard/pages/StudentDashboardPage';
import CoursesPage from '@/features/student/courses/pages/CoursesPage';
import LearningPage from '@/features/student/learning/pages/LearningPage';

// Polished 404 placeholder for unmapped route validation
const NotFoundPlaceholder: React.FC = () => (
  <PageContainer className="py-16 md:py-24">
    <Card className="max-w-md mx-auto p-8 text-center space-y-4 border-slate-200/80 shadow-card bg-white">
      <div className="flex justify-center">
        <Badge variant="attention" size="md">404 Error</Badge>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1F2B]">
        Page Not Found
      </h1>
      <p className="text-sm text-[#5B6472] leading-relaxed">
        The requested page does not exist in the confirmed Shank's Code route map.
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
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'programs',
        element: <ProgramsPage />,
      },
      {
        path: 'workshops',
        element: <WorkshopsPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPlaceholder />,
      },
    ],
  },
  {
    path: '/student',
    element: (
      <ProtectedRoute>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/student/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <StudentDashboardPage />,
      },
      {
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'learning/:courseId/:lessonId',
        element: <LearningPage />,
      },
      {
        path: 'learning/:courseId',
        element: <LearningPage />,
      },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
});

export default router;
