import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    })
    
    // Return user without password
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
