import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import ProductCard from "@/components/ProductCard"

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 3,
  })

  const categories = ["Relógios", "Bolsas", "Joias", "Viagens", "Automóveis"]

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950" />

        {/* Glow effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs text-amber-300 tracking-widest uppercase font-medium">
              Curadoria Exclusiva de Luxo
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white mb-6">
            O Extraordinário,{" "}
            <span className="text-gold-gradient">ao seu alcance</span>
          </h1>

          <p className="text-neutral-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Descubra relógios suíços raros, viagens personalizadas em destinos exclusivos, joias únicas e muito mais — para quem exige apenas o melhor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-full transition-colors group text-sm tracking-wide"
            >
              Explorar Coleção
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products?category=Viagens"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-8 py-4 rounded-full transition-colors text-sm"
            >
              Viagens de Luxo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-20 max-w-md mx-auto">
            {[
              { value: "500+", label: "Produtos Curados" },
              { value: "50+", label: "Marcas Exclusivas" },
              { value: "100%", label: "Autenticidade" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-amber-400 font-serif">{s.value}</p>
                <p className="text-xs text-neutral-400 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-neutral-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Categorias Exclusivas</h2>
          <p className="text-neutral-400 text-lg">Selecione sua preferência e explore o melhor do luxo</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="px-6 py-3 border border-neutral-700 hover:border-amber-500/50 hover:bg-amber-500/5 text-neutral-300 hover:text-amber-300 rounded-full text-sm font-medium transition-all duration-200"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="/products"
            className="px-6 py-3 border border-amber-500/30 bg-amber-500/10 text-amber-300 rounded-full text-sm font-medium"
          >
            Ver Todos
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-10 pb-24 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-amber-400 text-sm tracking-widest uppercase font-medium mb-2">Seleção Especial</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">Peças em Destaque</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-300 transition-colors group"
            >
              Ver coleção completa
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
              Ver coleção completa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Value proposition */}
      <section className="border-t border-neutral-800 py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { title: "Autenticidade Garantida", desc: "Todos os produtos são verificados e certificados pelos nossos especialistas." },
            { title: "Entrega Discreta", desc: "Embalagem premium e entrega segura, onde quer que você esteja no Brasil." },
            { title: "Atendimento VIP", desc: "Consultores dedicados disponíveis para auxiliar em sua escolha exclusiva." },
          ].map((item) => (
            <div key={item.title} className="p-6">
              <div className="w-px h-8 bg-gradient-to-b from-amber-500 to-transparent mx-auto mb-4" />
              <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xs">L</span>
            </div>
            <span className="font-serif text-white">LuxeMarket</span>
          </div>
          <p className="text-neutral-500 text-sm">© 2026 LuxeMarket. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <span>Privacidade</span>
            <span>Termos</span>
            <span>Contato</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
