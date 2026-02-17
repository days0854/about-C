import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Timer, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: {
        id: string;
    }
}

export default async function SampleTestPage({ params }: PageProps) {
    const { id } = await params;
    return (
        <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
            <div className="max-w-2xl w-full">
                <Link href={`/exams/${id}`} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    시험 상세 페이지로 돌아가기
                </Link>

                <Card className="bg-[#111111] border-gray-800 text-white">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto bg-blue-900/20 p-4 rounded-full mb-4 w-fit">
                            <Timer className="w-12 h-12 text-blue-500" />
                        </div>
                        <CardTitle className="text-3xl font-bold mb-2">샘플 테스트 (준비 중)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6 pt-4">
                        <p className="text-gray-400 text-lg">
                            현재 {id.toUpperCase()} 샘플 테스트 문항을 준비하고 있습니다.<br />
                            곧 공개될 예정입니다.
                        </p>

                        <div className="bg-yellow-900/20 border border-yellow-900/50 p-4 rounded-lg flex items-start gap-3 text-left">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-yellow-500/90">
                                <span className="font-bold block mb-1">알림</span>
                                실제 시험과 동일한 환경에서 10~20문항을 미리 풀어볼 수 있는 기능입니다.
                            </div>
                        </div>

                        <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-8">
                            <Link href={`/exams/${id}`}>확인</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
