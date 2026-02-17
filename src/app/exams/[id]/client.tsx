'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Clock, CreditCard, ChevronLeft } from 'lucide-react';
import { TossPaymentWidget } from '@/components/payment/toss-widget';

interface ExamPurchaseClientProps {
    examTitle: string;
}

export default function ExamPurchaseClient({ examTitle }: ExamPurchaseClientProps) {
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number } | null>(null);

    const plans = [
        { id: 'count_1', name: '1 Set (100문제)', amount: 5000, type: 'count', description: '한 번의 모의고사 기회' },
        { id: 'count_10', name: '10 Sets (1,000문제)', amount: 30000, type: 'count', description: '충분한 연습 기회 (40% 할인)' },
        { id: 'period_1', name: '1개월 무제한', amount: 30000, type: 'period', description: '단기 집중 완성' },
        { id: 'period_3', name: '3개월 무제한', amount: 50000, type: 'period', description: '여유로운 학습 (45% 할인)' },
    ];

    if (selectedPlan) {
        return (
            <div className="max-w-2xl mx-auto">
                <Button variant="ghost" onClick={() => setSelectedPlan(null)} className="mb-4 text-gray-400 hover:text-white pl-0">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    다른 상품 선택하기
                </Button>
                <Card className="bg-[#111111] border-gray-800 text-white">
                    <CardHeader>
                        <CardTitle>결제하기</CardTitle>
                        <CardDescription className="text-gray-400">
                            {examTitle} - {selectedPlan.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 pb-6 border-b border-gray-800">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>결제 금액</span>
                                <span className="text-blue-400">{selectedPlan.amount.toLocaleString()}원</span>
                            </div>
                        </div>

                        <TossPaymentWidget amount={selectedPlan.amount} orderName={`${examTitle} - ${selectedPlan.name}`} />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Count-based Plan */}
            <Card className="bg-[#111111] border-gray-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Check className="w-24 h-24" />
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl">횟수권 (Practice Sets)</CardTitle>
                    <CardDescription className="text-gray-400">
                        원하는 만큼 연습하세요. 시간 제한이 없습니다.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {plans.filter(p => p.type === 'count').map(plan => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan)}
                                className="flex justify-between items-center p-4 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/10 transition-all cursor-pointer"
                            >
                                <div>
                                    <div className="font-bold text-lg">{plan.name}</div>
                                    <div className="text-sm text-gray-400">{plan.description}</div>
                                </div>
                                <div className="text-xl font-bold text-blue-400">{plan.amount.toLocaleString()}원</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Period-based Plan */}
            <Card className="bg-[#111111] border-gray-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Clock className="w-24 h-24" />
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl">기간권 (Unlimited Pass)</CardTitle>
                    <CardDescription className="text-gray-400">
                        정해진 기간 동안 무제한으로 응시하세요.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {plans.filter(p => p.type === 'period').map(plan => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan)}
                                className="flex justify-between items-center p-4 border border-gray-800 rounded-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all cursor-pointer"
                            >
                                <div>
                                    <div className="font-bold text-lg">{plan.name}</div>
                                    <div className="text-sm text-gray-400">{plan.description}</div>
                                </div>
                                <div className="text-xl font-bold text-purple-400">{plan.amount.toLocaleString()}원</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
