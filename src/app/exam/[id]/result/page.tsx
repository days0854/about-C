'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { CISA_EXAM, Exam } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts'
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react'

interface ExamResult {
    examId: string;
    answers: Record<number, number>;
    timestamp: string;
    timeSpent: number;
}

export default function ExamResultPage() {
    const params = useParams()
    const router = useRouter()
    const [result, setResult] = useState<ExamResult | null>(null)
    const [exam, setExam] = useState<Exam>(CISA_EXAM) // Default to CISA for now

    useEffect(() => {
        // Load result from localStorage
        const savedResult = localStorage.getItem(`exam_result_${params.id}`)
        if (savedResult) {
            setResult(JSON.parse(savedResult))
        } else {
            // Redirect if no result found (optional)
            // router.push(`/exam/${params.id}`)
        }
    }, [params.id, router])

    if (!result) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">결과를 불러오는 중...</div>
    }

    // Calculate Score
    let correctCount = 0
    const domainScores: Record<string, { total: number, correct: number }> = {}

    exam.questions.forEach(q => {
        const isCorrect = result.answers[q.id] === q.answer
        if (isCorrect) correctCount++

        if (!domainScores[q.domain]) {
            domainScores[q.domain] = { total: 0, correct: 0 }
        }
        domainScores[q.domain].total++
        if (isCorrect) domainScores[q.domain].correct++
    })

    const score = Math.round((correctCount / exam.questions.length) * 100)
    const isPassed = score >= 70 // 70점 이상 합격 기준

    // Chart Data
    const chartData = Object.keys(domainScores).map(domain => ({
        subject: domain,
        A: Math.round((domainScores[domain].correct / domainScores[domain].total) * 100),
        fullMark: 100
    }))

    // Weakness Analysis
    const sortedDomains = [...chartData].sort((a, b) => a.A - b.A)
    const weakestDomain = sortedDomains[0]

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{exam.title} 결과 리포트</h1>
                        <p className="text-gray-400 text-sm mt-1">응시일: {new Date(result.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => router.push('/exams')}>목록으로</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push(`/exam/${exam.id}`)}>
                            <RotateCcw className="w-4 h-4 mr-2" /> 다시 풀기
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Score Card */}
                    <Card className={`bg-[#111] border-white/10 flex flex-col items-center justify-center py-8 ${isPassed ? 'border-green-500/50' : 'border-red-500/50'}`}>
                        <div className="text-center space-y-2">
                            <span className="text-gray-400 text-sm">종합 점수</span>
                            <div className={`text-6xl font-bold ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
                                {score}
                            </div>
                            <div className="text-lg font-bold text-white">
                                {isPassed ? '합격 (PASS)' : '불합격 (FAIL)'}
                            </div>
                            <p className="text-xs text-gray-500">합격 기준: 70점 이상</p>
                        </div>
                    </Card>

                    {/* Chart */}
                    <Card className="bg-[#111] border-white/10 md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-white">영역별 성취도 분석</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                    <PolarGrid stroke="#333" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="내 점수" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Analysis & Weakness */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-[#111] border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <AlertTriangle className="text-yellow-500" /> 취약점 분석
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-bold text-lg text-white mb-1">가장 취약한 영역</h4>
                                <p className="text-red-400 text-xl font-bold">{weakestDomain?.subject} ({weakestDomain?.A}점)</p>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                해당 영역에 대한 이해도가 부족합니다. 기본 개념을 다시 학습하고 관련 기출문제를 집중적으로 풀어보시는 것을 권장합니다.
                                특히 <strong>{weakestDomain?.subject}</strong> 분야는 실무에서도 중요하게 다뤄지므로 보완이 필요합니다.
                            </p>
                            <Button variant="link" className="text-blue-400 p-0 h-auto">
                                관련 강의 보러가기 <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#111] border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">학습 가이드</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>정답률 {score >= 80 ? '80% 이상으로 매우 우수합니다.' : '50% 이상으로 기초는 갖춰져 있습니다.'}</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    <span>시험 시간 {Math.floor(result.timeSpent / 60)}분 소요 ({Math.floor(result.timeSpent / 60) < 60 ? '빠른 편입니다' : '적절합니다'})</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Incorrect Answers Review */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold">오답 노트</h2>
                    {exam.questions.map((q, idx) => {
                        const userAnswer = result.answers[q.id]
                        if (userAnswer === q.answer) return null // Hide correct answers

                        return (
                            <Card key={q.id} className="bg-[#111] border-white/10">
                                <CardHeader>
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex gap-3">
                                            <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-bold h-fit">WRONG</span>
                                            <span className="text-blue-400 text-xs font-bold py-1 border border-blue-400/30 px-2 rounded h-fit">{q.domain}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg text-white mt-2 leading-relaxed">
                                        Q{idx + 1}. {q.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-red-950/30 border border-red-900/50">
                                            <p className="text-xs text-red-400 mb-1 font-bold">내가 고른 답</p>
                                            <p className="text-gray-300">{q.options[userAnswer] || "미응답"}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-green-950/30 border border-green-900/50">
                                            <p className="text-xs text-green-400 mb-1 font-bold">정답</p>
                                            <p className="text-gray-300">{q.options[q.answer]}</p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-900/10 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                                        <h4 className="font-bold text-blue-400 mb-1 text-sm">해설</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{q.explanation}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </section>
            </div>
        </div>
    )
}
