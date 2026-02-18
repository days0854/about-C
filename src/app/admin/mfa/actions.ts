'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function enrollMFA() {
    const supabase = await createClient()

    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // 2. Enroll TOTP factor
    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
    })

    if (error) {
        return { error: error.message }
    }

    return {
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret
    }
}

export async function verifyMFA(factorId: string, code: string) {
    const supabase = await createClient()

    // 1. Verify the challenge
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code,
    })

    if (error) {
        return { error: error.message }
    }

    // 2. Refresh session to update AAL
    await supabase.auth.refreshSession()

    return { success: true }
}

export async function checkMFAStatus() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { enrolled: false, verified: false }

    const { data: factors } = await supabase.auth.mfa.listFactors()
    const totpFactor = factors?.all?.find(f => f.factor_type === 'totp' && f.status === 'verified')

    return {
        enrolled: !!totpFactor,
        factorId: totpFactor?.id
    }
}
