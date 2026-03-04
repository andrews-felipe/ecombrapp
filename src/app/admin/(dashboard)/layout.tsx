import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { SessionProvider } from "next-auth/react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) redirect("/admin/login")

    return (
        <SessionProvider>
            <div className="min-h-screen bg-neutral-950 flex">
                <AdminSidebar />
                <div className="flex-1 flex flex-col ml-64">
                    <AdminHeader />
                    <main className="flex-1 p-6 overflow-auto">{children}</main>
                </div>
            </div>
        </SessionProvider>
    )
}
