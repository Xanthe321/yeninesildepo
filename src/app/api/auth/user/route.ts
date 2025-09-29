import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get user from server-side session (secure)
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Return minimal user data - only what's needed for UI
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role // Safe to send role for UI decisions
      }
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}