import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserCheck, AlertCircle, CheckCircle2, Lock, Mail, ArrowRight, Clock } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/services/api/errors';
import { apiConfig } from '@/services/api/config';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginForm: React.FC = () => {
  const {
    user,
    isAuthenticated,
    sessionExpiredMessage,
    clearSessionExpiredMessage,
    loginWithDemo,
    loginWithCredentials,
    logout,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath =
    (location.state as { from?: { pathname?: string } })?.from?.pathname || '/student/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    clearSessionExpiredMessage();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithCredentials({ email: email.trim(), password });
      setEmail('');
      setPassword('');
      navigate(targetPath);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : err instanceof Error
          ? err.message
          : 'Unable to sign in. Please verify your credentials.';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrors({});
    clearSessionExpiredMessage();
    setIsDemoSubmitting(true);
    try {
      await loginWithDemo();
      navigate(targetPath);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : err instanceof Error
          ? err.message
          : 'Demo login failed.';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsDemoSubmitting(false);
    }
  };

  // If already authenticated in current session, display active status with direct portal entry
  if (isAuthenticated && user) {
    return (
      <div className="space-y-6 text-center">
        <div className="p-4 rounded-xl bg-[#FDF3D9] border border-[#D9A62B]/50 text-left space-y-2">
          <div className="flex items-center gap-2 text-[#6E4F06] font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#D9A62B]" aria-hidden="true" />
            <span>Active Student Session Established</span>
          </div>
          <div className="text-xs text-[#1B2A4A] space-y-1 pl-6">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.cohort && (
              <p>
                <strong>Cohort:</strong> {user.cohort}
              </p>
            )}
          </div>
          <div className="pl-6 pt-1">
            <Badge variant="good" size="sm">
              Active Student Account
            </Badge>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => navigate(targetPath)}
            rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
          >
            Enter Student Portal Dashboard
          </Button>

          <Button variant="outline" size="md" fullWidth onClick={logout}>
            Sign Out of Demo Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Expired Notice (401 Redirect Feedback) */}
      {sessionExpiredMessage && (
        <div
          role="status"
          aria-live="polite"
          className="p-3.5 rounded-lg bg-[#FBEAE3] border border-[#F0C9B4] text-[#B4552C] text-xs sm:text-sm flex items-start gap-2.5"
        >
          <Clock className="w-4 h-4 shrink-0 mt-0.5 text-[#B4552C]" aria-hidden="true" />
          <span>{sessionExpiredMessage}</span>
        </div>
      )}

      {/* Form Error Banner */}
      {errors.form && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-[#FBEAE3] border border-[#F0C9B4] text-[#B4552C] text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B4552C]" aria-hidden="true" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Standard Login Form */}
      <form onSubmit={handleStandardSubmit} noValidate className="space-y-4">
        <Input
          label="Student Email Address"
          type="email"
          name="email"
          id="student-email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          placeholder="e.g., demo.student@shankscode.com"
          leftIcon={<Mail className="w-4 h-4" aria-hidden="true" />}
          disabled={isSubmitting || isDemoSubmitting}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          id="student-password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          placeholder="••••••••••••"
          leftIcon={<Lock className="w-4 h-4" aria-hidden="true" />}
          disabled={isSubmitting || isDemoSubmitting}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isSubmitting}
          disabled={isDemoSubmitting}
          leftIcon={<LogIn className="w-4 h-4" aria-hidden="true" />}
        >
          Sign In
        </Button>
      </form>

      {/* Visual Divider */}
      <div className="relative my-6" aria-hidden="true">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2.5 text-slate-400 font-medium tracking-wider">
            Evaluation Access
          </span>
        </div>
      </div>

      {/* Quick Demo Student Login */}
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          fullWidth
          isLoading={isDemoSubmitting}
          disabled={isSubmitting}
          onClick={handleDemoLogin}
          leftIcon={<UserCheck className="w-4 h-4 text-[#1B2A4A]" aria-hidden="true" />}
        >
          Quick Demo Student Login
        </Button>

        <p className="text-[11px] text-center text-slate-400 leading-normal">
          {apiConfig.isLive
            ? 'Live backend mode enabled — please sign in with valid student credentials.'
            : 'Demo evaluation access — sign in with sample student credentials to preview the portal.'}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
