import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

/**
 * AuthShell
 * Student Portal authentication entry point with two modes:
 *   - `signin`  — existing student credentials (LoginForm)
 *   - `signup`  — new student account (SignupForm)
 *
 * Both modes are also reachable as dedicated routes (`/login`, `/signup`) so the
 * links are shareable and deep-linkable. The tab state is a UI affordance only;
 * authentication itself is handled by `authService`.
 */

export type AuthMode = 'signin' | 'signup';

export interface AuthShellProps {
  initialMode?: AuthMode;
}

const TAB_LABELS: Record<AuthMode, string> = {
  signin: 'Sign In',
  signup: 'Sign Up',
};

export const AuthShell: React.FC<AuthShellProps> = () => {
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>('signin');

  // On the dedicated routes the tab follows the URL; on `/portal` it follows
  // local state, so both entry points share one implementation.
  const isDedicatedRoute = location.pathname === '/login' || location.pathname === '/signup';
  const activeMode: AuthMode = isDedicatedRoute
    ? location.pathname === '/signup'
      ? 'signup'
      : 'signin'
    : mode;

  return (
    <div className="w-full min-h-[calc(100vh-16rem)] flex items-center justify-center bg-[#F5F6F8] py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 sm:px-6">
        <Card className="border-slate-200 bg-white p-6 shadow-subtle sm:p-8">
          <CardHeader className="space-y-2.5 p-0 pb-6 text-center">
            <div className="mb-1 flex justify-center">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B2A4A] text-white shadow-xs">
                <Code2 className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
            </div>

            <div className="flex justify-center">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#5C6F97]">
                Student Portal Access
              </div>
            </div>

            <CardTitle
              as="h1"
              className="text-2xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-3xl"
            >
              {activeMode === 'signin' ? "Sign in to Shank's Code" : 'Create your student account'}
            </CardTitle>

            <CardDescription className="mx-auto max-w-xs text-xs leading-relaxed text-[#5F5A50] sm:text-sm">
              {activeMode === 'signin'
                ? 'Access your enrolled engineering coursework, syllabus progression and active learning sessions.'
                : 'Register for the Student Portal to follow your programs, workshops and certificates in one place.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {/* Mode switcher */}
            <div
              role="tablist"
              aria-label="Student authentication mode"
              className="mb-6 grid grid-cols-2 gap-1 rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] p-1"
            >
              {(Object.keys(TAB_LABELS) as AuthMode[]).map((key) => {
                const isActive = activeMode === key;

                return (
                  <Link
                    key={key}
                    to={key === 'signin' ? '/login' : '/signup'}
                    role="tab"
                    aria-selected={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMode(key)}
                    className={`rounded-md px-3 py-2 text-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] ${
                      isActive
                        ? 'bg-white text-[#1B2A4A] shadow-2xs'
                        : 'text-[#5C6F97] hover:text-[#1B2A4A]'
                    }`}
                  >
                    {TAB_LABELS[key]}
                  </Link>
                );
              })}
            </div>

            <div role="tabpanel">{activeMode === 'signin' ? <LoginForm /> : <SignupForm />}</div>
          </CardContent>
        </Card>

        {/* Separate administrator entry point — visually and structurally distinct */}
        <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
          Shank&apos;s Code staff:{' '}
          <Link
            to="/admin/login"
            className="font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-2 hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
          >
            Administrator sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthShell;
