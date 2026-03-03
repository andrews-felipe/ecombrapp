import { prisma } from "@/lib/prisma"
import ProductCard from "@/components/ProductCard"
import ProductsFilter from "@/components/ProductsFilter"

interface SearchParams {
    category?: string
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const { category } = await searchParams

    const products = await prisma.product.findMany({
        where: category ? { category } : undefined,
        orderBy: { createdAt: "desc" },
    })

    const allCategories = await prisma.product.groupBy({
        by: ["category"],
        _count: { category: true },
    })

    return (
        <div className="min-h-screen bg-neutral-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-amber-400 text-sm tracking-widest uppercase font-medium mb-3">Nossa Coleção</p>
                    <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-4">
                        {category ? category : "Todos os Produtos"}
                    </h1>
                    <p className="text-neutral-400">
                        {products.length} {products.length === 1 ? "produto disponível" : "produtos disponíveis"}
                    </p>
                </div>

                {/* Filter */}
                <ProductsFilter
                    categories={allCategories.map((c) => c.category)}
                    currentCategory={category}
                />

                {/* Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-neutral-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                        {products.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
