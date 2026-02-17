import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, TrendingUp, Users, FileText } from 'lucide-react';

export default async function AdminStatisticsPage() {
    const supabase = await createClient();

    // Fetch data for statistics
    const [
        { count: totalUsers },
        { count: totalQuestions },
        { data: purchases },
        { data: recentUsers }
    ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('questions').select('*', { count: 'exact', head: true }),
        supabase.from('purchases').select('*'),
        supabase.from('profiles').select('created_at').order('created_at', { ascending: false }).limit(30)
    ]);

    const totalRevenue = purchases?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const totalSales = purchases?.length || 0;

    // Group purchases by exam
    const examSales: Record<string, number> = {}
    purchases?.forEach(p => {
        const exam = p.exam_id || 'unknown'
        examSales[exam] = (examSales[exam] || 0) + (p.amount || 0)
    })

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">통계</h1>
                <p className="text-gray-400">플랫폼 데이터 분석 및 통계를 확인합니다</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#111111] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">총 회원 수</CardTitle>
                        <Users className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalUsers || 0}</div>
                    </CardContent>
                </Card>

                <Card className="bg-[#111111] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">총 문제 수</CardTitle>
                        <FileText className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalQuestions || 0}</div>
                    </CardContent>
                </Card>

                <Card className="bg-[#111111] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">총 판매 건수</CardTitle>
                        <BarChart2 className="w-4 h-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalSales}</div>
                    </CardContent>
                </Card>

                <Card className="bg-[#111111] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">총 매출</CardTitle>
                        <TrendingUp className="w-4 h-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">₩{totalRevenue.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Exam Sales Breakdown */}
            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">시험별 매출</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Object.entries(examSales).map(([exam, revenue]) => (
                            <div key={exam} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-900/30 rounded flex items-center justify-center text-blue-400 font-bold">
                                        {exam.toUpperCase().slice(0, 2)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{exam.toUpperCase()}</div>
                                        <div className="text-sm text-gray-400">시험</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-white">₩{revenue.toLocaleString()}</div>
                                    <div className="text-sm text-gray-400">매출</div>
                                </div>
                            </div>
                        ))}
                        {Object.keys(examSales).length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                판매 데이터가 없습니다.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">최근 가입 추이</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-gray-400">
                        최근 30일간 {recentUsers?.length || 0}명의 신규 회원이 가입했습니다.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
