import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query || query.trim() === '') {
      return NextResponse.json([])
    }
    
    // Search for products that match the query in title or category
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } }
        ]
      }
    })
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Error searching products' }, { status: 500 })
  }
}
