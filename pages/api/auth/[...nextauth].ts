import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            business: true
          }
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
        if (trigger === "update" && session?.name) {
            token.name = session.name
        }

        if (user) {
            token.id = user.id
            // @ts-ignore
            token.role = user.role
             // @ts-ignore
            token.businessId = user.businessId
             // @ts-ignore
            token.shopName = user.business?.name
        }
        return token
    },
    async session({ session, token }) {
        if (session.user) {
             // @ts-ignore
            session.user.id = token.id
             // @ts-ignore
            session.user.role = token.role
             // @ts-ignore
            session.user.businessId = token.businessId
             // @ts-ignore
            session.user.shopName = token.shopName
        }
        return session
    }
  },
  pages: {
    signIn: '/seller/login',
    error: '/seller/login', // params error=...
  },
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)
