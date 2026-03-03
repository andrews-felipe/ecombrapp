import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(products)
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const body = await req.json()
        const { title, description, price, imageUrl, category, isFeatured } = body
        if (!title || !description || !price || !imageUrl || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }
        const product = await prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                imageUrl,
                category,
                isFeatured: isFeatured ?? false,
            },
        })
        return NextResponse.json(product, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }
}
