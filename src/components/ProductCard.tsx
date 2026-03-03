'use client'

import { motion } from "framer-motion"
import { ShoppingBag, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

interface Product {
    id: string
    title: string
    price: number
    imageUrl: string
    category: string
    isFeatured: boolean
}

interface ProductCardProps {
    product: Product
    index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem } = useCart()
    const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v)

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden luxury-card-hover"
        >
            {/* Image */}
            <Link href={`/products/${product.id}`} className="block relative h-64 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="text-xs bg-black/50 backdrop-blur-sm border border-white/10 text-neutral-200 rounded-full px-3 py-1">
                        {product.category}
                    </span>
                </div>

                {/* Wishlist */}
                <button className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-neutral-300 hover:text-amber-400 transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4" />
                </button>
            </Link>

            {/* Content */}
            <div className="p-5">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-serif text-lg text-white font-semibold leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Preço</p>
                        <p className="text-xl font-bold text-amber-400">{fmt(product.price)}</p>
                    </div>
                    <button
                        onClick={() => addItem({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl })}
                        className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-500 text-amber-300 hover:text-black rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 group/btn"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span className="hidden sm:block">Adicionar</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
