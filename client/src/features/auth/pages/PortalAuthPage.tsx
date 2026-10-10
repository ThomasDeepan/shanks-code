import React from 'react';
import Seo from '@/components/common/Seo';
import AuthShell from '../components/AuthShell';

/**
 * PortalAuthPage — route `/portal`
 *
 * The Student Portal authentication entry point reached from the primary
 * navigation. Offers both SIGN IN and SIGN UP on one screen; the same shell is
 * reused by `/login` and `/signup`.
 */
export const PortalAuthPage: React.FC = () => (
  <>
    <Seo
      title="Student Portal — Sign In or Create an Account"
      description="Sign in to the Shank's Code Student Portal or create a student account to follow your enrolled programs, workshops, internships and certificates."
      path="/portal"
      noIndex
    />
    <AuthShell />
  </>
);

export default PortalAuthPage;
