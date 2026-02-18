import { Shield, Lock, FileCheck, Ribbon, Globe, Award, HelpCircle, Server, Database, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

const iconMap: Record<string, any> = {
    Shield, Lock, FileCheck, Ribbon, Globe, Award, HelpCircle, Server, Database, Cloud
};

export async function CertificationCards() {
    const supabase = await createClient();
    const { data: certifications } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

    if (!certifications || certifications.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 z-20 relative -mt-32 text-center text-gray-500">
                <p>등록된 자격증이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-7xl mx-auto px-4 z-20 relative -mt-32">
            {certifications.map((cert) => {
                const IconComponent = iconMap[cert.icon_name] || HelpCircle;

                return (
                    <Link href={`/exams/${cert.slug}`} key={cert.id} className="block group">
                        <Card
                            className="bg-[#111111]/90 backdrop-blur-sm border-white/10 text-white hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-xl h-full"
                        >
                            <CardHeader className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-xl ${cert.bg_color || 'bg-gray-800'}`}>
                                        <IconComponent className={`w-6 h-6 ${cert.color || 'text-gray-400'}`} />
                                    </div>
                                    <Badge variant="outline" className="border-white/10 text-gray-400 font-normal">
                                        보안
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl font-bold">{cert.title}</CardTitle>
                                    <div className="text-xs text-gray-400 font-medium">{cert.subtitle}</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                    {cert.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
