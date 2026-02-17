"use client";

import { ExamInterface } from "@/components/exam-interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ExamPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center shadow-sm">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    대시보드로 돌아가기
                </Link>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">홍길동</p>
                        <p className="text-xs text-slate-500">수험번호: 882910</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                        홍
                    </div>
                </div>
            </div>

            <main className="py-8">
                <ExamInterface />
            </main>
        </div>
    );
}
