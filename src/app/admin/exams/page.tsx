'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, FileSpreadsheet, Plus } from "lucide-react"
import * as XLSX from 'xlsx'
import { createClient } from '@/utils/supabase/client'

export default function ExamManagementPage() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const supabase = createClient()

    // Excel Upload State
    const [file, setFile] = useState<File | null>(null)
    const [previewData, setPreviewData] = useState<any[]>([])

    // Manual Entry State
    const [manualForm, setManualForm] = useState({
        examId: '',
        questionText: '',
        choiceA: '',
        choiceB: '',
        choiceC: '',
        choiceD: '',
        correctAnswer: '',
        explanation: ''
    })

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setFile(file)
        const reader = new FileReader()
        reader.onload = (evt) => {
            const bstr = evt.target?.result
            const wb = XLSX.read(bstr, { type: 'binary' })
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws)
            setPreviewData(data)
        }
        reader.readAsBinaryString(file)
    }

    const processExcelUpload = async () => {
        if (!previewData.length) return
        setLoading(true)

        try {
            // Transform data to match DB schema
            const formattedData = previewData.map((row: any) => ({
                exam_id: row['Exam ID'] || row['exam_id'], // Adjust based on template
                text: row['Question'] || row['question'],
                choices: {
                    A: row['Option A'] || row['choice_a'],
                    B: row['Option B'] || row['choice_b'],
                    C: row['Option C'] || row['choice_c'],
                    D: row['Option D'] || row['choice_d']
                },
                correct_answer: row['Correct Answer'] || row['correct_answer'],
                explanation: row['Explanation'] || row['explanation']
            }))

            const { error } = await supabase.from('questions').insert(formattedData)

            if (error) throw error

            toast({ title: "Success", description: `${formattedData.length} questions uploaded successfully` })
            setFile(null)
            setPreviewData([])
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.from('questions').insert({
                exam_id: manualForm.examId,
                text: manualForm.questionText,
                choices: {
                    A: manualForm.choiceA,
                    B: manualForm.choiceB,
                    C: manualForm.choiceC,
                    D: manualForm.choiceD
                },
                correct_answer: manualForm.correctAnswer.toUpperCase(),
                explanation: manualForm.explanation
            })

            if (error) throw error

            toast({ title: "Success", description: "Question added successfully" })
            // Reset form
            setManualForm({
                examId: manualForm.examId, // Keep exam ID for faster entry
                questionText: '',
                choiceA: '',
                choiceB: '',
                choiceC: '',
                choiceD: '',
                correctAnswer: '',
                explanation: ''
            })
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const downloadTemplate = () => {
        const ws = XLSX.utils.json_to_sheet([
            {
                'Exam ID': 'cissp-2024',
                'Question': 'Which of the following...',
                'Option A': 'Answer A',
                'Option B': 'Answer B',
                'Option C': 'Answer C',
                'Option D': 'Answer D',
                'Correct Answer': 'A',
                'Explanation': 'Because...'
            }
        ])
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Questions")
        XLSX.writeFile(wb, "question_template.xlsx")
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Question Management</h1>

            <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/5">
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                    <TabsTrigger value="excel">Excel Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="manual">
                    <Card className="bg-[#111111] border-white/10 text-white">
                        <CardHeader>
                            <CardTitle>Add Individual Question</CardTitle>
                            <CardDescription>Enter question details manually.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleManualSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Exam ID</Label>
                                        <Input
                                            value={manualForm.examId}
                                            onChange={(e) => setManualForm({ ...manualForm, examId: e.target.value })}
                                            placeholder="e.g. cissp-2024"
                                            className="bg-white/5 border-white/10"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Correct Answer</Label>
                                        <Select
                                            value={manualForm.correctAnswer}
                                            onValueChange={(v) => setManualForm({ ...manualForm, correctAnswer: v })}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10">
                                                <SelectValue placeholder="Select Answer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A">A</SelectItem>
                                                <SelectItem value="B">B</SelectItem>
                                                <SelectItem value="C">C</SelectItem>
                                                <SelectItem value="D">D</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label>Question Text</Label>
                                        <Textarea
                                            value={manualForm.questionText}
                                            onChange={(e) => setManualForm({ ...manualForm, questionText: e.target.value })}
                                            className="bg-white/5 border-white/10 min-h-[100px]"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Option A</Label>
                                        <Input
                                            value={manualForm.choiceA}
                                            onChange={(e) => setManualForm({ ...manualForm, choiceA: e.target.value })}
                                            className="bg-white/5 border-white/10"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Option B</Label>
                                        <Input
                                            value={manualForm.choiceB}
                                            onChange={(e) => setManualForm({ ...manualForm, choiceB: e.target.value })}
                                            className="bg-white/5 border-white/10"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Option C</Label>
                                        <Input
                                            value={manualForm.choiceC}
                                            onChange={(e) => setManualForm({ ...manualForm, choiceC: e.target.value })}
                                            className="bg-white/5 border-white/10"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Option D</Label>
                                        <Input
                                            value={manualForm.choiceD}
                                            onChange={(e) => setManualForm({ ...manualForm, choiceD: e.target.value })}
                                            className="bg-white/5 border-white/10"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label>Explanation</Label>
                                        <Textarea
                                            value={manualForm.explanation}
                                            onChange={(e) => setManualForm({ ...manualForm, explanation: e.target.value })}
                                            className="bg-white/5 border-white/10"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                    Add Question
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="excel">
                    <Card className="bg-[#111111] border-white/10 text-white">
                        <CardHeader>
                            <CardTitle>Bulk Upload via Excel</CardTitle>
                            <CardDescription>
                                Upload a spreadsheet containing multiple questions.
                                <Button variant="link" className="px-1 text-primary" onClick={downloadTemplate}>
                                    Download Template
                                </Button>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-white/5 border-white/20">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">XLSX, XLS files only</p>
                                    </div>
                                    <input type="file" className="hidden" accept=".xlsx, .xls" onChange={handleFileUpload} />
                                </label>
                            </div>

                            {file && (
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <FileSpreadsheet className="h-8 w-8 text-green-400" />
                                        <div>
                                            <p className="font-medium text-sm">{file.name}</p>
                                            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB • {previewData.length} columns detected</p>
                                        </div>
                                    </div>
                                    <Button onClick={processExcelUpload} disabled={loading || !previewData.length}>
                                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Upload Questions'}
                                    </Button>
                                </div>
                            )}

                            {previewData.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Preview (First 3 Rows)</Label>
                                    <div className="bg-black/50 p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs text-gray-400">
                                            {JSON.stringify(previewData.slice(0, 3), null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
