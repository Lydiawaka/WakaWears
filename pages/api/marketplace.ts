import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      limit = '8',
    } = req.query;

    // ---- Pagination (hard limits) ----
    const pageNumber = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNumber = Math.min(parseInt(limit as string, 10) || 8, 20);
    const skip = (pageNumber - 1) * limitNumber;

    // ---- Filters ----
    const where: any = {};

    if (typeof category === 'string' && category.trim()) {
      where.category = category;
    }

    if (typeof gender === 'string' && gender.trim()) {
      where.gender = gender;
    }

    if (typeof subCategory === 'string' && subCategory.trim()) {
      where.subCategory = subCategory;
    }

    // ---- Search (SAFE: no large text scan) ----
    if (typeof q === 'string' && q.trim()) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ];
    }

    // ---- Database Query (LIGHTWEIGHT SELECT) ----
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limitNumber + 1, // fetch one extra to detect next page
      orderBy: { createdAt: 'desc' },

      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        gender: true,
        category: true,
        subCategory: true,
        createdAt: true,

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

    // ---- Pagination metadata ----
    const hasMore = products.length > limitNumber;
    const slicedProducts = hasMore
      ? products.slice(0, limitNumber)
      : products;

    // ---- Serialize Decimal fields ----
    const serializedProducts = slicedProducts.map(
      ({ price, ...rest }) => ({
        ...rest,
        price: price ? Number(price) : 0,
      })
    );

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
    console.error('Marketplace API error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch marketplace products',
    });
  }
}
