'use client'

import { useRouter } from "next/navigation"

interface ProductsFilterProps {
    categories: string[]
    currentCategory?: string
}

export default function ProductsFilter({ categories, currentCategory }: ProductsFilterProps) {
    const router = useRouter()

    const handleSelect = (cat?: string) => {
        if (cat) {
            router.push(`/products?category=${encodeURIComponent(cat)}`)
        } else {
            router.push("/products")
        }
    }

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            <button
                onClick={() => handleSelect()}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!currentCategory
                        ? "bg-amber-500 text-black"
                        : "border border-neutral-700 text-neutral-400 hover:border-amber-500/50 hover:text-amber-300"
                    }`}
            >
                Todos
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleSelect(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currentCategory === cat
                            ? "bg-amber-500 text-black"
                            : "border border-neutral-700 text-neutral-400 hover:border-amber-500/50 hover:text-amber-300"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}
