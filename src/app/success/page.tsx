import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h1 className="font-serif text-4xl font-bold text-white mb-4">Compra Realizada!</h1>
                <p className="text-neutral-400 leading-relaxed mb-2">
                    Obrigado pela sua compra. Você receberá uma confirmação por email em breve.
                </p>
                <p className="text-neutral-500 text-sm mb-10">
                    Nossa equipe VIP entrará em contato para coordenar a entrega de forma personalizada.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-full transition-colors group"
                >
                    Continuar Explorando
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    )
}
