import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ContactForm from './contact-form'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
                <ContactForm />
            </main>
            <Footer />
        </div>
    )
}
