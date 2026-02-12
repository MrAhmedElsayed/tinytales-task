'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';

import { AuthShell } from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api, getApiErrorMessage } from '@/lib/api';

type LoginResponseData = {
  token: string;
  name?: string;
  email?: string;
  mobile_country_code?: string;
  mobile?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post<LoginResponseData>('/auth/login', formData);
      if (response.status && response.data?.token) {
        api.saveToken(response.data.token);
        api.saveUser(response.data);
        router.push('/dashboard');
      } else {
        setError(getApiErrorMessage(response, 'Login failed. Please check your details.'));
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'An unexpected error occurred during login.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      panelTitle="Your baby-care store in one secure place."
      panelDescription="Sign in to manage orders, explore products, and continue your Tinytales shopping journey."
    >
      <div className="w-full max-w-[490px]">
        <h1 className="text-3xl font-semibold text-[#111] sm:text-[54px] sm:leading-[1.02]">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Login to your Tinytales account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-[#2e2e2e]">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="m@example.com"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="password" className="block text-sm font-medium text-[#2e2e2e]">
                Password
              </label>
              <Link
                href="/verify"
                className="text-xs font-medium text-[#8b5e55] transition-colors hover:text-[#6f473f] hover:underline"
              >
                Need verification code?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4"
              autoComplete="current-password"
              required
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-[#8b5e55] transition-colors hover:text-[#6f473f] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
