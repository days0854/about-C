'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type Certification = {
    id: string
    title: string
    subtitle?: string
    description?: string
    icon_name: string
    slug: string
    color?: string
    bg_color?: string
    border_color?: string
    is_active: boolean
    created_at: string
}

export async function getCertifications() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)
    return data as Certification[]
}

export async function createCertification(formData: FormData) {
    const supabase = await createClient()

    const data = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        description: formData.get('description') as string,
        icon_name: formData.get('icon_name') as string,
        slug: formData.get('slug') as string,
        color: formData.get('color') as string,
        bg_color: formData.get('bg_color') as string,
        border_color: formData.get('border_color') as string,
        is_active: formData.get('is_active') === 'true',
    }

    const { error } = await supabase.from('certifications').insert(data)

    if (error) return { error: error.message }

    revalidatePath('/admin/certifications')
    revalidatePath('/')
    return { success: true }
}

export async function updateCertification(id: string, formData: FormData) {
    const supabase = await createClient()

    const data = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        description: formData.get('description') as string,
        icon_name: formData.get('icon_name') as string,
        slug: formData.get('slug') as string,
        color: formData.get('color') as string,
        bg_color: formData.get('bg_color') as string,
        border_color: formData.get('border_color') as string,
        is_active: formData.get('is_active') === 'true',
    }

    const { error } = await supabase
        .from('certifications')
        .update(data)
        .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/certifications')
    revalidatePath('/')
    return { success: true }
}

export async function deleteCertification(id: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/certifications')
    revalidatePath('/')
    return { success: true }
}
