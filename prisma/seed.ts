import { prisma } from "../src/lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
    const email = process.env.ADMIN_EMAIL || "admin@luxemarket.com"
    const password = process.env.ADMIN_PASSWORD || "admin123"

    const existingAdmin = await prisma.admin.findUnique({ where: { email } })

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(password, 12)
        await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        })
        console.log(`✅ Admin created: ${email}`)
    } else {
        console.log(`ℹ️ Admin already exists: ${email}`)
    }

    // Seed some sample luxury products
    const products = [
        {
            title: "Rolex Submariner 126610LN",
            description: "O ícone dos relógios de mergulho. Caixa em Oystersteel 41mm, movimento automático de precisão, resistente a agua até 300 metros. Uma peça de arte que transcende o tempo.",
            price: 68500,
            imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
            category: "Relógios",
            isFeatured: true,
        },
        {
            title: "Bolsa Hermès Birkin 35",
            description: "A bolsa Birkin é um símbolo atemporal de luxo e exclusividade. Fabricada à mão por artesãos experientes em couro Togo genuíno com hardware dourado. Uma peça que nunca perde valor.",
            price: 145000,
            imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            category: "Bolsas",
            isFeatured: true,
        },
        {
            title: "Viagem: Maldivas Private Island",
            description: "7 noites em uma villa privativa overwater com mordomo exclusivo, transfers em hidroavião privado, jantar à la chandelle na praia e experiências de mergulho personalizadas.",
            price: 89000,
            imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
            category: "Viagens",
            isFeatured: true,
        },
        {
            title: "Ferrari SF90 Stradale",
            description: "O primeiro superesportivo híbrido plug-in da Ferrari. Motor V8 biturbo + 3 motores elétricos, 1000 cv, 0-100 km/h em 2,5 segundos. O ápice da engenharia italiana.",
            price: 4200000,
            imageUrl: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
            category: "Automóveis",
            isFeatured: false,
        },
        {
            title: "Colar Cartier Love Necklace",
            description: "Colar icônico da coleção Love da Cartier em ouro amarelo 18k com diamantes VVS1. Um símbolo de amor eterno e comprometimento, criado pelo designer Aldo Cipullo.",
            price: 32000,
            imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
            category: "Joias",
            isFeatured: false,
        },
        {
            title: "Viagem: Safari Privado Kenya",
            description: "10 dias em lodges exclusivos no Masai Mara com guias especializados, voos em avião privado entre parques nacionais, e jantar sob as estrelas na savana africana.",
            price: 120000,
            imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
            category: "Viagens",
            isFeatured: false,
        },
    ]

    for (const product of products) {
        const existing = await prisma.product.findFirst({ where: { title: product.title } })
        if (!existing) {
            await prisma.product.create({ data: product })
        }
    }

    console.log(`✅ ${products.length} products seeded.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
