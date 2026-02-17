'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [verifying, setVerifying] = useState(true)
    const [success, setSuccess] = useState(false)

    const paymentKey = searchParams.get('paymentKey')
    const orderId = searchParams.get('orderId')
    const amount = searchParams.get('amount')

    useEffect(() => {
        if (!paymentKey || !orderId || !amount) {
            setVerifying(false)
            return
        }

        // In a real app, call your backend to verify payment here
        // await fetch('/api/payments/confirm', { ... })

        // Simulating verification for now
        const timer = setTimeout(() => {
            setVerifying(false)
            setSuccess(true)
        }, 1500)

        return () => clearTimeout(timer)
    }, [paymentKey, orderId, amount])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#111111] border-white/10 text-white text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        {verifying ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        ) : success ? (
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        ) : (
                            <XCircle className="h-16 w-16 text-red-500" />
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {verifying ? '결제 확인 중...' : success ? '결제 성공!' : '결제 실패'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!verifying && success && (
                        <div className="space-y-2 text-gray-400">
                            <p>주문이 성공적으로 처리되었습니다.</p>
                            <p className="text-sm">주문번호: {orderId}</p>
                            <p className="text-sm">결제금액: {Number(amount).toLocaleString()}원</p>
                        </div>
                    )}

                    {!verifying && !success && (
                        <div className="text-gray-400">
                            결제 정보를 확인할 수 없습니다.
                        </div>
                    )}

                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => router.push('/dashboard')}
                    >
                        대시보드로 이동
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
