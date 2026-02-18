import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-white mb-6">개인정보처리방침</h1>
                <p className="text-gray-400">준비 중인 페이지입니다.</p>
            </main>
            <Footer />
        </div>
    )
}
