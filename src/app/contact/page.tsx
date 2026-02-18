import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-white mb-6">Contact</h1>
                <p className="text-gray-400">문의하기 페이지 준비 중입니다.</p>
            </main>
            <Footer />
        </div>
    )
}
