import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default async function AdminUsersPage() {
    const supabase = await createClient();

    const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">회원 관리</h1>
                    <p className="text-gray-400">등록된 회원 목록을 관리합니다</p>
                </div>
                <div className="text-sm text-gray-400">
                    총 {users?.length || 0}명
                </div>
            </div>

            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Users className="w-5 h-5" />
                        회원 목록
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left p-3 text-gray-400 font-medium">이메일</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">이름</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">역할</th>
                                    <th className="text-left p-3 text-gray-400 font-medium">가입일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                                        <td className="p-3 text-gray-300">{user.email || '-'}</td>
                                        <td className="p-3 text-gray-300">{user.full_name || '-'}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'admin' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'
                                                }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-400 text-sm">
                                            {new Date(user.created_at).toLocaleDateString('ko-KR')}
                                        </td>
                                    </tr>
                                ))}
                                {!users || users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            등록된 회원이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
