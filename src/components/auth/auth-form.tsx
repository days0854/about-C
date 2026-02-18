'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { login, signup, signInWithGoogle, signInWithKakao } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface AuthFormProps {
    view: 'login' | 'signup'
}

function AuthFormContent({ view }: AuthFormProps) {
    const [loading, setLoading] = useState(false)
    const [socialLoading, setSocialLoading] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        try {
            if (view === 'login') {
                const result = await login(formData)
                if (result?.error) {
                    toast.error(result.error)
                }
            } else {
                const result = await signup(formData)
                if (result?.error) {
                    toast.error(result.error)
                } else {
                    toast.success('이메일을 확인하여 계정을 인증해주세요.')
                }
            }
        } catch (err) {
            toast.error('오류가 발생했습니다. 다시 시도해주세요.')
        } finally {
            setLoading(false)
        }
    }

    async function handleGoogleLogin() {
        setSocialLoading('google')
        try {
            await signInWithGoogle()
        } catch (err) {
            toast.error('구글 로그인에 실패했습니다.')
            setSocialLoading(null)
        }
    }

    async function handleKakaoLogin() {
        setSocialLoading('kakao')
        try {
            await signInWithKakao()
        } catch (err) {
            toast.error('카카오 로그인에 실패했습니다.')
            setSocialLoading(null)
        }
    }

    return (
        <Card className="w-[380px]">
            <CardHeader>
                <CardTitle>{view === 'login' ? '로그인' : '회원가입'}</CardTitle>
                <CardDescription>
                    {view === 'login'
                        ? '이메일로 로그인하거나 소셜 계정을 사용하세요'
                        : '이메일로 가입하거나 소셜 계정을 사용하세요'}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">이메일</Label>
                            <Input id="email" name="email" type="email" placeholder="example@email.com" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {view === 'login' ? '로그인' : '회원가입'}
                    </Button>

                    {/* 구분선 */}
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">또는</span>
                        </div>
                    </div>

                    {/* 구글 로그인 버튼 */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleLogin}
                        disabled={socialLoading !== null}
                    >
                        {socialLoading === 'google' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        구글로 {view === 'login' ? '로그인' : '회원가입'}
                    </Button>

                    {/* 카카오 로그인 버튼 */}
                    <Button
                        type="button"
                        className="w-full bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E]"
                        onClick={handleKakaoLogin}
                        disabled={socialLoading !== null}
                    >
                        {socialLoading === 'kakao' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="#3C1E1E">
                                <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.74 5.19 4.36 6.6L5.4 21l4.32-2.88C10.2 18.36 11.1 18.48 12 18.48c5.52 0 10-3.48 10-7.68S17.52 3 12 3z" />
                            </svg>
                        )}
                        카카오로 {view === 'login' ? '로그인' : '회원가입'}
                    </Button>

                    <div className="text-sm text-center text-muted-foreground">
                        {view === 'login' ? (
                            <>
                                계정이 없으신가요?{' '}
                                <Link href="/signup" className="underline">
                                    회원가입
                                </Link>
                            </>
                        ) : (
                            <>
                                이미 계정이 있으신가요?{' '}
                                <Link href="/login" className="underline">
                                    로그인
                                </Link>
                            </>
                        )}
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}

export function AuthForm(props: AuthFormProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthFormContent {...props} />
        </Suspense>
    )
}
