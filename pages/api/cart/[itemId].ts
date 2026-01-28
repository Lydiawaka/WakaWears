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

  const { itemId } = req.query;

  if (!itemId || typeof itemId !== "string") {
    return res.status(400).json({ error: "Invalid Item ID" });
  }

  // Verify item belongs to user's cart
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!cartItem || cartItem.cart.userId !== userId) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (req.method === "PUT") {
    const { quantity } = req.body;
    if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
    }

    const updated = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity }
    });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.cartItem.delete({
        where: { id: itemId }
    });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
