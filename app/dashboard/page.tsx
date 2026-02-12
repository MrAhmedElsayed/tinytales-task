'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

type DashboardUser = {
    name?: string;
    email?: string;
    mobile_country_code?: string;
    mobile?: string;
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<DashboardUser | null>(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = useCallback(async () => {
        const token = api.getToken();
        if (token) {
            try {
                await api.post('/auth/logout', {}, token);
            } catch (error) {
                console.error('Logout API failed', error);
            }
        }
        api.removeToken();
        localStorage.removeItem('tinytales_user');
        router.push('/');
    }, [router]);

    useEffect(() => {
        const token = api.getToken();
        if (!token) {
            router.push('/');
            return;
        }

        // Always fetch fresh data to be sure
        api.get<DashboardUser>('/auth/user-data', token).then(response => {
            if (response.status) {
                setUser(response.data ?? null);
                if (response.data) {
                    api.saveUser(response.data);
                }
            } else {
                // If token invalid, logout
                handleLogout();
            }
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, [handleLogout, router]);

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <main className="min-h-screen bg-[#f5f5f5] px-4 py-10">
            <div className="mx-auto max-w-[900px] rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-3xl font-semibold text-[#020202]">Dashboard</h1>
                <h2 className="mt-2 text-xl text-[#2d2d2d]">Welcome, {user?.name || 'User'}</h2>
                <p className="mt-4 text-[#575757]">Email: {user?.email}</p>
                <p className="text-[#575757]">Phone: {user?.mobile_country_code} {user?.mobile}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild className="h-10 rounded-lg bg-[#c29a93] px-5 text-white hover:bg-[#b48a83]">
                        <Link href="/product-details">Open Product Details UI</Link>
                    </Button>
                    <Button onClick={handleLogout} variant="secondary" className="h-10 rounded-lg">
                        Logout
                    </Button>
                </div>
            </div>
        </main>
    );
}
