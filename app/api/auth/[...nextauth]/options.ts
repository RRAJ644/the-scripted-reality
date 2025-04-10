import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/db'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'johnsmit@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: any): Promise<any> {
        await connectToDatabase()
        try {
          const user = await User.findOne({
            email: credentials.email,
          })

          if (!user) {
            throw new Error('No user found with this email')
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordCorrect) {
            throw new Error('Incorrect password')
          }

          return user
        } catch (error: any) {
          throw new Error(error)
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
      }
      return session
    },
    async jwt({ token, user }) {
      console.log(user)
      if (user) {
        token._id = user?._id.toString()
        token.role = user?.role
      }
      return token
    },
  },
}
