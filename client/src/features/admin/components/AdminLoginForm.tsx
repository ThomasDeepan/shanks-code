import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, LogIn, AlertCircle, Lock, Mail, ArrowLeft } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/services/api/errors';
import { apiConfig } from '@/services/api/config';

/**
 * AdminLoginForm
 * Administrator authentication — a deliberately separate entry point from the
 * Student Portal.
 *
 * Verification of the administrator role is performed by the backend
 * (`POST /api/auth/admin/login`). No credential, key or role list is embedded in
 * this component.
 */

export const AdminLoginForm: React.FC = () => {
  const { loginAsAdmin, clearSessionExpiredMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath =
    (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearSessionExpiredMessage();

    const nextErrors: typeof errors = {};
    if (!email.trim()) nextErrors.email = 'Administrator email is required.';
    if (!password) nextErrors.password = 'Password is required.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await loginAsAdmin({ email: email.trim(), password });
      setPassword('');
      navigate(fromPath, { replace: true });
    } catch (err: unknown) {
      setErrors((prev) => ({
        ...prev,
        form:
          err instanceof ApiError
            ? err.userMessage
            : err instanceof Error
            ? err.message
            : 'Administrator sign-in failed.',
      }));
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
        label="Administrator Email"
        type="email"
        name="admin-email"
        id="admin-email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        placeholder="admin@shankscode.com"
        leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
        disabled={isSubmitting}
      />

      <Input
        label="Password"
        type="password"
        name="admin-password"
        id="admin-password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        error={errors.password}
        placeholder="••••••••••••"
        leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isSubmitting}
        leftIcon={<LogIn className="h-4 w-4" aria-hidden="true" />}
      >
        Sign in to Administration
      </Button>

      <p className="flex items-start gap-2 rounded-lg border border-[#D3DAE6] bg-[#EEF1F6] p-3 text-[11px] leading-relaxed text-[#5F5A50]">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1B2A4A]" aria-hidden="true" />
        <span>
          {apiConfig.isLive
            ? 'Credentials are verified server-side. Access attempts are logged and unauthorised accounts are rejected by the API.'
            : 'Development mode: the administrator role is granted locally for interface review. Production sign-in is enforced by the backend.'}
        </span>
      </p>

      <Link
        to="/login"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B2A4A] underline decoration-[#D9A62B] decoration-2 underline-offset-2 hover:text-[#2F4368] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Student sign in
      </Link>
    </form>
  );
};

export default AdminLoginForm;
