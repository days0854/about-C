import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import LevelTestQuiz from './level-test-quiz'

export default function LevelTestPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center">
                <LevelTestQuiz />
            </main>
            <Footer />
        </div>
    )
}
