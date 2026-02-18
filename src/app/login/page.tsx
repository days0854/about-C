'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleOAuthLogin = async (provider: 'google' | 'kakao') => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            console.error('Login error:', error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#111111] border-white/10 text-white">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-white/10 p-3">
                            <Award className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">AboutAcademy 로그인</CardTitle>
                    <CardDescription className="text-gray-400">
                        소셜 계정으로 간편하게 시작하세요
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full h-12 bg-white text-black hover:bg-gray-200 border-0 font-medium text-base relative"
                        onClick={() => handleOAuthLogin('google')}
                        disabled={loading}
                    >
                        <img src="/google-logo.svg" alt="Google" className="w-5 h-5 absolute left-4" />
                        Google로 계속하기
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full h-12 bg-[#FEE500] text-black hover:bg-[#FEE500]/90 border-0 font-medium text-base relative"
                        onClick={() => handleOAuthLogin('kakao')}
                        disabled={loading}
                    >
                        <img src="/kakao-logo.svg" alt="Kakao" className="w-5 h-5 absolute left-4" />
                        카카오로 계속하기
                    </Button>

                    <div className="text-center text-sm text-gray-500 mt-4">
                        계속 진행함으로써 이용약관 및 개인정보 처리방침에 동의합니다.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
