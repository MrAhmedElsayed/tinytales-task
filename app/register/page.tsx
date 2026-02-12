'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';

import { AuthShell } from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api, getApiErrorMessage } from '@/lib/api';

type RegisterResponseData = {
  token: string;
  name?: string;
  email?: string;
  mobile_country_code?: string;
  mobile?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    mobile_country_code: '971',
    password: '',
    password_confirmation: '',
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
      const response = await api.post<RegisterResponseData>('/auth/register', formData);
      if (response.status && response.data?.token) {
        api.saveToken(response.data.token);
        api.saveUser(response.data);
        router.push('/verify');
      } else {
        setError(getApiErrorMessage(response, 'Registration failed. Please review your data.'));
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'An unexpected error occurred during registration.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      panelTitle="Create your account and start shopping with confidence."
      panelDescription="Register once, verify your account, and manage everything from your Tinytales dashboard."
      className="lg:pt-6"
      logoSize="large"
    >
      <div className="w-full max-w-[560px]">
        <h1 className="text-3xl font-semibold text-[#111] sm:text-[46px] sm:leading-[1.06]">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Fill in your details to register.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-[#2e2e2e]">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4"
              autoComplete="name"
              required
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
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
            <label
              htmlFor="mobile_country_code"
              className="block text-sm font-medium text-[#2e2e2e]"
            >
              Country Code
            </label>
            <Input
              id="mobile_country_code"
              name="mobile_country_code"
              type="text"
              value={formData.mobile_country_code}
              onChange={handleChange}
              placeholder="971"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4"
              inputMode="numeric"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="mobile" className="block text-sm font-medium text-[#2e2e2e]">
              Phone Number
            </label>
            <Input
              id="mobile"
              name="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="0501231100"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4"
              inputMode="tel"
              autoComplete="tel"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-[#2e2e2e]">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-[#2e2e2e]"
            >
              Confirm Password
            </label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Repeat password"
              className="h-10 rounded-xl border-[#d9d5cf] bg-[#fcfbfa] px-4"
              autoComplete="new-password"
              required
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 sm:col-span-2">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 sm:col-span-2"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/"
            className="font-medium text-[#8b5e55] transition-colors hover:text-[#6f473f] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
