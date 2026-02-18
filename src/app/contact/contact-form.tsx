'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function ContactForm() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        toast({
            title: "문의가 접수되었습니다.",
            description: "담당자가 확인 후 24시간 이내에 답변 드리겠습니다.",
        })

        setLoading(false)
            ; (e.target as HTMLFormElement).reset()
    }

    return (
        <Card className="w-full max-w-lg bg-[#111] border-white/10">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-white">문의하기</CardTitle>
                <CardDescription className="text-gray-400">
                    궁금한 점이 있으신가요? 아래 양식을 통해 문의해주세요.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">성명</Label>
                        <Input id="name" required placeholder="홍길동" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact" className="text-gray-300">연락처</Label>
                        <Input id="contact" required placeholder="010-0000-0000" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-gray-300">내용</Label>
                        <Textarea id="content" required placeholder="문의하실 내용을 입력해주세요." className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6" disabled={loading}>
                        {loading ? '전송 중...' : '문의하기'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
