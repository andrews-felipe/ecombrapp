import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email as string },
                })

                if (!admin) return null

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    admin.password
                )

                if (!passwordMatch) return null

                return {
                    id: admin.id,
                    email: admin.email,
                }
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string
            }
            return session
        },
    },
})
