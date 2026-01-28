
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Testing database connection...')
    
    // Test 1: Check if Prisma can connect
    await prisma.$connect()
    console.log('Database connection successful')
    
    // Test 2: Get table counts
    const productCount = await prisma.product.count()
    const shopCount = await prisma.shop.count()
    
    console.log(`Product count: ${productCount}`)
    console.log(`Shop count: ${shopCount}`)
    
    // Test 3: Try a simple query
    const sampleProduct = await prisma.product.findFirst({
      include: { shop: true }
    })
    
    console.log('All database tests passed')
    
    res.status(200).json({
      success: true,
      message: 'Database connection successful',
      counts: {
        products: productCount,
        shops: shopCount
      },
      sampleProduct: sampleProduct || null,
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrl: process.env.DATABASE_URL 
          ? process.env.DATABASE_URL.substring(0, 20) + '...' // Show first 20 chars only
          : 'Not set'
      }
    })
    
  } catch (error: any) {
    console.error('Database test failed:', error)
    
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlLength: process.env.DATABASE_URL?.length || 0
      }
    })
  } finally {
    await prisma.$disconnect()
  }
}