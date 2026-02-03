import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      let cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
            orderBy: {
                id: 'asc' // or updated at
            }
          },
        },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId,
          },
          include: { items: { include: { product: true } } },
        });
      }

      return res.status(200).json(cart);
    } catch (error) {
      console.error("Cart GET Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    const { productId, quantity = 1, size, color } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    try {
      // Ensure cart exists
      let cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
        });
      }

      // Upsert cart item
      const item = await prisma.cartItem.upsert({
        where: {
          cartId_productId_size_color: {
            cartId: cart.id,
            productId,
            size: size || null,
            color: color || null,
          },
        },
        update: {
          quantity: { increment: quantity },
        },
        create: {
          cartId: cart.id,
          productId,
          quantity,
          size: size || null,
          color: color || null,
        },
      });

      return res.status(200).json(item);
    } catch (error) {
      console.error("Cart POST Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
