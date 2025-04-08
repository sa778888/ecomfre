import NextAuth, { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import prisma from "@/lib/prisma"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify credentials exist
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        // If user is not found or no hashedPassword, return null
        if (!user || !user.hashedPassword) {
          return null
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await compare(
          credentials.password as string,
          user.hashedPassword as string
        )

        if (!isPasswordValid) return null

        // Return the user information for the session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    }
  }
}  

// Create the NextAuth handler
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
