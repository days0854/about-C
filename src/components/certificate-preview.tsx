import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";

interface CertificateData {
  recipientName: string;
  courseTitle: string;
  completionDate: string;
  issuerName: string;
  certificateId: string;
}

interface CertificatePreviewProps {
  data: CertificateData;
}

export function CertificatePreview({ data }: CertificatePreviewProps) {
  return (
    <Card className="w-full max-w-4xl bg-white text-black border-4 border-double border-gold shadow-2xl overflow-hidden relative print:shadow-none print:border-none">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-gold/20 to-transparent z-0 pointer-events-none" />

      <CardHeader className="text-center relative z-10 pt-16 pb-8">
        <div className="mx-auto mb-6">
          {/* Placeholder for Logo */}
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center border-2 border-gray-400">
            <span className="text-gray-500 text-xs">로고</span>
          </div>
        </div>
        <CardTitle className="text-5xl font-serif font-bold uppercase tracking-widest text-slate-800">
          수료증
        </CardTitle>
        <CardDescription className="text-xl text-slate-600 mt-4 font-light">
          이 수료증은 다음 사람에게 수여됩니다.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
