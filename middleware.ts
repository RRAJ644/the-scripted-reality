import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl

  if (request.nextUrl.pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (request.nextUrl.pathname === '/thoughts') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && url.pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (token && url.pathname.startsWith('/thoughts')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/sign-in', '/sign-up'],
}
