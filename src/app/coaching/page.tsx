import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Calendar, User, Video, MessageSquare } from 'lucide-react'

export default function CoachingPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="py-24 px-4 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">1:1 커리어 코칭</h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        현업 최고의 보안 전문가와 함께 당신의 커리어 로드맵을 설계하세요.<br />
                        이력서 첨삭부터 모의 면접까지, A to Z 케어해드립니다.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                        {[
                            { icon: <User />, title: "전담 멘토 배정", desc: "희망 직무에 맞는 네이버/카카오/라인 출신 멘토" },
                            { icon: <Video />, title: "심층 화상 코칭", desc: "월 4회, 회당 60분 심도 있는 커리어 상담" },
                            { icon: <MessageSquare />, title: "무제한 Q&A", desc: "슬랙을 통한 실시간 질의응답 지원" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10">
                                <div className="bg-blue-600/20 text-blue-400 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-12 py-6 rounded-full">
                        코칭 신청하기 (대기열 등록)
                    </Button>
                </section>
            </main>
            <Footer />
        </div>
    )
}
