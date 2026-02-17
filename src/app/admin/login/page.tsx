'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Key } from 'lucide-react';

const ADMIN_CREDENTIALS = {
    id: '1111',
    password: '1111',
    twoFactorCode: '1111'
};

export default function AdminLoginPage() {
    const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        twoFactorCode: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCredentialsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            if (formData.id === ADMIN_CREDENTIALS.id && formData.password === ADMIN_CREDENTIALS.password) {
                setStep('2fa');
                setError('');
            } else {
                setError('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
            setLoading(false);
        }, 500);
    };

    const handle2FASubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            if (formData.twoFactorCode === ADMIN_CREDENTIALS.twoFactorCode) {
                // Set session
                localStorage.setItem('admin_authenticated', 'true');
                localStorage.setItem('admin_session_time', Date.now().toString());
                router.push('/admin');
            } else {
                setError('2차 인증 코드가 올바르지 않습니다.');
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#111111] border-gray-800 text-white">
                <CardHeader className="space-y-4">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Shield className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="text-center">
                        <CardTitle className="text-2xl font-bold">관리자 로그인</CardTitle>
                        <CardDescription className="text-gray-400">
                            {step === 'credentials' ? '아이디와 비밀번호를 입력하세요' : '2차 인증 코드를 입력하세요'}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {step === 'credentials' ? (
                        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="id" className="text-gray-300">관리자 ID</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <Input
                                        id="id"
                                        type="text"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className="bg-black border-gray-700 text-white pl-10"
                                        placeholder="아이디를 입력하세요"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-300">비밀번호</Label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="bg-black border-gray-700 text-white pl-10"
                                        placeholder="비밀번호를 입력하세요"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 h-11"
                                disabled={loading}
                            >
                                {loading ? '확인 중...' : '다음'}
                            </Button>

                            <div className="text-center text-xs text-gray-500 mt-4">
                                테스트 계정: 1111 / 1111 / 1111
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handle2FASubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="2fa" className="text-gray-300">2차 인증 코드</Label>
                                <Input
                                    id="2fa"
                                    type="text"
                                    value={formData.twoFactorCode}
                                    onChange={(e) => setFormData({ ...formData, twoFactorCode: e.target.value })}
                                    className="bg-black border-gray-700 text-white text-center text-2xl tracking-widest"
                                    placeholder="••••"
                                    maxLength={4}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                                    onClick={() => {
                                        setStep('credentials');
                                        setFormData({ ...formData, twoFactorCode: '' });
                                        setError('');
                                    }}
                                >
                                    이전
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    disabled={loading}
                                >
                                    {loading ? '확인 중...' : '로그인'}
                                </Button>
                            </div>

                            <div className="text-center text-xs text-gray-500 mt-4">
                                테스트 2FA 코드: 1111
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
