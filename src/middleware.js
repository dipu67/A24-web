import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip authentication for the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    const adminToken = request.cookies.get('admin_token')

    // Redirect to login if not authenticated
    if (!adminToken || adminToken.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 