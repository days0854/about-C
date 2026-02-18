'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { checkMFAStatus, verifyMFA } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function MFAVerifyPage() {
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [factorId, setFactorId] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const checkStatus = async () => {
            const status = await checkMFAStatus()
            if (!status.enrolled) {
                router.push('/admin/mfa/enroll')
            } else if (status.factorId) {
                setFactorId(status.factorId)
            }
        }
        checkStatus()
    }, [])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (!factorId) {
                throw new Error('MFA factor not found')
            }

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
                    <CardTitle>2단계 인증 (2FA)</CardTitle>
                    <CardDescription>Google Authenticator 코드를 입력하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerify} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="6자리 코드"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-black/50 border-white/10 text-white text-center text-2xl tracking-widest"
                            maxLength={6}
                        />
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <Button type="submit" className="w-full" disabled={loading || code.length !== 6}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            인증하기
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
