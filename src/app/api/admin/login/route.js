import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// In a real app, use environment variables and proper hashing
const ADMIN_PASSWORD = 'admin123'

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      const cookieStore = cookies()
      
      // Set an HTTP-only cookie for authentication
      // In production, use proper JWT tokens and secure session management
      cookieStore.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid password' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
} 