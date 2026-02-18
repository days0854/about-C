import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20 text-gray-300">
                <div className="max-w-3xl mx-auto bg-[#111] p-8 rounded-xl border border-white/10 space-y-6">
                    <h1 className="text-3xl font-bold text-white mb-8">이용약관</h1>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제1조 (목적)</h2>
                        <p>이 약관은 어바웃아카데미(이하 "회사")가 제공하는 교육 서비스 및 관련 제반 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제2조 (용어의 정의)</h2>
                        <p className="text-red-500 font-bold bg-red-500/10 p-2 rounded">
                            [수정 필요] 서비스에서 사용하는 주요 용어(회원, 아이디, 비밀번호, 유료서비스 등)에 대한 정의를 기술해야 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제3조 (약관의 게시와 개정)</h2>
                        <p>회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제4조 (서비스의 이용계약 체결)</h2>
                        <p className="text-red-500 font-bold bg-red-500/10 p-2 rounded">
                            [수정 필요] 회원가입 절차 및 승낙 거절 사유 등을 명시해야 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제5조 (청약철회 등)</h2>
                        <p className="text-red-500 font-bold bg-red-500/10 p-2 rounded">
                            [수정 필요] 유료 서비스(강의 등)의 환불 규정을 전자상거래법에 의거하여 명확히 기재해야 합니다.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
