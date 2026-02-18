'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, AlertCircle } from 'lucide-react'

// Question Data
const QUESTIONS = [
    // CISA (1-2)
    {
        id: 1,
        category: 'CISA',
        question: '다음 중 IS 감사인이 감사 업무를 수행할 때 가장 먼저 수행해야 하는 절차는?',
        options: ['감사 보고서 작성', '감사 범위 및 목적 설정', '취약점 보완 조치', '경영진 인터뷰'],
        answer: 1
    },
    {
        id: 2,
        category: 'CISA',
        question: 'DRP(재해 복구 계획) 테스트의 주요 목적은 무엇인가?',
        options: ['비용 절감', '시스템 성능 향상', '복구 절차의 유효성 검증', '직원 감시'],
        answer: 2
    },
    // CISSP (3-4)
    {
        id: 3,
        category: 'CISSP',
        question: 'CIA 삼각정(CIA Triad)에 포함되지 않는 것은?',
        options: ['기밀성 (Confidentiality)', '무결성 (Integrity)', '가용성 (Availability)', '인증 (Authentication)'],
        answer: 3
    },
    {
        id: 4,
        category: 'CISSP',
        question: '대칭키 암호화 방식에 대한 설명으로 옳은 것은?',
        options: ['암호화 키와 복호화 키가 다르다.', '키 분배 문제가 발생하지 않는다.', '처리 속도가 빠르다.', '전자 서명에 주로 사용된다.'],
        answer: 2
    },
    // CISM (5-6)
    {
        id: 5,
        category: 'CISM',
        question: '정보보안 거버넌스의 가장 핵심적인 목표는?',
        options: ['모든 위협 제거', '비즈니스 목표와 보안 전략의 연계', '최신 방화벽 도입', '보안 예산 삭감'],
        answer: 1
    },
    {
        id: 6,
        category: 'CISM',
        question: 'RTO(목표 복구 시간)가 짧을수록 의미하는 바는?',
        options: ['복구 비용이 증가한다.', '허용 가능한 데이터 손실이 크다.', '재해 발생 가능성이 낮다.', '백업 주기가 길어진다.'],
        answer: 0
    },
    // CPPG (7-8)
    {
        id: 7,
        category: 'CPPG',
        question: '개인정보보호법상 고유식별정보에 해당하지 않는 것은?',
        options: ['주민등록번호', '여권번호', '운전면허번호', '휴대전화번호'],
        answer: 3
    },
    {
        id: 8,
        category: 'CPPG',
        question: '개인정보 수집 시 정보주체의 동의를 받지 않아도 되는 경우는?',
        options: ['마케팅 목적 활용', '법률에 특별한 규정이 있는 경우', '제3자 제공', '민감정보 처리'],
        answer: 1
    },
    // CIA (9-10)
    {
        id: 9,
        category: 'CIA',
        question: '내부 감사의 독립성을 보장하기 위해 감사부서는 누구에게 보고해야 하는가?',
        options: ['재무팀장', 'IT 본부장', '감사위원회', '법무팀'],
        answer: 2
    },
    {
        id: 10,
        category: 'CIA',
        question: '감사 위험(Audit Risk)의 구성 요소가 아닌 것은?',
        options: ['고유 위험', '통제 위험', '적발 위험', '비즈니스 위험'],
        answer: 3
    }
]

export default function LevelTestPage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getSession()
            setIsLoggedIn(!!data.session)
        }
        checkUser()
    }, [])

    const handleNext = () => {
        if (selectedAnswer === null) return

        const newAnswers = [...answers, parseInt(selectedAnswer)]
        setAnswers(newAnswers)

        if (parseInt(selectedAnswer) === QUESTIONS[currentStep].answer) {
            setScore(prev => prev + 10)
        }

        setSelectedAnswer(null)

        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            setIsFinished(true)
        }
    }

    const handleResultAction = () => {
        if (isLoggedIn) {
            router.push('/exams') // Assuming this is the "payment/purchase" landing
        } else {
            router.push('/login?next=/exams')
        }
    }

    if (isFinished) {
        return (
            <div className="min-h-screen bg-black flex flex-col">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
                    <Card className="w-full max-w-lg bg-[#111] border-white/10">
                        <CardHeader className="text-center space-y-4">
                            <TrophyIcon score={score} />
                            <CardTitle className="text-3xl font-bold text-white">진단 결과</CardTitle>
                            <CardDescription className="text-lg text-gray-400">
                                당신의 보안 지식 점수는 <span className="text-blue-500 font-bold">{score}점</span>입니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {score >= 80 ? '보안 전문가 수준 🌟' : score >= 50 ? '보안 유망주 🌱' : '보안 입문자 👶'}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {score >= 80
                                        ? '탁월한 지식을 보유하고 계시네요! 실전 모의고사로 최종 점검하고 자격증을 취득하세요.'
                                        : score >= 50
                                            ? '기초가 탄탄합니다. 조금만 더 학습하면 전문가로 성장할 수 있습니다.'
                                            : '지금부터 시작하면 됩니다. 체계적인 커리큘럼으로 기초부터 다져보세요.'}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Button onClick={handleResultAction} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg">
                                지금 모의시험 응시하기
                            </Button>
                            <Link href="/templates" className="text-sm text-gray-500 hover:text-white underline underline-offset-4">
                                커리큘럼 먼저 확인하기
                            </Link>
                        </CardFooter>
                    </Card>
                </main>
                <Footer />
            </div>
        )
    }

    const progress = ((currentStep + 1) / QUESTIONS.length) * 100

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Question {currentStep + 1} / {QUESTIONS.length}</span>
                            <span>{QUESTIONS[currentStep].category}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <Card className="bg-[#111] border-white/10">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl text-white leading-relaxed">
                                {QUESTIONS[currentStep].question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer} className="space-y-4">
                                {QUESTIONS[currentStep].options.map((option, idx) => (
                                    <div key={idx} className={`flex items-center space-x-3 p-4 rounded-xl border border-white/10 cursor-pointer transition-colors ${selectedAnswer === idx.toString() ? 'bg-blue-600/20 border-blue-500' : 'hover:bg-white/5'}`}>
                                        <RadioGroupItem value={idx.toString()} id={`option-${idx}`} className="border-white text-blue-500" />
                                        <Label htmlFor={`option-${idx}`} className="flex-1 text-gray-300 cursor-pointer text-base">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={handleNext}
                                disabled={selectedAnswer === null}
                                className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6"
                            >
                                {currentStep < QUESTIONS.length - 1 ? '다음 문제' : '결과 확인하기'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}

function TrophyIcon({ score }: { score: number }) {
    if (score >= 80) return <div className="text-6xl mb-4">🏆</div>
    if (score >= 50) return <div className="text-6xl mb-4">🥈</div>
    return <div className="text-6xl mb-4">🥉</div>
}
