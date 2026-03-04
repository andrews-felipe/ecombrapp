'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
    { href: "/products", label: "Coleção" },
    { href: "/products?category=Relógios", label: "Relógios" },
    { href: "/products?category=Viagens", label: "Viagens" },
    { href: "/products?category=Joias", label: "Joias" },
]

export default function Navbar() {
    const { itemCount, openCart } = useCart()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handler)
        return () => window.removeEventListener("scroll", handler)
    }, [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/50" : "bg-transparent"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                        <span className="text-black font-bold text-sm">G</span>
                    </div>
                    <span className="font-serif text-xl tracking-wide text-white hidden sm:block">
                        GUARDIAN <span className="text-amber-400">FINANCE LTDA</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-neutral-400 hover:text-white transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={openCart}
                        className="relative flex items-center gap-2 text-neutral-300 hover:text-white transition-colors p-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {itemCount > 0 && (
                            <motion.span
                                key={itemCount}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center"
                            >
                                {itemCount}
                            </motion.span>
                        )}
                    </button>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-neutral-300 hover:text-white"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 overflow-hidden"
                    >
                        <nav className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-sm text-neutral-400 hover:text-white py-2 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
