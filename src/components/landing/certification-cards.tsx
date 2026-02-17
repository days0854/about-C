import { Shield, Lock, FileCheck, Ribbon, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

const certifications = [
    {
        id: "cissp",
        title: "CISSP",
        subtitle: "국제 공인 정보 시스템 보안 전문가",
        description: "정보 보안의 골드 스탠다드입니다. 보안 및 위험 관리, 자산 보안 등 8개 도메인을 다룹니다.",
        icon: Shield,
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        borderColor: "border-purple-400/20",
    },
    {
        id: "cism",
        title: "CISM",
        subtitle: "국제 공인 정보 보안 관리자",
        description: "엔터프라이즈 보안을 위한 관리, 리스크 관리 및 사고 대응에 초점을 맞춥니다.",
        icon: Lock,
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        borderColor: "border-blue-400/20",
    },
    {
        id: "cisa",
        title: "CISA",
        subtitle: "국제 공인 정보 시스템 감사사",
        description: "정보 시스템 감사, 통제 및 보안 전문가를 위한 세계적인 표준 자격증입니다.",
        icon: FileCheck,
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/20",
    },
    {
        id: "cppg",
        title: "CPPG",
        subtitle: "개인정보 관리사",
        description: "개인정보 보호법 및 관련 컴플라이언스에 특화된 실무 중심의 자격증입니다.",
        icon: Ribbon,
        color: "text-orange-400",
        bgColor: "bg-orange-400/10",
        borderColor: "border-orange-400/20",
    },
    {
        id: "cia",
        title: "CIA",
        subtitle: "국제 공인 내부 감사사",
        description: "전 세계적으로 유일하게 인정받는 내부 감사 전문 자격증입니다.",
        icon: Globe,
        color: "text-pink-400",
        bgColor: "bg-pink-400/10",
        borderColor: "border-pink-400/20",
    },
];

export function CertificationCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-7xl mx-auto px-4 z-20 relative -mt-32">
            {certifications.map((cert) => (
                <Link href={`/exams/${cert.id}`} key={cert.id} className="block group">
                    <Card
                        className="bg-[#111111]/90 backdrop-blur-sm border-white/10 text-white hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-xl h-full"
                    >
                        <CardHeader className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-xl ${cert.bgColor}`}>
                                    <cert.icon className={`w-6 h-6 ${cert.color}`} />
                                </div>
                                <Badge variant="outline" className="border-white/10 text-gray-400 font-normal">
                                    보안
                                </Badge>
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-bold">{cert.title}</CardTitle>
                                <div className="text-xs text-gray-400 font-medium">{cert.subtitle}</div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                {cert.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
