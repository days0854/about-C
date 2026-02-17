"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react"; // Or similar icon
import { Progress } from "@/components/ui/progress"; // Assuming shadcn progress is available, or use div

// Mock Exam Data
const MOCK_QUESTIONS = [
    {
        id: 1,
        text: "다음 중 비즈니스 영향 분석(BIA)의 주된 목적은 무엇입니까?",
        options: [
            "운영 연속성에 영향을 줄 수 있는 사건을 식별하기 위해.",
            "중요 비즈니스 기능에 대한 최대 허용 중단 시간을 결정하기 위해.",
            "위험 평가를 위한 연간 예상 손실액(ALE)을 계산하기 위해.",
            "규정 준수 요구 사항을 충족하기 위해."
        ],
        correctAnswer: 1, // Index of correct answer
    },
    {
        id: 2,
        text: "감사 중에 직무 분리의 가장 좋은 증거를 제공하는 것은 무엇입니까?",
        options: [
            "프로세스 흐름도.",
            "조직도.",
            "사용자 접근 로그.",
            "직무 기술서."
        ],
        correctAnswer: 2,
    },
    {
        id: 3,
        text: "위험 관리 프로그램을 개발하는 첫 번째 단계는 무엇입니까?",
        options: [
            "자산 식별.",
            "취약점 평가.",
            "위협 분석.",
            "위험 계산."
        ],
        correctAnswer: 0,
    }
];

export function ExamInterface() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, isSubmitted]);

    const handleOptionSelect = (optionIndex: number) => {
        if (isSubmitted) return;
        setSelectedOptions((prev) => ({
            ...prev,
            [currentQuestionIndex]: optionIndex,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / MOCK_QUESTIONS.length) * 100;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
            {/* Header with Timer */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200 sticky top-4 z-10">
                <div className="flex items-center space-x-4">
                    <span className="font-bold text-lg text-slate-800">CISA 모의고사</span>
                    <span className="text-sm text-slate-500 hidden md:inline">문제 {currentQuestionIndex + 1} / {MOCK_QUESTIONS.length}</span>
                </div>
                <div className={`text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Question Card */}
            <Card className="min-h-[400px] flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl leading-relaxed text-slate-900">
                        {currentQuestion.text}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                    <div className="grid gap-3">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedOptions[currentQuestionIndex] === index;
                            const isCorrect = isSubmitted && currentQuestion.correctAnswer === index;
                            const isWrong = isSubmitted && isSelected && currentQuestion.correctAnswer !== index;

                            let optionClass = "text-left justify-start h-auto py-4 px-6 text-base whitespace-normal hover:bg-slate-50 border-slate-200";

                            if (isSelected) {
                                optionClass += " border-blue-500 bg-blue-50 ring-1 ring-blue-500";
                            }

                            if (isSubmitted) {
                                if (isCorrect) optionClass += " bg-green-100 border-green-500 text-green-800 ring-1 ring-green-500";
                                if (isWrong) optionClass += " bg-red-100 border-red-500 text-red-800 ring-1 ring-red-500";
                            }

                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className={optionClass}
                                    onClick={() => handleOptionSelect(index)}
                                    disabled={isSubmitted}
                                >
                                    <span className="font-bold mr-3 text-slate-400">{String.fromCharCode(65 + index)}.</span>
                                    {option}
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>

                {/* Footer Navigation */}
                <div className="p-6 border-t border-slate-100 flex justify-between bg-slate-50/50 rounded-b-xl">
                    <Button
                        variant="ghost"
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="text-slate-500 hover:text-slate-800"
                    >
                        이전 문제
                    </Button>

                    {isSubmitted ? (
                        <div className="text-center font-bold text-green-600 self-center">
                            시험 종료
                        </div>
                    ) : (
                        currentQuestionIndex === MOCK_QUESTIONS.length - 1 ? (
                            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-8">
                                제출하기
                            </Button>
                        ) : (
                            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                                다음 문제
                            </Button>
                        )
                    )}
                </div>
            </Card>

            {/* Question Navigator (Sidebar-like) */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 p-4 bg-white rounded-lg border border-slate-200">
                {MOCK_QUESTIONS.map((_, idx) => {
                    const isActive = idx === currentQuestionIndex;
                    const isAnswered = selectedOptions[idx] !== undefined;

                    let statusClass = "bg-slate-100 text-slate-500 hover:bg-slate-200";
                    if (isActive) statusClass = "bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1";
                    else if (isAnswered) statusClass = "bg-blue-100 text-blue-700 border border-blue-200";

                    return (
                        <button
                            key={idx}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${statusClass}`}
                        >
                            {idx + 1}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
