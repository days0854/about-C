'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { enrollMFA, verifyMFA } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function MFAEnrollPage() {
    const [factorId, setFactorId] = useState<string>('')
    const [qrCode, setQrCode] = useState<string>('')
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const initEnrollment = async () => {
            const result = await enrollMFA()
            if (result.error) {
                setError(result.error)
            } else if (result.qrCode) {
                setFactorId(result.factorId)
                setQrCode(result.qrCode)
            }
        }
        initEnrollment()
    }, [])

    const handleVerify = async () => {
        setLoading(true)
        setError(null)

        try {
            const result = await verifyMFA(factorId, code)
            if (result.error) throw new Error(result.error)

            router.push('/admin')
            router.refresh()

            if (error) throw error

            router.push('/admin')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <Card className="w-full max-w-md border-white/10 bg-[#111111] text-white">
                <CardHeader>
                    <CardTitle>2단계 인증 설정</CardTitle>
                    <CardDescription>Google Authenticator 앱으로 QR 코드를 스캔하세요.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {qrCode && (
                        <div className="flex justify-center bg-white p-4 rounded-lg">
                            <img src={qrCode} alt="QR Code" width={200} height={200} />
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="6자리 코드 입력"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-black/50 border-white/10 text-white text-center text-2xl tracking-widest"
                            maxLength={6}
                        />
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <Button onClick={handleVerify} className="w-full" disabled={loading || code.length !== 6}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            활성화 및 로그인
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
