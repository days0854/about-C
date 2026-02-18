'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Clock, ChevronLeft, ChevronRight, Flag, Grid } from 'lucide-react'
import { Exam, Question } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ExamRunnerProps {
    exam: Exam
}

export default function ExamRunner({ exam }: ExamRunnerProps) {
    const router = useRouter()

    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, number>>({}) // questionId -> answerIndex
    const [marked, setMarked] = useState<Set<number>>(new Set()) // questionId
    const [timeLeft, setTimeLeft] = useState(exam.timeLimit * 60) // seconds
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    handleSubmit()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        // Prevent accidental tab close
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            e.returnValue = ''
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            clearInterval(timer)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const handleAnswer = (value: string) => {
        const questionId = exam.questions[currentQuestionIndex].id
        setAnswers(prev => ({
            ...prev,
            [questionId]: parseInt(value)
        }))
    }

    const toggleMark = () => {
        const questionId = exam.questions[currentQuestionIndex].id
        const newMarked = new Set(marked)
        if (newMarked.has(questionId)) {
            newMarked.delete(questionId)
        } else {
            newMarked.add(questionId)
        }
        setMarked(newMarked)
    }

    const handleSubmit = () => {
        // Build result query string or store in localStorage/state management
        // For simplicity, we'll pass answers via query param (not recommended for large data) 
        // OR better: save to localStorage and read on result page.
        localStorage.setItem(`exam_result_${exam.id}`, JSON.stringify({
            examId: exam.id,
            answers,
            timestamp: new Date().toISOString(),
            timeSpent: (exam.timeLimit * 60) - timeLeft
        }))
        router.push(`/exam/${exam.id}/result`)
    }

    const currentQuestion = exam.questions[currentQuestionIndex]
    const progress = (Object.keys(answers).length / exam.questions.length) * 100

    return (
        <div className="flex flex-col h-screen bg-black text-gray-200">
            {/* Top Bar */}
            <header className="h-16 border-b border-white/10 bg-[#111] flex items-center justify-between px-4 fixed top-0 w-full z-10">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-white hidden md:block">{exam.title}</h1>
                    <span className="text-gray-400 text-sm">
                        Q.{currentQuestionIndex + 1} / {exam.questions.length}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-mono text-xl font-bold text-blue-400 bg-blue-900/20 px-3 py-1 rounded">
                        <Clock className="w-5 h-5" />
                        {formatTime(timeLeft)}
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (window.confirm('정말 시험을 종료하시겠습니까?')) {
                                handleSubmit()
                            }
                        }}
                    >
                        제출하기
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Grid />
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 pt-16 h-full overflow-hidden">
                {/* Question Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-3xl mx-auto space-y-6 pb-20">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-blue-400">{currentQuestion.domain}</span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn("gap-2", marked.has(currentQuestion.id) && "text-yellow-500")}
                                    onClick={toggleMark}
                                >
                                    <Flag className="w-4 h-4" />
                                    {marked.has(currentQuestion.id) ? '검토 해제' : '나중에 검토'}
                                </Button>
                            </div>
                        </div>

                        <Card className="bg-[#111] border-white/10">
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl leading-relaxed text-white">
                                    {currentQuestion.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    value={answers[currentQuestion.id]?.toString() ?? ""}
                                    onValueChange={handleAnswer}
                                    className="space-y-4"
                                >
                                    {currentQuestion.options.map((option, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "flex items-center space-x-3 p-4 rounded-xl border border-white/10 cursor-pointer transition-colors hover:bg-white/5",
                                                answers[currentQuestion.id] === idx && "bg-blue-900/20 border-blue-500"
                                            )}
                                            onClick={() => handleAnswer(idx.toString())}
                                        >
                                            <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} className="border-white text-blue-500" />
                                            <Label htmlFor={`opt-${idx}`} className="flex-1 cursor-pointer text-base text-gray-300">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>
                </main>

                {/* Sidebar (Question Palette) */}
                <aside className={cn(
                    "w-80 bg-[#0a0a0a] border-l border-white/10 flex flex-col fixed md:relative right-0 h-[calc(100vh-64px)] transition-transform duration-300 z-20",
                    !isSidebarOpen && "translate-x-full md:translate-x-0"
                )}>
                    <div className="p-4 border-b border-white/10">
                        <h3 className="font-bold text-white mb-2">문제 탐색</h3>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>진행률: {Math.round(progress)}%</span>
                            <span>{Object.keys(answers).length} / {exam.questions.length}</span>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="grid grid-cols-5 gap-2">
                            {exam.questions.map((q, idx) => (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                        setCurrentQuestionIndex(idx)
                                        setIsSidebarOpen(false)
                                    }}
                                    className={cn(
                                        "h-10 rounded-md text-sm font-medium transition-colors border border-white/10",
                                        currentQuestionIndex === idx && "ring-2 ring-white",
                                        answers[q.id] !== undefined
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-[#111] text-gray-400 hover:bg-white/10",
                                        marked.has(q.id) && "border-yellow-500 text-yellow-500"
                                    )}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t border-white/10 text-xs text-gray-500 space-y-2">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded"></div> 풀이 완료</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 border border-yellow-500 rounded"></div> 검토 필요</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#111] border border-white/10 rounded"></div> 미풀이</div>
                    </div>
                </aside>
            </div>

            {/* Bottom Nav */}
            <footer className="h-16 border-t border-white/10 bg-[#111] flex items-center justify-between px-4 md:px-8 fixed bottom-0 w-full z-10">
                <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="border-white/20 text-white hover:bg-white/10"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" /> 이전
                </Button>

                <Button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
                    disabled={currentQuestionIndex === exam.questions.length - 1}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                    다음 <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </footer>
        </div>
    )
}
