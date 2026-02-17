import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Ready to create your first certificate?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of educators, organizations, and businesses creating professional certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="gap-2 shadow-lg">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/preview">Try Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
