import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, FileText, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch statistics
    const [
        { count: usersCount },
        { count: questionsCount },
        { count: purchasesCount },
        { data: totalRevenue }
    ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('questions').select('*', { count: 'exact', head: true }),
        supabase.from('purchases').select('*', { count: 'exact', head: true }),
        supabase.from('purchases').select('amount')
    ]);

    const revenue = totalRevenue?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    const stats = [
        {
            title: '총 회원 수',
            value: usersCount || 0,
            icon: Users,
            color: 'text-blue-500'
        },
        {
            title: '총 문제 수',
            value: questionsCount || 0,
            icon: FileText,
            color: 'text-green-500'
        },
        {
            title: '총 판매 건수',
            value: purchasesCount || 0,
            icon: CreditCard,
            color: 'text-purple-500'
        },
        {
            title: '총 매출',
            value: `₩${revenue.toLocaleString()}`,
            icon: TrendingUp,
            color: 'text-yellow-500'
        }
    ];

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">대시보드</h1>
                <p className="text-gray-400">플랫폼 전체 현황을 한눈에 확인하세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="bg-[#111111] border-gray-800">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`w-4 h-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">빠른 작업</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/exams" className="p-4 bg-blue-900/20 hover:bg-blue-900/30 rounded-lg border border-blue-900/50 transition-colors text-center">
                        <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">문제 업로드</p>
                    </Link>
                    <a href="/admin/users" className="p-4 bg-green-900/20 hover:bg-green-900/30 rounded-lg border border-green-900/50 transition-colors text-center">
                        <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">회원 관리</p>
                    </a>
                    <a href="/admin/payments" className="p-4 bg-purple-900/20 hover:bg-purple-900/30 rounded-lg border border-purple-900/50 transition-colors text-center">
                        <CreditCard className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">결제 내역</p>
                    </a>
                    <a href="/admin/settings" className="p-4 bg-yellow-900/20 hover:bg-yellow-900/30 rounded-lg border border-yellow-900/50 transition-colors text-center">
                        <TrendingUp className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">서버 설정</p>
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}
