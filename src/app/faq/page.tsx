import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQ_ITEMS = [
    {
        question: "어떤 자격증부터 시작해야 할까요?",
        answer: "보안 분야 입문자라면 '정보보안기사' 또는 '컴퓨터활용능력' 같은 기초 자격증을 추천합니다. 이후 진로에 따라 관리체계는 CPPG, 감사는 CISA 등으로 확장하는 것이 좋습니다."
    },
    {
        question: "비전공자도 수강 가능한가요?",
        answer: "네, 가능합니다. AboutAcademy의 모든 과정은 기초부터 심화까지 단계별로 구성되어 있어 비전공자도 어려움 없이 따라오실 수 있습니다. 기초 입문 과정부터 시작해보세요."
    },
    {
        question: "모의고사는 실제 시험과 얼마나 유사한가요?",
        answer: "현직 보안 전문가들이 최신 출제 경향을 분석하여 매월 문제를 업데이트합니다. 실제 시험과 동일한 시간 제한 및 환경을 제공하여 실전 감각을 극대화할 수 있습니다."
    },
    {
        question: "수강 기간은 얼마나 되나요?",
        answer: "각 과정별로 상이하나, 보통 자격증 대비반은 3개월, 실무 과정은 2~4개월 코스로 운영됩니다. 1:1 코칭은 월 단위 구독이 가능합니다."
    },
    {
        question: "결제 후 환불이 가능한가요?",
        answer: "강의 시작 전 전액 환불 가능하며, 강의 진행률에 따라 부분 환불이 가능합니다. 자세한 내용은 '이용약관'을 참고해주세요."
    }
]

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h1 className="text-4xl font-bold text-white text-center mb-12">자주 묻는 질문</h1>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {FAQ_ITEMS.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 rounded-lg px-6 bg-[#111]">
                                <AccordionTrigger className="text-white hover:text-blue-400 no-underline text-lg font-medium py-6">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>
            <Footer />
        </div>
    )
}
