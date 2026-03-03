import Link from "next/link"
import { XCircle, ArrowLeft } from "lucide-react"

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
                    <XCircle className="w-10 h-10 text-red-400" />
                </div>
                <h1 className="font-serif text-4xl font-bold text-white mb-4">Pagamento Cancelado</h1>
                <p className="text-neutral-400 leading-relaxed mb-10">
                    Seu pagamento foi cancelado. Seus itens ainda estão guardados no carrinho — volte quando quiser finalizar sua compra.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-full transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar à Loja
                </Link>
            </div>
        </div>
    )
}
