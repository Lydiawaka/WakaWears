import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"])
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const limitParam = Number(req.query.limit)
    const limit = Math.min(Math.max(limitParam || 8, 1), 12)

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        images: true,
        category: true,
        createdAt: true,
        shop: {
          select: {
            name: true,
            slug: true,
            isVerified: true,
          },
        },
      },
    })

    // Serialize price + shape response
    const serialized = products.map(({ price, ...p }) => ({
      ...p,
      price: Number(price),
      image: p.images?.[0] ?? null,
    }))

    // Cache for 60 seconds (safe for trending)
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    )

    return res.status(200).json({
      products: serialized,
    })
  } catch (error) {
    console.error("Trending Products Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
