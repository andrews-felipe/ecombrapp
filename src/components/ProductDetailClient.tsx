'use client'

import { motion } from "framer-motion"
import { ShoppingBag, ArrowLeft, Star, Shield, Truck } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import ProductCard from "@/components/ProductCard"

interface Product {
    id: string
    title: string
    description: string
    price: number
    imageUrl: string
    category: string
    isFeatured: boolean
}

interface Props {
    product: Product
    related: Product[]
}

export default function ProductDetailClient({ product, related }: Props) {
    const { addItem } = useCart()
    const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v)

    const handleAddToCart = () => {
        addItem({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl })
    }

    return (
        <div className="min-h-screen bg-neutral-950 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                    <Link href="/" className="hover:text-white transition-colors">Início</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-white transition-colors">Coleção</Link>
                    <span>/</span>
                    <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-white transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span className="text-neutral-300 truncate max-w-xs">{product.title}</span>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden aspect-square">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Floating badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-amber-500/20 rounded-full px-3 py-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-amber-300 text-xs font-medium">{product.category}</span>
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        <Link
                            href="/products"
                            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-300 transition-colors mb-6 w-fit"
                        >
                            <ArrowLeft className="w-4 h-4" /> Voltar à coleção
                        </Link>

                        <span className="text-amber-400 text-sm tracking-widest uppercase font-medium mb-3">
                            {product.category}
                        </span>

                        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                            {product.title}
                        </h1>

                        <p className="text-neutral-400 leading-relaxed text-base mb-8">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6">
                            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-1">Preço</p>
                            <p className="font-serif text-4xl font-bold text-amber-400">{fmt(product.price)}</p>
                            <p className="text-xs text-neutral-500 mt-2">Ou entre em contato para condições especiais</p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl py-4 transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Adicionar ao Carrinho
                            </button>
                        </div>

                        {/* Trust signals */}
                        <div className="space-y-3">
                            {[
                                { icon: Shield, text: "Autenticidade 100% verificada e garantida" },
                                { icon: Truck, text: "Entrega discreta e segura em todo o Brasil" },
                                { icon: Star, text: "Suporte VIP dedicado ao seu atendimento" },
                            ].map((item) => (
                                <div key={item.text} className="flex items-center gap-3 text-sm text-neutral-400">
                                    <item.icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-serif text-3xl font-bold text-white">Você também pode gostar</h2>
                            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                                Ver todos em {product.category} →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
