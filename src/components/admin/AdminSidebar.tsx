'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Settings } from "lucide-react"

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produtos", icon: Package },
]

interface AdminSidebarProps {
    isOpen?: boolean
    setIsOpen?: (val: boolean) => void
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <aside className={`fixed left-0 top-0 h-screen w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            {/* Brand */}
            <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-sm">G</span>
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm">GUARDIAN FINANCE LTDA</p>
                        <p className="text-neutral-500 text-xs">Admin</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen?.(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-500 text-xs">
                    <Settings className="w-3 h-3" />
                    <span>GUARDIAN v1.0</span>
                </div>
            </div>
        </aside>
    )
}
