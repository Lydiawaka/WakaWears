
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      category,
      gender,
      subCategory,
      q,
      page = '1',
      limit = '20',
    } = req.query;

    const pageNumber = Math.max(parseInt(page as string, 10), 1);
    const limitNumber = Math.min(parseInt(limit as string, 10), 50);
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};

    if (category) where.category = category as string;
    if (gender) where.gender = gender as string;
    if (subCategory) where.subCategory = subCategory as string;

    if (typeof q === 'string' && q.trim()) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limitNumber + 1, 
      orderBy: { createdAt: 'desc' },
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
    });

    const hasMore = products.length > limitNumber;
    const slicedProducts = hasMore ? products.slice(0, limitNumber) : products;

    const serializedProducts = slicedProducts.map((product) => ({
      ...product,
      price: product.price ? Number(product.price) : 0,
    }));

    return res.status(200).json({
      success: true,
      products: serializedProducts,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        hasMore,
      },
    });

  } catch (error: any) {
    console.error('Marketplace API error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch marketplace products',
    });
  }
}
