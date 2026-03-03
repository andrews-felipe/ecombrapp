import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"
import CartSidebar from "@/components/CartSidebar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "LuxeMarket — Artigos de Luxo Exclusivos",
  description: "Descubra a mais refinada curadoria de produtos de luxo. Relógios, bolsas, joias, automóveis e viagens exclusivas para quem exige o melhor.",
  keywords: ["luxo", "produtos de luxo", "relógios", "joias", "viagens de luxo", "alta classe"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-neutral-950 text-white antialiased">
        <CartProvider>
          <Navbar />
          <CartSidebar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
