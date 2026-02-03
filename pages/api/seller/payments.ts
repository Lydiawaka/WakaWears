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

    // Get the user's shop
    const shop = await prisma.shop.findFirst({
      where: { ownerId: userId },
    });

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found for this user' });
    }

    // Calculate aggregations
    const [totalBalanceAgg, pendingClearanceAgg] = await Promise.all([
      // Total Balance: Sum of PAID/SHIPPED/DELIVERED
      prisma.order.aggregate({
        where: { 
          shopId: shop.id,
          status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }
        },
        _sum: { totalAmount: true }
      }),
      // Pending Clearance: Sum of PENDING
      prisma.order.aggregate({
        where: { 
          shopId: shop.id,
          status: 'PENDING'
        },
        _sum: { totalAmount: true }
      })
    ]);

    const stats = {
      totalBalance: Number(totalBalanceAgg._sum.totalAmount || 0),
      pendingClearance: Number(pendingClearanceAgg._sum.totalAmount || 0),
      totalWithdrawn: 0, // Not implemented yet
      payouts: [], // Not implemented yet
      paymentMethods: [] // Not implemented yet
    };

    return res.status(200).json(stats);

  } catch (error) {
    console.error('Payments Fetch Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
