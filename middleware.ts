import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  if (pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const protectedRoutes = [
    '/dashboard',
    '/thoughts',
    '/editor',
    '/dashboard/blogs',
    '/drafts',
    '/dashboard/scripts',
  ]

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/dashboard/:path*',
    '/editor',
    '/thoughts',
    '/drafts',
  ],
}
