import React from 'react';
import Seo from '@/components/common/Seo';
import AuthShell from '../components/AuthShell';

/**
 * LoginPage — route `/login`
 *
 * Preserved route (footer, hero and CTA links have always pointed here). Now
 * rendered through the shared `AuthShell`, so signing in and signing up are one
 * consistent experience with the existing `LoginForm` untouched.
 */
export const LoginPage: React.FC = () => (
  <>
    <Seo
      title="Student Sign In"
      description="Sign in to your Shank's Code Student Portal account to access enrolled coursework, lesson progression and learning sessions."
      path="/login"
      noIndex
    />
    <AuthShell />
  </>
);

export default LoginPage;
