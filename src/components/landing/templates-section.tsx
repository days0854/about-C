import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockTemplates } from '@/lib/mock-data';
import { Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function TemplatesSection() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            아름다운 템플릿
          </h2>
          <p className="text-xl text-muted-foreground">
            전문적으로 디자인된 템플릿으로 시작하여 브랜드에 맞게 맞춤 설정하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {mockTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {template.isPremium && (
                    <Badge variant="secondary" className="gap-1">
                      <Crown className="w-3 h-3" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href="/preview">
                    템플릿 사용하기
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/templates">
              모든 템플릿 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
