import { HeroSection } from '@/components/landing/hero-section';
import { CertificationCards } from '@/components/landing/certification-cards';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CertificationCards />
        <div className="py-20 bg-black text-center text-gray-500 text-sm">
          {/* Additional spacing/content area if needed */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
