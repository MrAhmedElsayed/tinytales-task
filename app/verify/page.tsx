'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { AuthShell } from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api, getApiErrorMessage } from '@/lib/api';

type UserData = {
  name?: string;
  email?: string;
  mobile_country_code?: string;
  mobile?: string;
};

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const storedToken = api.getToken();
    if (!storedToken) {
      router.push('/');
      return;
    }

    setToken(storedToken);
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');
    setLoading(true);

    try {
      if (!token) {
        setError('Please login or register first.');
        return;
      }

      const response = await api.post('/auth/verify-email', { code }, token);
      if (response.status) {
        const userResponse = await api.get<UserData>('/auth/user-data', token);
        if (userResponse.status && userResponse.data) {
          api.saveUser(userResponse.data);
        }
        router.push('/dashboard');
      } else {
        setError(getApiErrorMessage(response, 'Verification failed. Try again.'));
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'An unexpected error occurred during verification.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setStatusMessage('');
    setResending(true);

    try {
      if (!token) {
        setError('Please login or register first.');
        return;
      }

      const response = await api.post('/auth/verify-email/resend-code', {}, token);
      if (response.status) {
        setStatusMessage('A new verification code has been sent successfully.');
      } else {
        setError(getApiErrorMessage(response, 'Resend failed. Please try again.'));
      }
    } catch (resendError) {
      setError(
        resendError instanceof Error
          ? resendError.message
          : 'An unexpected error occurred while resending the code.'
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthShell
      panelTitle="One final step to activate your account."
      panelDescription="Enter your verification code and continue to your personalized Tinytales dashboard."
      className="lg:pt-12"
    >
      <div className="w-full max-w-[470px]">
        <h1 className="text-3xl font-semibold text-[#111] sm:text-[50px] sm:leading-[1.04]">
          Verify your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter the 6-digit verification code. Test code:{' '}
          <span className="font-semibold text-[#3b3b3b]">123456</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="code" className="block text-sm font-medium text-[#2e2e2e]">
              Verification Code
            </label>
            <Input
              id="code"
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4 tracking-[0.22em]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}
          {statusMessage ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {statusMessage}
            </p>
          ) : null}

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
              disabled={resending}
              className="h-10 w-full rounded-xl border-[#d9d5cf] bg-white text-[#2f2f2f] hover:bg-[#f7f6f4]"
            >
              {resending ? 'Resending...' : 'Resend Code'}
            </Button>
          </div>
        </form>

        <p className="mt-5 text-sm text-muted-foreground">
          Back to{' '}
          <Link
            href="/"
            className="font-medium text-[#8b5e55] transition-colors hover:text-[#6f473f] hover:underline"
          >
            login
          </Link>
          {' or '}
          <Link
            href="/register"
            className="font-medium text-[#8b5e55] transition-colors hover:text-[#6f473f] hover:underline"
          >
            create account
          </Link>
          .
        </p>
      </div>
    </AuthShell>
  );
}
