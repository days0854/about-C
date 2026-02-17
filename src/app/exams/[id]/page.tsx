import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Clock, CreditCard, ChevronDown, PlayCircle } from 'lucide-react';
import { ExamInfo } from '@/components/exam/exam-info';
import Link from 'next/link';

// We need a client component wrapper for state management of payment selection
import ExamPurchaseClient from './client';

interface ExamPageProps {
    params: {
        id: string;
    };
}

// Mock data strictly for display until DB is populated
const examData: Record<string, { title: string; description: string }> = {
    cissp: {
        title: 'CISSP',
        description: 'Certified Information Systems Security Professional. 정보 보안 전문가를 위한 최고의 자격증입니다.',
    },
    cism: {
        title: 'CISM',
        description: 'Certified Information Security Manager. 정보 보안 관리자를 위한 핵심 자격증입니다.',
    },
    cisa: {
        title: 'CISA',
        description: 'Certified Information Systems Auditor. 정보 시스템 감사 전문가를 위한 필수 자격증입니다.',
    },
    cppg: {
        title: 'CPPG',
        description: '개인정보 관리사. 개인정보 보호법 및 관련 법규에 대한 이해를 평가합니다.',
    },
    cia: {
        title: 'CIA',
        description: 'Certified Internal Auditor. 국제 공인 내부 감사사 자격증입니다.',
    },
};

export default async function ExamDetailPage({ params }: ExamPageProps) {
    const { id } = await params;
    const exam = examData[id];

    if (!exam) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Header */}
            <div className="relative py-24 bg-gradient-to-b from-[#111111] to-black border-b border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                        {exam.title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {exam.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 text-lg">
                            <Link href={`/exams/${id}/test/sample`}>
                                <PlayCircle className="w-5 h-5 mr-2" />
                                무료 샘플 테스트 응시
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 px-8 h-12 text-lg">
                            <Link href="#purchase">
                                <CreditCard className="w-5 h-5 mr-2" />
                                이용권 구매
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Main Content Area */}
                <div className="max-w-4xl mx-auto">
                    {/* Exam Information Component */}
                    <ExamInfo examId={id} />

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-16" />

                    {/* Purchase Section */}
                    <section id="purchase" className="py-12 scroll-mt-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
                            <p className="text-gray-400">
                                합리적인 가격으로 자격증 취득을 준비할 수 있습니다.
                            </p>
                        </div>

                        <ExamPurchaseClient examTitle={exam.title} />
                    </section>
                </div>
            </div>
        </div>
    );
}
