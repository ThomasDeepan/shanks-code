import React from 'react';
import Seo from '@/components/common/Seo';
import AuthShell from '../components/AuthShell';

/**
 * SignupPage — route `/signup`
 * New student self-registration, sharing the `AuthShell` used by `/portal`.
 */
export const SignupPage: React.FC = () => (
  <>
    <Seo
      title="Create a Student Account"
      description="Create your Shank's Code Student Portal account to follow your engineering training programs, campus workshops, internships and certificates."
      path="/signup"
      noIndex
    />
    <AuthShell />
  </>
);

export default SignupPage;
