import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20 text-gray-300">
                <div className="max-w-3xl mx-auto bg-[#111] p-8 rounded-xl border border-white/10 space-y-6">
                    <h1 className="text-3xl font-bold text-white mb-8">개인정보처리방침</h1>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제1조 (개인정보의 처리 목적)</h2>
                        <p>어바웃아카데미(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>회원 가입 및 관리</li>
                            <li>서비스 제공 및 계약의 이행</li>
                            <li>고객 문의 처리</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제2조 (개인정보의 처리 및 보유 기간)</h2>
                        <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                        <p className="mt-2 text-red-500 font-bold bg-red-500/10 p-2 rounded">
                            [수정 필요] 구체적인 보유 기간을 명시해야 합니다. (예: 회원 탈퇴 시까지, 관계 법령 위반 시까지 등)
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제3조 (개인정보의 제3자 제공)</h2>
                        <p className="text-red-500 font-bold bg-red-500/10 p-2 rounded">
                            [수정 필요] 제3자 제공 현황이 있다면 기재하고, 없다면 "제공하지 않습니다"라고 명시해야 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">제4조 (개인정보책임자)</h2>
                        <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                        <div className="mt-4 p-4 bg-white/5 rounded border border-white/10">
                            <p>성명: <span className="text-red-500">[성명 입력]</span></p>
                            <p>직책: <span className="text-red-500">[직책 입력]</span></p>
                            <p>연락처: <span className="text-red-500">[이메일/전화번호 입력]</span></p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
