'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import * as XLSX from 'xlsx'
import { Upload, FileSpreadsheet, CheckCircle, BarChart2 } from 'lucide-react'
import { useEffect } from 'react'

export default function AdminContentPage() {
    const [loading, setLoading] = useState(false)
    const [selectedExam, setSelectedExam] = useState<string>('')
    const [uploadStatus, setUploadStatus] = useState<{ success: number; failed: number; total: number } | null>(null)
    const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({})
    const supabase = createClient()

    const exams = [
        { id: 'cissp', name: 'CISSP' },
        { id: 'cism', name: 'CISM' },
        { id: 'cisa', name: 'CISA' },
        { id: 'cppg', name: 'CPPG' },
        { id: 'cia', name: 'CIA' }
    ]

    useEffect(() => {
        loadQuestionCounts()
    }, [])

    const loadQuestionCounts = async () => {
        const counts: Record<string, number> = {}
        for (const exam of exams) {
            const { count } = await supabase
                .from('questions')
                .select('*', { count: 'exact', head: true })
                .eq('exam_id', exam.id)
            counts[exam.id] = count || 0
        }
        setQuestionCounts(counts)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !selectedExam) return

        setLoading(true)
        setUploadStatus(null)

        const reader = new FileReader()
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target?.result
                const wb = XLSX.read(bstr, { type: 'binary' })
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                const data = XLSX.utils.sheet_to_json(ws) as any[]

                let successCount = 0
                let failCount = 0

                for (const row of data) {
                    try {
                        const options = [row['option_a'], row['option_b'], row['option_c'], row['option_d']].filter(Boolean)
                        const { error } = await supabase.from('questions').insert({
                            exam_id: selectedExam,
                            question_text: row['question_text'],
                            options: options,
                            correct_answer: row['correct_answer'],
                            explanation: row['explanation']
                        })

                        if (error) throw error
                        successCount++
                    } catch (err) {
                        console.error('Row insert error:', err)
                        failCount++
                    }
                }

                setUploadStatus({
                    success: successCount,
                    failed: failCount,
                    total: data.length
                })

                loadQuestionCounts()

            } catch (error) {
                console.error('File parsing error:', error)
                alert('파일 처리 중 오류가 발생했습니다.')
            } finally {
                setLoading(false)
            }
        }
        reader.readAsBinaryString(file)
    }

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">콘텐츠 관리</h1>
                <p className="text-gray-400">시험 문제 업로드 및 현황을 관리합니다</p>
            </div>

            {/* Question Count Status */}
            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <BarChart2 className="w-5 h-5 text-blue-500" />
                        문제 등록 현황
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {exams.map(exam => (
                            <div key={exam.id} className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div className="text-sm text-gray-400 mb-1">{exam.name}</div>
                                <div className="text-2xl font-bold text-white">{questionCounts[exam.id] || 0}</div>
                                <div className="text-xs text-gray-500 mt-1">문제</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Upload Section */}
            <Card className="bg-[#111111] border-gray-800 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-green-500" />
                        엑셀 문제 업로드
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        대량의 문제를 엑셀 파일로 업로드합니다.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">시험 선택</label>
                        <Select onValueChange={setSelectedExam}>
                            <SelectTrigger className="bg-black border-gray-700">
                                <SelectValue placeholder="시험 종류를 선택하세요" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#111111] border-gray-700 text-white">
                                {exams.map(exam => (
                                    <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">파일 선택 (.xlsx, .xls)</label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gray-500 transition-colors relative">
                            <Input
                                type="file"
                                accept=".xlsx, .xls"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileUpload}
                                disabled={!selectedExam || loading}
                            />
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <Upload className="w-8 h-8" />
                                <span>클릭하여 엑셀 파일 업로드</span>
                                {!selectedExam && <span className="text-red-500 text-xs">먼저 시험을 선택해주세요</span>}
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center text-blue-400">업로드 중입니다... 잠시만 기다려주세요.</div>
                    )}

                    {uploadStatus && (
                        <div className="bg-gray-900 rounded-lg p-4 space-y-2">
                            <div className="flex items-center gap-2 text-green-400 font-bold">
                                <CheckCircle className="w-5 h-5" />
                                처리 완료
                            </div>
                            <div className="grid grid-cols-3 text-center text-sm">
                                <div>
                                    <div className="text-gray-400">총 문제</div>
                                    <div className="text-lg font-bold text-white">{uploadStatus.total}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">성공</div>
                                    <div className="text-lg font-bold text-green-500">{uploadStatus.success}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">실패</div>
                                    <div className="text-lg font-bold text-red-500">{uploadStatus.failed}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
