'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, ImageIcon } from "lucide-react"
import Link from "next/link"

interface ProductFormData {
    title: string
    description: string
    price: string
    imageUrl: string
    category: string
    isFeatured: boolean
}

const CATEGORIES = ["Relógios", "Bolsas", "Joias", "Viagens", "Automóveis", "Casa & Decoração", "Moda", "Experiências"]

const defaultForm: ProductFormData = {
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "Relógios",
    isFeatured: false,
}

interface Props {
    productId?: string
}

export default function ProductForm({ productId }: Props) {
    const [form, setForm] = useState<ProductFormData>(defaultForm)
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(!!productId)
    const [error, setError] = useState("")
    const router = useRouter()
    const isEdit = !!productId

    useEffect(() => {
        if (!productId) return
        const fetchProduct = async () => {
            const res = await fetch(`/api/admin/products/${productId}`)
            const data = await res.json()
            setForm({
                title: data.title,
                description: data.description,
                price: String(data.price),
                imageUrl: data.imageUrl,
                category: data.category,
                isFeatured: data.isFeatured,
            })
            setFetchLoading(false)
        }
        fetchProduct()
    }, [productId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const url = isEdit ? `/api/admin/products/${productId}` : "/api/admin/products"
        const method = isEdit ? "PUT" : "POST"

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })

        setLoading(false)

        if (!res.ok) {
            const data = await res.json()
            setError(data.error || "Ocorreu um erro. Tente novamente.")
            return
        }

        router.push("/admin/products")
        router.refresh()
    }

    const inputClass = "w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
    const labelClass = "block text-sm text-neutral-300 mb-2"

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Link href="/admin/products" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        {isEdit ? "Editar Produto" : "Novo Produto"}
                    </h1>
                    <p className="text-neutral-400 text-sm mt-0.5">
                        {isEdit ? "Atualize as informações do produto" : "Preencha os dados para cadastrar um produto"}
                    </p>
                </div>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5"
            >
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                {/* Image Preview */}
                {form.imageUrl && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden">
                        <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
                    </div>
                )}

                <div>
                    <label className={labelClass}>URL da Imagem</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type="url"
                            value={form.imageUrl}
                            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                            required
                            className={`${inputClass} pl-10`}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Título do Produto</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                        className={inputClass}
                        placeholder="Ex: Rolex Submariner 126610LN"
                    />
                </div>

                <div>
                    <label className={labelClass}>Descrição</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Descrição detalhada do produto..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Preço (BRL)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            required
                            className={inputClass}
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Categoria</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className={inputClass}
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })}
                        className={`relative w-11 h-6 rounded-full transition-colors ${form.isFeatured ? "bg-amber-500" : "bg-neutral-700"}`}
                    >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.isFeatured ? "left-6" : "left-1"}`} />
                    </button>
                    <label className="text-sm text-neutral-300">Destacar na página inicial</label>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEdit ? "Salvar Alterações" : "Cadastrar Produto"}
                    </button>
                </div>
            </motion.form>
        </div>
    )
}
