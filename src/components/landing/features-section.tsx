import { Award, Palette, Download, Shield, Zap, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Create professional certificates in seconds with our intuitive platform.',
  },
  {
    icon: Palette,
    title: 'Customizable Templates',
    description: 'Choose from dozens of professionally designed templates or create your own.',
  },
  {
    icon: Download,
    title: 'Multiple Export Options',
    description: 'Download as PDF, PNG, or print directly. Perfect for any use case.',
  },
  {
    icon: Shield,
    title: 'Secure & Verified',
    description: 'Every certificate includes a unique verification ID for authenticity.',
  },
  {
    icon: Award,
    title: 'Professional Design',
    description: 'Impress recipients with elegant, professionally designed certificates.',
  },
  {
    icon: Users,
    title: 'Bulk Generation',
    description: 'Generate hundreds of certificates at once with CSV upload.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to create{' '}
            <span className="text-primary">amazing certificates</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed to make certificate generation simple and professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="border-muted hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
