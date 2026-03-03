'use client'

import { signOut, useSession } from "next-auth/react"
import { LogOut, User } from "lucide-react"

export default function AdminHeader() {
    const { data: session } = useSession()

    return (
        <header className="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6">
            <div />
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <User className="w-4 h-4" />
                    <span>{session?.user?.email}</span>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </div>
        </header>
    )
}
