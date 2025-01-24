import { db } from "@/server/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig, User } from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import { ZodError } from "zod"
import bcrypt from "bcrypt"
import { Adapter } from "next-auth/adapters"
import { Role } from "@prisma/client"

export const BASE_PATH = "/api/auth"

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db) as Adapter,
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          let user = null

          const { email, password } = await signInSchema.parseAsync(credentials)
          console.log("email", email, password)

          user = await db.user.findUnique({
            where: {
              email: email,
            },
          })
          if (user && user.password && credentials?.password) {
            const isValid = await bcrypt.compare(password, user.password)
            if (isValid) {
              return user
            }
          }
          throw new Error("Invalid email or password")
        } catch (error) {
          console.log("asd", error)

          if (error instanceof ZodError) {
            return null
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && token) {
        token.id = user.id as string
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
      }
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
