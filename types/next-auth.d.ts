import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string
      role: 'superadmin' | 'admin' | 'writer'
    } & DefaultSession['user']
  }
  interface User {
    _id: string
    role: 'superadmin' | 'admin' | 'writer'
  }
}
