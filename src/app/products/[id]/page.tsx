import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProductDetailClient from "@/components/ProductDetailClient"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) notFound()

    const related = await prisma.product.findMany({
        where: { category: product.category, NOT: { id } },
        take: 3,
    })

    return <ProductDetailClient product={product} related={related} />
}
