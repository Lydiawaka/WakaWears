import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

// Allow large payloads ONLY for product creation (images)

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Auth 
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Ensure seller owns a shop 
  const shop = await prisma.shop.findFirst({
    where: { ownerId: userId },
    select: {
      id: true,
      name: true,
    },
  });

  if (!shop) {
    return res.status(403).json({
      message: "You must have a shop to sell products",
    });
  }

  // POST — CREATE PRODUCT
  if (req.method === "POST") {
    try {
      const {
        title,
        description,
        price,
        category,
        subCategory,
        stock,
        images,
      } = req.body;

      if (!title || !price || !category) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      const slug =
        title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-") +
        "-" +
        Date.now();

      const product = await prisma.product.create({
        data: {
          title,
          description: description || null,
          price: Number(price),
          category,
          subCategory: subCategory || null,
          stock: Number(stock) || 0,
          images: images || [],
          shopId: shop.id,
          slug,
        },
      });

      return res.status(201).json({
        ...product,
        price: Number(product.price),
      });
    } catch (error) {
      console.error("Create product error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // GET — SELLER PRODUCT LIST
  if (req.method === "GET") {
    try {
      const { page = "1", limit = "10" } = req.query;

      const pageNumber = Math.max(parseInt(page as string, 10) || 1, 1);
      const limitNumber = Math.min(parseInt(limit as string, 10) || 10, 20);
      const skip = (pageNumber - 1) * limitNumber;

      const products = await prisma.product.findMany({
        where: { shopId: shop.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limitNumber + 1, // detect next page

        // IMPORTANT: controlled fields only
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          category: true,
          subCategory: true,
          stock: true,
          images: true, // seller needs images
          createdAt: true,
          updatedAt: true,
        },
      });

      const hasMore = products.length > limitNumber;
      const sliced = hasMore ? products.slice(0, limitNumber) : products;

      const serialized = sliced.map(({ price, ...rest }) => ({
        ...rest,
        price: Number(price),
      }));

      return res.status(200).json({
        products: serialized,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          hasMore,
        },
      });
    } catch (error) {
      console.error("Fetch seller products error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // ---- Method not allowed ----
  res.setHeader("Allow", ["POST", "GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
