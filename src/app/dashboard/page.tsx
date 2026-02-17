import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { CertificatesList } from '@/components/dashboard/certificates-list';
import { mockStats, mockCertificates } from '@/lib/mock-data';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="container px-4 py-8 mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
              <p className="text-muted-foreground">
                자격증을 관리하고 진행 상황을 확인하세요
              </p>
            </div>

            <StatsCards stats={mockStats} />

            <CertificatesList certificates={mockCertificates} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
