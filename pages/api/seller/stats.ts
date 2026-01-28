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

    // Parallelize queries for better performance
    const [
      totalOrders,
      pendingOrders,
      productsCount,
      recentOrders,
      // Calculate total revenue (sum of paid orders)
      revenueAgg
    ] = await Promise.all([
      // Total Orders
      prisma.order.count({
        where: { shopId: shop.id }
      }),
      // Pending Orders
      prisma.order.count({
        where: { 
          shopId: shop.id,
          status: 'PENDING'
        }
      }),
      // Total Products
      prisma.product.count({
        where: { shopId: shop.id }
      }),
      // Recent Orders - limit 5
      prisma.order.findMany({
        where: { shopId: shop.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          orderItems: {
            include: {
              product: true
            }
          },
          user: {
            select: { name: true, email: true }
          }
        }
      }),
      // Revenue
      prisma.order.aggregate({
        where: { 
          shopId: shop.id,
          status: {
            in: ['PAID', 'SHIPPED', 'DELIVERED']
          }
        },
        _sum: {
          totalAmount: true
        }
      })
    ]);

    // Format recent orders for dashboard
    const formattedRecentOrders = recentOrders.map(order => {
      // For display, we can show the first product name + "and X others" if multiple
      const firstItem = order.orderItems[0];
      const productName = firstItem 
        ? `${firstItem.product.title}${order.orderItems.length > 1 ? ` +${order.orderItems.length - 1} more` : ''}`
        : 'Unknown Product';

      return {
        id: order.id,
        product: productName,
        customer: order.user.name || order.user.email || 'Guest',
        date: order.createdAt.toLocaleDateString(),
        status: order.status,
        amount: Number(order.totalAmount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })
      };
    });

    const stats = {
      revenue: Number(revenueAgg._sum.totalAmount || 0),
      totalOrders,
      totalProducts: productsCount,
      pendingOrders,
      recentOrders: formattedRecentOrders
    };

    return res.status(200).json(stats);

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
