import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

interface CheckoutItem {
    id: string
    title: string
    price: number
    quantity: number
    imageUrl: string
}

export async function POST(req: Request) {
    try {
        const { items, customerEmail } = await req.json()

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in cart" }, { status: 400 })
        }

        const lineItems = items.map((item: CheckoutItem) => ({
            price_data: {
                currency: "brl",
                product_data: {
                    name: item.title,
                    images: [item.imageUrl],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            customer_email: customerEmail,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            metadata: {
                items: JSON.stringify(items.map((i: CheckoutItem) => ({ id: i.id, quantity: i.quantity }))),
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error("Stripe error:", error)
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
    }
}
