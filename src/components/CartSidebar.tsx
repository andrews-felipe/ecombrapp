'use client'

import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useState } from "react"

export default function CartSidebar() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } = useCart()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v)

    const handleCheckout = async () => {
        if (!email) {
            alert("Por favor, informe seu email para continuar.")
            return
        }
        setLoading(true)
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, customerEmail: email }),
            })
            const data = await res.json()
            if (data.url) {
                clearCart()
                window.location.href = data.url
            } else {
                alert("Erro ao processar pagamento. Tente novamente.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-sm bg-neutral-900 border-l border-neutral-800 z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-amber-400" />
                                <h2 className="font-semibold text-white">Seu Carrinho</h2>
                                {items.length > 0 && (
                                    <span className="text-xs bg-amber-500/10 text-amber-400 rounded-full px-2 py-0.5">
                                        {items.length} {items.length === 1 ? "item" : "itens"}
                                    </span>
                                )}
                            </div>
                            <button onClick={closeCart} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                                    <ShoppingBag className="w-12 h-12 text-neutral-700 mb-4" />
                                    <p className="text-neutral-400 font-medium">Seu carrinho está vazio</p>
                                    <p className="text-neutral-600 text-sm mt-1">Explore nossa coleção exclusiva</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex gap-3 bg-neutral-800/50 rounded-xl p-3"
                                    >
                                        <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{item.title}</p>
                                            <p className="text-sm text-amber-400 font-semibold mt-0.5">{fmt(item.price)}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors flex-shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-neutral-800 p-5 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">Subtotal</span>
                                    <span className="text-white font-semibold">{fmt(total)}</span>
                                </div>

                                <div>
                                    <label className="block text-xs text-neutral-400 mb-1.5">Seu email (para confirmação)</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="seu@email.com"
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-semibold rounded-xl py-3.5 transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>Finalizar Compra — {fmt(total)}</>
                                    )}
                                </button>

                                <p className="text-xs text-neutral-500 text-center">
                                    Pagamento seguro via Stripe • SSL Certificado
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
