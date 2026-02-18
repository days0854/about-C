import { AuthForm } from '@/components/auth/auth-form';
import Link from 'next/link';
import { Award } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Award className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AboutAcademy
            </span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">회원가입</h1>
          <p className="text-muted-foreground">지금 AboutAcademy를 시작하세요</p>
        </div>
        <AuthForm view="signup" />
      </div>
    </div>
  );
}
