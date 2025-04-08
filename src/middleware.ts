import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  // Check if this is a protected route
  const isProtectedRoute = ['/profile', '/orders', '/checkout'].some(
    (path) => request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedRoute && !token) {
    // Redirect to login if trying to access protected route without authentication
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

// Configure which routes this middleware applies to
export const config = {
  matcher: ['/profile/:path*', '/orders/:path*', '/checkout/:path*']
}
