import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Package, ShoppingBag, TrendingUp, Plus } from "lucide-react"

export default async function AdminDashboard() {
    const [productCount, orderCount] = await Promise.all([
        prisma.product.count(),
        prisma.order.count(),
    ])

    const recentProducts = await prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    })

    const stats = [
        { icon: Package, label: "Produtos", value: productCount, color: "text-amber-400", bg: "bg-amber-500/10" },
        { icon: ShoppingBag, label: "Pedidos", value: orderCount, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { icon: TrendingUp, label: "Receita", value: "—", color: "text-blue-400", bg: "bg-blue-500/10" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                    <p className="text-neutral-400 text-sm mt-1">Visão geral da sua loja</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" /> Novo Produto
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                        <div className={`inline-flex p-2 rounded-lg ${s.bg} mb-3`}>
                            <s.icon className={`w-5 h-5 ${s.color}`} />
                        </div>
                        <p className="text-3xl font-bold text-white">{s.value}</p>
                        <p className="text-sm text-neutral-400 mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Products */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-neutral-800">
                    <h2 className="font-semibold text-white">Produtos Recentes</h2>
                    <Link href="/admin/products" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                        Ver todos →
                    </Link>
                </div>
                <div className="divide-y divide-neutral-800">
                    {recentProducts.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-neutral-800/50 transition-colors">
                            <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{p.title}</p>
                                <p className="text-xs text-neutral-400">{p.category}</p>
                            </div>
                            <p className="text-sm font-semibold text-amber-400">
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(p.price)}
                            </p>
                        </div>
                    ))}
                    {recentProducts.length === 0 && (
                        <p className="text-center text-neutral-500 py-8">Nenhum produto cadastrado ainda.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
