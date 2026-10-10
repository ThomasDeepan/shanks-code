import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, AlertCircle, GraduationCap, Lock, Mail, User, Building2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/services/api/errors';
import { apiConfig } from '@/services/api/config';

/**
 * SignupForm
 * Student account creation. Credentials are posted to the auth service (which
 * dispatches to the backend in live mode) — nothing is stored client-side except
 * the resulting session, and the password is never persisted.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
}

export const SignupForm: React.FC = () => {
  const { register, clearSessionExpiredMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath =
    (location.state as { from?: { pathname?: string } })?.from?.pathname || '/student/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: SignupErrors = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      nextErrors.name = 'Full name is required.';
    } else if (trimmedName.length < 3) {
      nextErrors.name = 'Please enter your full name.';
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      nextErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearSessionExpiredMessage();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        institution: institution.trim() || undefined,
        graduationYear: graduationYear.trim() || undefined,
      });
      navigate(targetPath, { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : err instanceof Error
          ? err.message
          : 'Unable to create your account. Please try again.';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errors.form && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-[#F0C9B4] bg-[#FBEAE3] p-3.5 text-sm text-[#B4552C]"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B4552C]" aria-hidden="true" />
          <span>{errors.form}</span>
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="name"
        id="signup-name"
        autoComplete="name"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        error={errors.name}
        placeholder="e.g., A. Kumar"
        leftIcon={<User className="h-4 w-4" aria-hidden="true" />}
        disabled={isSubmitting}
      />

      <Input
        label="Student Email Address"
        type="email"
        name="email"
        id="signup-email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        placeholder="e.g., student@college.edu"
        leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
        disabled={isSubmitting}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        id="signup-password"
        autoComplete="new-password"
        required
        helperText={`At least ${MIN_PASSWORD_LENGTH} characters.`}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        error={errors.password || undefined}
        placeholder="••••••••••••"
        leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
        disabled={isSubmitting}
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        id="signup-confirm-password"
        autoComplete="new-password"
        required
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword)
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
        error={errors.confirmPassword}
        placeholder="••••••••••••"
        leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
        disabled={isSubmitting}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="College / Institution"
          type="text"
          name="institution"
          id="signup-institution"
          autoComplete="organization"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="Optional"
          leftIcon={<Building2 className="h-4 w-4" aria-hidden="true" />}
          disabled={isSubmitting}
        />

        <Input
          label="Year of Graduation"
          type="text"
          name="graduationYear"
          id="signup-graduation-year"
          inputMode="numeric"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          placeholder="Optional"
          leftIcon={<GraduationCap className="h-4 w-4" aria-hidden="true" />}
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isSubmitting}
        leftIcon={<UserPlus className="h-4 w-4" aria-hidden="true" />}
      >
        Create Student Account
      </Button>

      <p className="text-[11px] leading-relaxed text-slate-500">
        {apiConfig.isLive
          ? 'Your account is created on the Shank\'s Code server and your password is never stored in this browser.'
          : 'Development mode: accounts are held in memory for this browser session only and are cleared on reload.'}
        {' Creating an account does not enrol you in a program or cohort — enrolment is confirmed by the team.'}
      </p>
    </form>
  );
};

export default SignupForm;
