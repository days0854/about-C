import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll(): Array<{ name: string; value: string }> {
                    return request.cookies.getAll().map((cookie) => ({
                        name: cookie.name,
                        value: cookie.value,
                    }))
                },
                setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/signup') &&
        !request.nextUrl.pathname.startsWith('/auth')
    ) {
        // no user, potentially redirect to login
        // for now, we allow public access to some pages, but maybe restrict /dashboard later
        // if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // const url = request.nextUrl.clone()
        // url.pathname = '/login'
        // return NextResponse.redirect(url)
        // }
    }

    // Admin route protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // 1. Check if user is logged in
        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            url.searchParams.set('next', request.nextUrl.pathname)
            return NextResponse.redirect(url)
        }

        // 2. Check if user is authorized (Allowlist)
        // TODO: Move this to a database table or environment variable for easier management
        const ALLOWED_ADMINS = ['ahkasakamika@gmail.com']

        if (user.email && !ALLOWED_ADMINS.includes(user.email)) {
            // User is logged in but not authorized -> Redirect to home
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }

        // 3. Check for MFA (AAL2)
        const { data: { session } } = await supabase.auth.getSession()
        const aal = session?.user?.app_metadata?.aal || 'aal1'

        if (aal !== 'aal2' && !request.nextUrl.pathname.startsWith('/admin/mfa')) {
            // If not MFA authenticated and not already on MFA setup/verify page, redirect to MFA verify
            const url = request.nextUrl.clone()
            url.pathname = '/admin/mfa/verify'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}
