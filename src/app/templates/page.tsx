import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { CheckCircle, BookOpen, ScrollText, Medal, Star, ShieldCheck } from 'lucide-react'

export default function TemplatesPage() {
  const steps = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "기초 입문 (Step 1)",
      desc: "정보보안 개론 및 네트워크 기초 학습",
      color: "bg-blue-500",
      date: "1개월차"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "심화 학습 (Step 2)",
      desc: "웹/시스템 보안 및 모의해킹 실습",
      color: "bg-purple-500",
      date: "3개월차"
    },
    {
      icon: <ScrollText className="w-6 h-6" />,
      title: "프로젝트 수행 (Step 3)",
      desc: "실전 취약점 분석 보고서 작성 프로젝트",
      color: "bg-pink-500",
      date: "4개월차"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "실전 모의고사 (Step 4)",
      desc: "최신 기출 문제 풀이 및 약점 보완",
      color: "bg-orange-500",
      date: "5개월차"
    },
    {
      icon: <Medal className="w-6 h-6" />,
      title: "자격증 취득 & 취업 (Goal)",
      desc: "정보보안기사 취득 및 대기업 보안팀 입사",
      color: "bg-green-500",
      date: "6개월차 ~"
    }
  ]

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            보안 전문가 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">커리어 로드맵</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AboutAcademy가 제안하는 6개월 단기 완성 코스.<br />
            초보자에서 전문가로 거듭나는 가장 확실한 길입니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>

                {/* Content Side */}
                <div className="flex-1 w-full md:w-auto">
                  <div className="bg-[#111] border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <div className={`absolute top-0 left-0 w-1 h-full ${step.color}`}></div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${step.color} bg-opacity-20 border border-white/10`}>
                        {step.date}
                      </span>
                      <div className={`p-2 rounded-lg ${step.color} bg-opacity-10 text-white`}>
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </div>

                {/* Center Point */}
                <div className="relative flex items-center justify-center w-12 h-12 shrink-0 z-10">
                  <div className={`w-4 h-4 rounded-full ${step.color} ring-4 ring-black shadow-[0_0_15px_currentColor]`}></div>
                </div>

                {/* Empty Side for layout balance */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <span>매년 2,500명 이상의 수강생이 이 로드맵을 통해 취업에 성공하고 있습니다.</span>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
