import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Target } from "lucide-react";

interface ExamInfoProps {
    examId: string;
}

const examDetails: Record<string, {
    targetAudience: string[];
    curriculum: string[];
    benefits: string[];
}> = {
    cissp: {
        targetAudience: [
            "보안 컨설턴트",
            "보안 관리자",
            "IT 디렉터/관리자",
            "보안 시스템 엔지니어",
            "보안 분석가"
        ],
        curriculum: [
            "보안 및 위험 관리 (Security and Risk Management)",
            "자산 보안 (Asset Security)",
            "보안 아키텍처 및 엔지니어링 (Security Architecture and Engineering)",
            "통신 및 네트워크 보안 (Communication and Network Security)",
            "ID 및 액세스 관리 (Identity and Access Management)",
            "보안 평가 및 테스트 (Security Assessment and Testing)",
            "보안 운영 (Security Operations)",
            "소프트웨어 개발 보안 (Software Development Security)"
        ],
        benefits: [
            "정보 보안 분야에서 가장 권위 있는 자격증 중 하나입니다.",
            "글로벌 기업 및 정부 기관에서 고위 보안직 채용 시 우대합니다.",
            "보안 전반에 대한 깊이 있는 지식과 관리 능력을 증명할 수 있습니다.",
            "연봉 협상 및 승진에 유리한 고지를 점할 수 있습니다."
        ]
    },
    cism: {
        targetAudience: ["정보 보안 관리자", "IT 위험 관리자", "IT 준수 담당자"],
        curriculum: ["정보 보안 거버넌스", "정보 위험 관리", "정보 보안 프로그램 개발 및 관리", "정보 보안 사고 관리"],
        benefits: ["관리자급 보안 전문가에게 필수적인 자격증입니다.", "비즈니스 목표와 보안을 연계하는 능력을 입증합니다."]
    },
    cisa: {
        targetAudience: ["IS/IT 감사인", "IS/IT 컨설턴트", "보안 전문가"],
        curriculum: ["정보 시스템 감사 프로세스", "IT 거버넌스 및 관리", "정보 시스템 습득, 개발 및 구현", "정보 시스템 운영 및 비즈니스 탄력성", "정보 자산 보호"],
        benefits: ["IT 감사 분야의 국제 표준 자격증입니다.", "회계법인 및 대기업 감사팀에서 선호합니다."]
    },
    cppg: {
        targetAudience: ["개인정보 보호 담당자", "IT 기획/운영자", "법무/컴플라이언스 담당자"],
        curriculum: ["개인정보 보호의 이해", "개인정보 보호 제도", "개인정보 라이프사이클 관리", "개인정보의 보호 조치", "개인정보 관리체계"],
        benefits: ["국내 개인정보 보호 법규(개인정보보호법 등)에 특화되어 있습니다.", "공공기관 및 기업의 CPO/CISO 지정 요건에 활용됩니다."]
    },
    cia: {
        targetAudience: ["내부 감사인", "위험 관리 전문가"],
        curriculum: ["내부 감사 기초", "내부 감사 실무", "내부 감사 지식 (재무, IT 등)"],
        benefits: ["세계 유일의 국제 공인 내부 감사사 자격증입니다.", "경영, 리스크 관리, 통제에 대한 전문성을 인정받습니다."]
    }
};

export function ExamInfo({ examId }: ExamInfoProps) {
    const details = examDetails[examId] || examDetails.cissp; // Default to CISSP if not found

    return (
        <div className="space-y-12 py-12">
            {/* Target Audience */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="text-blue-500" />
                    응시 대상
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {details.targetAudience.map((item, idx) => (
                        <Card key={idx} className="bg-[#1a1a1a] border-gray-800 text-gray-200">
                            <CardContent className="p-4 flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Curriculum */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="text-purple-500" />
                    학습 내용 (도메인)
                </h2>
                <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden">
                    <div className="p-6 grid gap-4">
                        {details.curriculum.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors border-b border-gray-800 last:border-0">
                                <span className="bg-purple-900/50 text-purple-200 text-xs font-bold px-2 py-1 rounded">Domain {idx + 1}</span>
                                <span className="text-gray-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">
                    자격증 취득 혜택
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {details.benefits.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start p-6 bg-gradient-to-br from-[#1a1a1a] to-black border border-gray-800 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold">
                                {idx + 1}
                            </div>
                            <p className="text-gray-300 leading-relaxed pt-1">{item}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
