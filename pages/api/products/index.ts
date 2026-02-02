import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

// Only allow large payloads for POST
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // METHOD GUARD
  if (!["GET", "POST"].includes(req.method || "")) {
    res.setHeader("Allow", ["GET", "POST"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  // AUTH
  const session = await getServerSession(req, res, authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // SHOP LOOKUP
  const shop = await prisma.shop.findFirst({
    where: { ownerId: userId },
    select: { id: true },
  })

  if (!shop) {
    return res.status(403).json({
      message: "You must have a shop to sell products",
    })
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
        images = [],
      } = req.body

      if (
        typeof title !== "string" ||
        typeof category !== "string" ||
        isNaN(Number(price))
      ) {
        return res.status(400).json({
          message: "Invalid or missing required fields",
        })
      }

      const slug =
        title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "") +
        "-" +
        Date.now()

      const product = await prisma.$transaction(async (tx) => {
        return tx.product.create({
          data: {
            title,
            description: description || null,
            price: Number(price),
            category,
            subCategory: subCategory || null,
            stock: Number(stock) || 0,
            images,
            shopId: shop.id,
            slug,
          },
        })
      })

      return res.status(201).json({
        ...product,
        price: Number(product.price),
      })
    } catch (error) {
      console.error("Create product error:", error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  // GET — SELLER PRODUCTS
  try {
    const { page = "1", limit = "10" } = req.query

    const pageNumber = Math.max(Number(page) || 1, 1)
    const limitNumber = Math.min(Number(limit) || 10, 20)
    const skip = (pageNumber - 1) * limitNumber

    const products = await prisma.product.findMany({
      where: { shopId: shop.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNumber + 1,
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        category: true,
        subCategory: true,
        stock: true,
        images: true,
        createdAt: true,
      },
    })

    const hasMore = products.length > limitNumber
    const sliced = hasMore ? products.slice(0, limitNumber) : products

    return res.status(200).json({
      products: sliced.map(({ price, ...p }) => ({
        ...p,
        price: Number(price),
      })),
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        hasMore,
      },
    })
  } catch (error) {
    console.error("Fetch products error:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
