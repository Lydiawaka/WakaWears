import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  // Ensure user is seller and has a shop
  // We check DB for shop ownership
  const shop = await prisma.shop.findFirst({
      where: { ownerId: userId },
      include: { business: true }
  });

  if (!shop) {
      return res.status(403).json({ message: "You must have a shop to sell products" });
  }

  if (req.method === "POST") {
    try {
      const { title, description, price, category, subCategory, stock, images } = req.body;

      if (!title || !price || !category) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await prisma.product.create({
        data: {
          title,
          description,
          price: parseFloat(price),
          category,
          subCategory,
          stock: parseInt(stock) || 0,
          images: images || [],
          shopId: shop.id,
          slug: title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-') + '-' + Math.floor(Math.random() * 1000),
        },
      });

      return res.status(201).json({
          ...product,
          price: Number(product.price)
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  // Implement GET for listing own products
  else if (req.method === "GET") {
      try {
          const products = await prisma.product.findMany({
              where: { shopId: shop.id },
              orderBy: { createdAt: 'desc' }
          });
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const serialized = products.map((p: { price: any; }) => ({
              ...p,
              price: Number(p.price)
          }));

          return res.status(200).json(serialized);
      } catch {
          return res.status(500).json({ message: "Internal Server Error"});
      }
  }

  res.setHeader("Allow", ["POST", "GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
