import { redirect } from 'next/navigation'

export default function MFAPage() {
    redirect('/admin/mfa/verify')
}
