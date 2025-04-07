import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'
    const trending = searchParams.get('trending') === 'true'
    const newArrival = searchParams.get('newArrival') === 'true'
    const topRated = searchParams.get('topRated') === 'true'
    const dealOfDay = searchParams.get('dealOfDay') === 'true'

    let whereClause: any = {}
    
    if (category) whereClause.category = category
    if (featured) whereClause.featured = featured
    if (trending) whereClause.trending = trending
    if (newArrival) whereClause.newArrival = newArrival
    if (topRated) whereClause.topRated = topRated
    if (dealOfDay) whereClause.dealOfDay = dealOfDay

    const products = await prisma.product.findMany({
      where: whereClause,
    })

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}
