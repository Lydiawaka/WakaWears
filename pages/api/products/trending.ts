import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 8;

    // Fetch trending products (for now, simply the most recent ones)
    // In a real scenario, this could sort by views, sales, etc.
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        shop: {
          select: {
            name: true,
            slug: true,
            isVerified: true
          }
        }
      }
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error('Trending Products Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
