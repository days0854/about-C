import Link from 'next/link'
import { Award } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-black text-gray-400">
            <div className="container px-4 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Award className="h-6 w-6 text-white" />
                            <span className="text-lg font-bold text-white">AboutAcademy</span>
                        </Link>
                        <p className="text-sm text-gray-400">
                            인공지능 시대, 대체 불가능한 보안 전문가를 양성합니다.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/templates" className="hover:text-foreground transition-colors">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="/preview" className="hover:text-foreground transition-colors">
                                    Create Certificate
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-foreground transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-foreground transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} AboutAcademy. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Link href="https://youtube.com" className="hover:text-white transition-colors">
                            YouTube
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
