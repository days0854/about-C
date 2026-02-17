'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    FileText,
    Settings,
    BarChart3,
    Shield,
    LogOut
} from 'lucide-react';

const navItems = [
    {
        title: '대시보드',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        title: '회원 관리',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: '결제 관리',
        href: '/admin/payments',
        icon: CreditCard,
    },
    {
        title: '콘텐츠 관리',
        href: '/admin/content',
        icon: FileText,
    },
    {
        title: '통계',
        href: '/admin/statistics',
        icon: BarChart3,
    },
    {
        title: '서버 설정',
        href: '/admin/settings',
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_session_time');
        window.location.href = '/admin/login';
    };

    return (
        <aside className="w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800 space-y-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    로그아웃
                </button>
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                >
                    ← 메인으로 돌아가기
                </Link>
            </div>
        </aside>
    );
}
