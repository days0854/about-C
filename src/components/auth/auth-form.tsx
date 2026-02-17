'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { login, signup } from '@/app/(auth)/actions'
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
                    toast.success('Check your email to confirm your account')
                }
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{view === 'login' ? 'Login' : 'Sign Up'}</CardTitle>
                <CardDescription>
                    {view === 'login'
                        ? 'Enter your email below to login to your account'
                        : 'Enter your email below to create your account'}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {view === 'login' ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                        {view === 'login' ? (
                            <>
                                Don't have an account?{' '}
                                <Link href="/signup" className="underline">
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <Link href="/login" className="underline">
                                    Login
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
