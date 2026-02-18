'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { getCertifications, createCertification, updateCertification, deleteCertification, type Certification } from './actions'
import { useToast } from "@/components/ui/use-toast"

export default function CertificationsPage() {
    const [certifications, setCertifications] = useState<Certification[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [editingCert, setEditingCert] = useState<Certification | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        loadCertifications()
    }, [])

    async function loadCertifications() {
        try {
            const data = await getCertifications()
            setCertifications(data)
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to load certifications",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        try {
            if (editingCert) {
                await updateCertification(editingCert.id, formData)
                toast({ title: "Success", description: "Certification updated" })
            } else {
                await createCertification(formData)
                toast({ title: "Success", description: "Certification created" })
            }
            setIsOpen(false)
            setEditingCert(null)
            loadCertifications()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save certification",
                variant: "destructive",
            })
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure?')) return

        try {
            await deleteCertification(id)
            toast({ title: "Success", description: "Certification deleted" })
            loadCertifications()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete certification",
                variant: "destructive",
            })
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Certifications Management</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingCert(null)}>
                            <Plus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-[#111111] text-white border-white/10 max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingCert ? 'Edit Certification' : 'Add New Certification'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" name="is_active" value="true" />
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input name="title" defaultValue={editingCert?.title} required className="bg-white/5 border-white/10" placeholder="e.g. CISSP" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug</Label>
                                    <Input name="slug" defaultValue={editingCert?.slug} required className="bg-white/5 border-white/10" placeholder="e.g. cissp" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Subtitle</Label>
                                    <Input name="subtitle" defaultValue={editingCert?.subtitle} className="bg-white/5 border-white/10" placeholder="e.g. Certified Information Systems Security Professional" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Icon Name (Lucide)</Label>
                                    <Input name="icon_name" defaultValue={editingCert?.icon_name} required className="bg-white/5 border-white/10" placeholder="e.g. Shield" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Description</Label>
                                    <Textarea name="description" defaultValue={editingCert?.description} className="bg-white/5 border-white/10 min-h-[100px]" placeholder="Certification description..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Text Color Class</Label>
                                    <Input name="color" defaultValue={editingCert?.color} placeholder="text-purple-400" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Bg Color Class</Label>
                                    <Input name="bg_color" defaultValue={editingCert?.bg_color} placeholder="bg-purple-400/10" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Border Color Class</Label>
                                    <Input name="border_color" defaultValue={editingCert?.border_color} placeholder="border-purple-400/20" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="flex items-center space-x-2 pt-4">
                                    <Switch name="is_active" defaultChecked={editingCert?.is_active ?? true} id="is_active" />
                                    <Label htmlFor="is_active">Active Status</Label>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {certifications.map((cert) => (
                    <Card key={cert.id} className="bg-[#111111] border-white/10 text-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">
                                {cert.title}
                                <span className="ml-2 text-sm font-normal text-gray-400">({cert.slug})</span>
                            </CardTitle>
                            <div className="flex gap-2">
                                <Button size="icon" variant="ghost" onClick={() => {
                                    setEditingCert(cert)
                                    setIsOpen(true)
                                }}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(cert.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-400">{cert.description}</p>
                            <div className="mt-2 flex gap-2">
                                {cert.is_active ? (
                                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">Active</span>
                                ) : (
                                    <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded">Inactive</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
