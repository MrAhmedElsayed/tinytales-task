'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      if (response.status) {
        api.saveToken(response.data.token);
        api.saveUser(response.data); // Save full user object
        router.push('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10">
      <div className="mx-auto w-full max-w-[440px] rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold text-[#020202]">Login</h1>
        <p className="mt-2 text-sm text-[#686868]">Sign in to continue to your dashboard.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-[#444]">Email</label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-[#444]">Password</label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="h-10 w-full rounded-lg bg-[#c29a93] text-white hover:bg-[#b48a83]">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="mt-5 text-sm text-[#686868]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-[#8b5e55] underline underline-offset-4">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
