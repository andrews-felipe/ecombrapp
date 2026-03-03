'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, Star } from "lucide-react"
import { motion } from "framer-motion"

interface Product {
    id: string
    title: string
    price: number
    category: string
    isFeatured: boolean
    imageUrl: string
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState<string | null>(null)

    const fetchProducts = async () => {
        const res = await fetch("/api/admin/products")
        const data = await res.json()
        setProducts(data)
        setLoading(false)
    }

    useEffect(() => { fetchProducts() }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return
        setDeleting(id)
        await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
        setProducts((prev) => prev.filter((p) => p.id !== id))
        setDeleting(null)
    }

    const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Produtos</h1>
                    <p className="text-neutral-400 text-sm mt-1">{products.length} produtos cadastrados</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" /> Novo Produto
                </Link>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-800 text-left">
                                <th className="text-xs font-medium text-neutral-400 uppercase tracking-wider p-4 w-12"></th>
                                <th className="text-xs font-medium text-neutral-400 uppercase tracking-wider p-4">Produto</th>
                                <th className="text-xs font-medium text-neutral-400 uppercase tracking-wider p-4">Categoria</th>
                                <th className="text-xs font-medium text-neutral-400 uppercase tracking-wider p-4">Preço</th>
                                <th className="text-xs font-medium text-neutral-400 uppercase tracking-wider p-4">Destaque</th>
                                <th className="text-xs font-medium text-neutral-400 uppercase tracking-wider p-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {products.map((p, i) => (
                                <motion.tr
                                    key={p.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-neutral-800/40 transition-colors"
                                >
                                    <td className="p-4">
                                        <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-medium text-white">{p.title}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-xs bg-neutral-800 text-neutral-300 rounded-full px-2 py-1">{p.category}</span>
                                    </td>
                                    <td className="p-4 text-sm text-amber-400 font-medium">{fmt(p.price)}</td>
                                    <td className="p-4">
                                        <Star className={`w-4 h-4 ${p.isFeatured ? "text-amber-400 fill-amber-400" : "text-neutral-600"}`} />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/products/${p.id}`}
                                                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                disabled={deleting === p.id}
                                                className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                {deleting === p.id ? (
                                                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center text-neutral-500 py-12">
                                        Nenhum produto cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
