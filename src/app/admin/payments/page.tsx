import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export default async function AdminPaymentsPage() {
    const supabase = await createClient();

    const { data: payments } = await supabase
        .from('purchases')
        .select(`
      *,
      profiles (
        email,
        full_name
      )
    `)
        .order('created_at', { ascending: false });

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">결제 관리</h1>
                    <p className="text-gray-400">결제 내역 및 상태를 관리합니다</p>
                </div>
                <div className="text-sm text-gray-400">
                    총 {payments?.length || 0}건
                </div>
            </div>

            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <CreditCard className="w-5 h-5" />
                        결제 내역
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left p-3 text-gray-400 font-medium">회원</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">시험</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">상품 유형</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">금액</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">상태</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">결제일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments?.map((payment) => (
                                    <tr key={payment.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                                        <td className="p-3 text-gray-300">
                                            {payment.profiles?.full_name || payment.profiles?.email || '-'}
                                        </td>
                                        <td className="p-3 text-gray-300">
                                            {payment.exam_id?.toUpperCase() || '-'}
                                        </td>
                                        <td className="p-3 text-gray-300">
                                            {payment.purchase_type === 'count' ? '횟수권' : '기간권'}
                                        </td>
                                        <td className="p-3 text-gray-300 font-medium">
                                            ₩{payment.amount?.toLocaleString() || 0}
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${payment.status === 'completed'
                                                    ? 'bg-green-900/30 text-green-400'
                                                    : payment.status === 'pending'
                                                        ? 'bg-yellow-900/30 text-yellow-400'
                                                        : 'bg-red-900/30 text-red-400'
                                                }`}>
                                                {payment.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-400 text-sm">
                                            {new Date(payment.created_at).toLocaleDateString('ko-KR')}
                                        </td>
                                    </tr>
                                ))}
                                {!payments || payments.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">
                                            결제 내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
