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
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white hover:bg-white/20 border-0">
              보안 자격증의 정점
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            보안 자격증의 정점,<br />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              About C
            </span>에서<br />
            완벽하게 준비하세요.
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed word-keep-all">
            About C는 보안 전문가를 위한 전문 플랫폼입니다. CISA, CISM, CISSP, CPPG, CIA 시나리오를 최신 Gemini AI가 실시간으로 생성하여 제공합니다.
          </p>

          {/* Connection Lines (Visual Decor) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-24 w-[120%] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-24 w-[80%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
