import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { CheckCircle2, Trophy, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ExamsPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-20 px-4 text-center border-b border-white/10">
                    <div className="container mx-auto max-w-4xl space-y-6">
                        <h1 className="text-5xl font-bold text-white tracking-tight">
                            실전 모의고사 <span className="text-blue-500">Mastery</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            실제 시험 환경과 가장 유사한 모의고사로 확실하게 합격하세요.<br />
                            최신 출제 경향을 완벽하게 반영했습니다.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                                시험 응시하기
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8">
                                무료 샘플 보기
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 px-4 bg-[#0a0a0a]">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-white text-center mb-16">
                            왜 AboutAcademy 모의고사인가요?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: <Zap className="w-8 h-8 text-yellow-500" />,
                                    title: "합리적인 가격",
                                    desc: "타사 대비 50% 저렴한 비용으로 최고의 퀄리티를 경험하세요."
                                },
                                {
                                    icon: <Trophy className="w-8 h-8 text-blue-500" />,
                                    title: "높은 적중률",
                                    desc: "현직 보안 전문가가 직접 출제하여 실제 시험 적중률 90% 이상."
                                },
                                {
                                    icon: <Clock className="w-8 h-8 text-green-500" />,
                                    title: "실시간 결과 분석",
                                    desc: "시험 종료 즉시 상세한 해설과 함께 성적 분석 리포트를 제공합니다."
                                },
                                {
                                    icon: <CheckCircle2 className="w-8 h-8 text-purple-500" />,
                                    title: "최신 경향 반영",
                                    desc: "매월 업데이트되는 문제은행으로 항상 최신 트렌드를 학습하세요."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
                                    <div className="mb-4 bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Courses Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-5xl">
                        <h2 className="text-3xl font-bold text-white mb-12">주요 모의고사 과정</h2>
                        <div className="space-y-4">
                            {[
                                { title: "CISA (정보시스템감사사)", level: "Advanced", price: "₩49,000", badge: "Best" },
                                { title: "CISSP (정보시스템보안전문가)", level: "Expert", price: "₩89,000", badge: "New" },
                                { title: "CPPG (개인정보관리사)", level: "Beginner", price: "₩29,000", badge: "Popular" },
                            ].map((course, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-[#111] p-6 rounded-xl border border-white/10 hover:bg-[#1a1a1a] transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-blue-900/20 text-blue-400 px-3 py-1 rounded text-xs font-mono font-bold uppercase">
                                            {course.badge}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">난이도: {course.level}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-xl font-bold text-white">{course.price}</span>
                                        <Button variant="outline" className="border-white/20 hover:bg-blue-600 hover:text-white hover:border-transparent">
                                            신청하기
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
