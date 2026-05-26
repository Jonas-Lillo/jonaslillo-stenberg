import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const cookie = req.cookies.get('jls_session')
    if (!cookie?.value) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
