'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip auth check for login page
        if (pathname === '/admin/login') {
            setLoading(false);
            return;
        }

        // Check admin session
        const adminAuth = localStorage.getItem('admin_authenticated');
        const sessionTime = localStorage.getItem('admin_session_time');

        if (adminAuth === 'true' && sessionTime) {
            // Check if session is less than 24 hours old
            const timeDiff = Date.now() - parseInt(sessionTime);
            if (timeDiff < 24 * 60 * 60 * 1000) {
                setIsAuthenticated(true);
            } else {
                // Session expired
                localStorage.removeItem('admin_authenticated');
                localStorage.removeItem('admin_session_time');
                router.push('/admin/login');
            }
        } else {
            router.push('/admin/login');
        }

        setLoading(false);
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    // Don't wrap login page with sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex h-screen bg-black">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
