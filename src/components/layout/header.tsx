
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/layout/user-nav'
import { Award } from 'lucide-react'

export default async function Header() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <div className="rounded-full bg-muted p-1">
                        <Award className="h-5 w-5 text-foreground" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                        About C
                    </span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/exams" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        시험 목록
                    </Link>
                    <Link href="/materials" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        자료실
                    </Link>
                    <Link href="/community" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        커뮤니티
                    </Link>
                </nav>
                <div className="ml-auto flex items-center space-x-4">
                    {user ? (
                        <UserNav user={{ email: user.email!, name: user.user_metadata?.name }} />
                    ) : (
                        <Button variant="default" className="rounded-full" asChild>
                            <Link href="/login">로그인</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
