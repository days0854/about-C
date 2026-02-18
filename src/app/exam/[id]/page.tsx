import { CISA_EXAM } from '@/lib/mock-data'
import ExamRunner from './exam-runner'
import { notFound } from 'next/navigation'

// Defines which params are allowed
export async function generateStaticParams() {
    return [{ id: 'cisa-mock-1' }]
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ExamPage(props: PageProps) {
    const params = await props.params;
    // In a real app, fetch exam by params.id from DB
    // Here we use static mock data
    const exam = CISA_EXAM

    if (params.id !== exam.id) {
        return notFound()
    }

    return <ExamRunner exam={exam} />
}
