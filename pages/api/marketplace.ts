// pages/api/marketplace.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('API called with query:', req.query);
    
    const { category, gender, subCategory, q, page = '1', limit = '20' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Build the where clause based on your actual schema
    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (gender) {
      where.gender = gender as string;
    }

    // Note: In your schema it's subCategory, not 'type'
    if (subCategory) {
      where.subCategory = subCategory as string;
    }

    if (q && typeof q === "string" && q.trim() !== "") {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
      ];
    }


    console.log('Where clause:', JSON.stringify(where, null, 2));

    try {
      // First, let's test a simple query
      console.log('Testing simple product query...');
      const testProducts = await prisma.product.findMany({
        take: 1,
        include: {
          shop: true
        }
      });
      console.log('Test query successful, found:', testProducts.length, 'products');

      // Now run the actual query
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            shop: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
                isVerified: true,
              },
            },
          },
          skip,
          take: limitNumber,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        prisma.product.count({ where }),
      ]);

      console.log(`Query successful: Found ${products.length} products`);

      // Serialize Decimal fields to numbers
      const serializedProducts = products.map((product) => ({
        ...product,
        price: product.price ? Number(product.price) : 0,
        shop: product.shop || null,
      }));

      return res.status(200).json({
        success: true,
        products: serializedProducts,
        pagination: {
          total,
          page: pageNumber,
          limit: limitNumber,
          pages: Math.ceil(total / limitNumber),
        },
      });
      
    } catch (dbError: any) {
      console.error('Database error details:', {
        message: dbError.message,
        code: dbError.code,
        meta: dbError.meta,
        stack: dbError.stack
      });
      
      return res.status(500).json({ 
        success: false,
        message: 'Database query failed',
        error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }
    
  } catch (error: any) {
    console.error('Marketplace API Error:', {
      message: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}