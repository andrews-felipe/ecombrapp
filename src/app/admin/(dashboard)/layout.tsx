import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminLayoutShell from "@/components/admin/AdminLayoutShell"
import { SessionProvider } from "next-auth/react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) redirect("/admin/login")

    return (
        <SessionProvider>
            <AdminLayoutShell>
                {children}
            </AdminLayoutShell>
        </SessionProvider>
    )
}
