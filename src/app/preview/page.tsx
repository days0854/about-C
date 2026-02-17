"use client";

import { useState } from "react";
import { CertificatePreview } from "@/components/certificate-preview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ClientHeader } from "@/components/layout/client-header";
import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";

export default function PreviewPage() {
    const [data, setData] = useState({
        recipientName: "홍길동",
        courseTitle: "고급 인공지능 과정",
        completionDate: "2025년 10월 24일",
        issuerName: "안티그래비티 아카데미",
        certificateId: "CERT-123456789",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <ClientHeader />
            <div className="min-h-screen bg-slate-50 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            홈으로 돌아가기
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Controls */}
                        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
                            <h2 className="text-xl font-semibold mb-4 text-slate-800">수료증 편집</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="recipientName">수료자 이름</Label>
                                    <Input
                                        id="recipientName"
                                        name="recipientName"
                                        value={data.recipientName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="courseTitle">과정명</Label>
                                    <Input
                                        id="courseTitle"
                                        name="courseTitle"
                                        value={data.courseTitle}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="completionDate">수료일</Label>
                                    <Input
                                        id="completionDate"
                                        name="completionDate"
                                        value={data.completionDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="issuerName">발급 기관/장</Label>
                                    <Input
                                        id="issuerName"
                                        name="issuerName"
                                        value={data.issuerName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="certificateId">자격증 ID</Label>
                                    <Input
                                        id="certificateId"
                                        name="certificateId"
                                        value={data.certificateId}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 space-y-2">
                                <Button className="w-full gap-2" onClick={() => window.print()}>
                                    <Printer className="w-4 h-4" />
                                    인쇄 / PDF 저장
                                </Button>
                                <Button variant="outline" className="w-full gap-2">
                                    <Download className="w-4 h-4" />
                                    Download PNG
                                </Button>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="lg:col-span-2 flex justify-center items-start">
                            <CertificatePreview data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
