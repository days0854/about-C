'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle } from 'lucide-react'

export default function PaymentFailPage() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const message = searchParams.get('message') || '결제 중 오류가 발생했습니다.'
    const code = searchParams.get('code')

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#111111] border-white/10 text-white text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <XCircle className="h-16 w-16 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">결제 실패</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 text-gray-400">
                        <p>{message}</p>
                        {code && <p className="text-sm text-gray-500">에러 코드: {code}</p>}
                    </div>

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                            onClick={() => router.back()}
                        >
                            이전으로
                        </Button>
                        <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => router.push('/')}
                        >
                            홈으로
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
