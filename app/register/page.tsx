'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        mobile_country_code: '',
        password: '',
        password_confirmation: '',
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
            const response = await api.post('/auth/register', formData);
            if (response.status) {
                // Save token even after register to allow verification
                api.saveToken(response.data.token);
                router.push('/verify');
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch {
            setError('An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] px-4 py-10">
            <div className="mx-auto w-full max-w-[520px] rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-3xl font-semibold text-[#020202]">Register</h1>
                <p className="mt-2 text-sm text-[#686868]">Create an account to access your dashboard.</p>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="mb-1 block text-sm text-[#444]">Full Name</label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="mb-1 block text-sm text-[#444]">Email</label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="mobile_country_code" className="mb-1 block text-sm text-[#444]">Country Code</label>
                        <Input
                            id="mobile_country_code"
                            type="text"
                            name="mobile_country_code"
                            value={formData.mobile_country_code}
                            onChange={handleChange}
                            required
                            placeholder="971"
                        />
                    </div>

                    <div>
                        <label htmlFor="mobile" className="mb-1 block text-sm text-[#444]">Phone Number</label>
                        <Input
                            id="mobile"
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
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
                        />
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="mb-1 block text-sm text-[#444]">Confirm Password</label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

                    <Button type="submit" disabled={loading} className="sm:col-span-2 h-10 rounded-lg bg-[#c29a93] text-white hover:bg-[#b48a83]">
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <p className="mt-5 text-sm text-[#686868]">
                    Already have an account?{' '}
                    <Link href="/" className="font-medium text-[#8b5e55] underline underline-offset-4">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
