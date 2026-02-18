import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Shield, Lock, FileSearch } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TemplatesPage() {
  const tracks = {
    security: [
      { title: "정보보안산업기사/기사", desc: "국가기술자격으로 기초 다지기" },
      { title: "CISA", desc: "정보시스템 감사 통제 및 보안 (국제자격)" },
      { title: "CISM", desc: "정보보안 매니지먼트 (관리자급 필수)" }
    ],
    privacy: [
      { title: "CPPG", desc: "개인정보관리사 (국내 필수)" },
      { title: "PIA", desc: "개인정보영향평가사 (전문가)" },
      { title: "ISMS-P", desc: "정보보호 및 개인정보보호 관리체계 인증심사원" }
    ],
    audit: [
      { title: "CISA", desc: "정보시스템 감사 (IT 감사 기초)" },
      { title: "CIA", desc: "국제공인내부감사사 (감사 전문가)" }
    ]
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            전문가 커리어 로드맵
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            목표하는 직무에 맞춰 최적화된 자격증 취득 순서를 제안합니다.
          </p>
        </div>

        <Tabs defaultValue="security" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-[#111]">
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">보안관리자</TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-purple-600">개인정보관리자</TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-green-600">IT 감사자</TabsTrigger>
          </TabsList>

          {/* Security Track */}
          <TabsContent value="security" className="mt-8 space-y-8">
            <RoadmapTrack steps={tracks.security} color="bg-blue-500" icon={<Shield className="w-6 h-6" />} />
          </TabsContent>

          {/* Privacy Track */}
          <TabsContent value="privacy" className="mt-8 space-y-8">
            <RoadmapTrack steps={tracks.privacy} color="bg-purple-500" icon={<Lock className="w-6 h-6" />} />
          </TabsContent>

          {/* Audit Track */}
          <TabsContent value="audit" className="mt-8 space-y-8">
            <RoadmapTrack steps={tracks.audit} color="bg-green-500" icon={<FileSearch className="w-6 h-6" />} />
          </TabsContent>
        </Tabs>

      </main>
      <Footer />
    </div>
  )
}

function RoadmapTrack({ steps, color, icon }: { steps: any[], color: string, icon: any }) {
  return (
    <div className="relative border-l-2 border-white/10 ml-4 md:ml-8 space-y-12 py-4">
      {steps.map((step, idx) => (
        <div key={idx} className="relative pl-8 md:pl-12 group">
          {/* Dot */}
          <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${color} ring-4 ring-black shadow-[0_0_10px_currentColor] group-hover:scale-125 transition-transform`}></div>

          <div className="bg-[#111] border border-white/10 p-6 rounded-xl hover:border-white/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className={`p-1.5 rounded-lg ${color} bg-opacity-20 text-white`}>
                {icon}
              </span>
              <span className="text-sm text-gray-400">Step {idx + 1}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
            <p className="text-gray-400">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
