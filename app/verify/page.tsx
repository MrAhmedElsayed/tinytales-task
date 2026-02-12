'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function VerifyPage() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = api.getToken();
        if (!t) {
            router.push('/');
        } else {
            setToken(t);
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!token) throw new Error('No token found');

            const response = await api.post('/auth/verify-email', { code }, token);
            if (response.status) {
                // Redirection logic can be complex if we need user data first, 
                // but for now, we follow the plan to redirect to dashboard.
                router.push('/dashboard');
            } else {
                setError(response.message || 'Verification failed');
            }
        } catch {
            setError('An error occurred during verification');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        try {
            if (!token) throw new Error('No token found');
            const response = await api.post('/auth/verify-email/resend-code', {}, token);
            if (response.status) {
                alert('Code resent successfully');
            } else {
                setError(response.message || 'Resend failed');
            }
        } catch {
            setError('An error occurred while resending code');
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] px-4 py-10">
            <div className="mx-auto w-full max-w-[440px] rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-3xl font-semibold text-[#020202]">Verify Account</h1>
                <p className="mt-2 text-sm text-[#686868]">
                    Enter the verification code sent to your email/mobile. Test code: <span className="font-semibold">123456</span>
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="code" className="mb-1 block text-sm text-[#444]">Verification Code</label>
                        <Input
                            id="code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            placeholder="123456"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <Button type="submit" disabled={loading} className="h-10 w-full rounded-lg bg-[#c29a93] text-white hover:bg-[#b48a83]">
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                </form>

                <Button onClick={handleResend} variant="secondary" className="mt-3 h-10 w-full rounded-lg">
                    Resend code
                </Button>
            </div>
        </div>
    );
}
