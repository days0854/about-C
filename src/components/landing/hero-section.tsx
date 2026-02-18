import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-48 overflow-hidden bg-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        {/* Network Nodes Pattern (Simplified CSS representation) */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-center">
            <Badge variant="secondary" className="mb-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20 px-4 py-1.5 text-sm">
              인공지능 시대의 생존 전략
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            인공지능 시대,<br />
            남는 일자리는<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              '보안관리자'
            </span>뿐입니다.
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed word-keep-all">
            AI가 코딩하고, AI가 해킹하는 시대. <br className="hidden md:block" />
            결국 보안을 관리하고 책임지는 것은 인간의 몫입니다. <br />
            <span className="text-white font-semibold">AboutAcademy</span>에서 대체 불가능한 보안 전문가로 거듭나세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="text-lg px-8 h-14 bg-white text-black hover:bg-gray-200">
              무료 레벨테스트 시작하기
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-gray-700 hover:bg-gray-800">
              커리큘럼 확인하기
            </Button>
          </div>

          {/* Connection Lines (Visual Decor) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 w-[120%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 w-[80%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
