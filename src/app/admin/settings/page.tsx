'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, Save, Loader2 } from 'lucide-react'

interface ContentBlock {
    id: string
    key: string
    value: string
    label: string
    description: string | null
}

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
    const supabase = createClient()

    useEffect(() => {
        loadContentBlocks()
    }, [])

    const loadContentBlocks = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('content_blocks')
            .select('*')
            .order('key')

        if (data) {
            setContentBlocks(data)
        }
        setLoading(false)
    }

    const handleValueChange = (key: string, newValue: string) => {
        setContentBlocks(prev =>
            prev.map(block =>
                block.key === key ? { ...block, value: newValue } : block
            )
        )
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            for (const block of contentBlocks) {
                await supabase
                    .from('content_blocks')
                    .update({ value: block.value })
                    .eq('key', block.key)
            }
            alert('설정이 저장되었습니다.')
        } catch (error) {
            console.error('Save error:', error)
            alert('저장 중 오류가 발생했습니다.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
        )
    }

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">서버 설정</h1>
                    <p className="text-gray-400">플랫폼 전반의 설정을 관리합니다</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            저장 중...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            저장
                        </>
                    )}
                </Button>
            </div>

            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Settings className="w-5 h-5 text-purple-500" />
                        콘텐츠 편집 (CMS)
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        사용자에게 표시되는 텍스트를 수정할 수 있습니다.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {contentBlocks.map(block => (
                        <div key={block.key} className="space-y-2">
                            <Label htmlFor={block.key} className="text-white">
                                {block.label}
                            </Label>
                            {block.description && (
                                <p className="text-sm text-gray-500">{block.description}</p>
                            )}
                            <Input
                                id={block.key}
                                value={block.value}
                                onChange={(e) => handleValueChange(block.key, e.target.value)}
                                className="bg-black border-gray-700 text-white"
                            />
                        </div>
                    ))}

                    {contentBlocks.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            설정 가능한 콘텐츠 블록이 없습니다.
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">보안 설정</CardTitle>
                    <CardDescription className="text-gray-400">
                        2단계 인증 및 관리자 권한 설정
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-gray-400">
                        <p className="mb-2">2FA (2단계 인증) 설정은 Supabase 대시보드에서 관리할 수 있습니다.</p>
                        <a
                            href="https://supabase.com/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                        >
                            Supabase 대시보드 열기 →
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
