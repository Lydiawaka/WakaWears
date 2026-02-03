import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  if (req.method === "POST") {
    try {
      const { name, description } = req.body;

      // Check if user already has a shop
      const existingShop = await prisma.shop.findFirst({
        where: {
          ownerId: userId,
        },
      });

      if (existingShop) {
        return res.status(400).json({ message: "User already owns a shop" });
      }

      // Check for name availability
      const existingName = await prisma.shop.findUnique({
          where: { name }
      });
      if (existingName) {
          return res.status(400).json({ message: "Shop name already taken" });
      }

      // Fetch user to get businessId
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { businessId: true },
      });

      if (!user?.businessId) {
        return res.status(400).json({ message: "User does not belong to a business. Please register a business first." });
      }

      // Create shop and optionally sync role
      // For now, we just create the shop. The User record might need to be created if it doesn't exist yet via webhook,
      // but assuming we are just linking by string ID:
      const shop = await prisma.shop.create({
        data: {
          name,
          description,
          ownerId: userId,
          businessId: user.businessId,
          slug: name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-') + '-' + Math.floor(Math.random() * 1000),
        },
      });
      // TODO: Update user role and shopId if strictly needed for caching, though we rely on DB now.



      return res.status(201).json(shop);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
