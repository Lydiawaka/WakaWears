import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
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

    // Fetch orders
    const orders = await prisma.order.findMany({
      where: { shopId: shop.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      customer: order.user.name || 'Guest',
      email: order.user.email || 'No email',
      date: order.createdAt.toLocaleDateString(),
      // Mock payment method for now since it's not strictly tracked in every order type yet
      payment: 'Online', 
      status: order.status,
      total: Number(order.totalAmount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })
    }));

    return res.status(200).json(formattedOrders);

  } catch (error) {
    console.error('Orders Fetch Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
