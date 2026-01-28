import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;

    // Resolve Prisma User
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
  
    if (!user) {
        return res.status(404).json({ message: 'User account not found' });
    }

    // Get the user's shop
    const shop = await prisma.shop.findFirst({
      where: { ownerId: user.id },
    });

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found for this user' });
    }

    // Fetch products
    const products = await prisma.product.findMany({
      where: { shopId: shop.id },
      orderBy: { createdAt: 'desc' }
    });

    // Format for frontend
    const formattedProducts = products.map(product => ({
      id: product.id,
      title: product.title,
      category: product.category,
      price: Number(product.price), // Decimal to number
      stock: product.stock,
      images: product.images
    }));

    return res.status(200).json(formattedProducts);

  } catch (error) {
    console.error('Products Fetch Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
