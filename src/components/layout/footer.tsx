import Link from 'next/link'
import { Award, Github, Youtube } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#050505] text-gray-400 font-sans">
            <div className="container px-4 py-16 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        <Link href="/about" className="flex items-center space-x-2 w-fit hover:opacity-80 transition-opacity">
                            <Award className="h-8 w-8 text-blue-500" />
                            <span className="text-2xl font-bold text-white tracking-tight">AboutAcademy</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-md break-keep">
                            인공지능 시대, AI가 대체할 수 없는<br />
                            <span className="text-gray-300 font-medium">최상위 1% 보안 전문가</span>를 양성합니다.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="https://youtube.com" className="bg-white/5 p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="bg-white/5 p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Service */}
                    <div>
                        <h4 className="font-bold text-white mb-6">프로그램</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/templates" className="hover:text-blue-400 transition-colors">자격증 로드맵</Link></li>
                            <li><Link href="/exams" className="hover:text-blue-400 transition-colors">실전 모의고사</Link></li>
                            <li><Link href="/coaching" className="hover:text-blue-400 transition-colors">1:1 커리어 코칭</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-white mb-6">고객센터</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/faq" className="hover:text-blue-400 transition-colors">자주 묻는 질문</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">문의하기</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">이용약관</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors font-medium">개인정보처리방침</Link></li>
                        </ul>
                    </div>
                </div>

                <Separator className="bg-white/10 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm text-gray-500">
                    <div className="space-y-2">
                        <p>상호명: 어바웃아카데미</p>
                        <p>사업자등록번호: 000-00-00000 | 통신판매업신고: 2024-서울-0000</p>
                        <p>주소: 서울특별시 ...</p>
                        <p className="mt-4 text-xs text-gray-600">Copyright © {new Date().getFullYear()} AboutAcademy. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
