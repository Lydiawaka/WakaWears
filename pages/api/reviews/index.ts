import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id; // Assuming id is added to session in [...nextauth].ts

  if (req.method === "POST") {
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }


    const { productId, rating, comment } = req.body;

    if (!productId || typeof rating !== "number") {
        return res.status(400).json({ error: "Missing fields" });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    try {
        const review = await prisma.review.create({
            data: {
                userId: userId,
                productId,
                rating,
                comment,
            },
            include: { user: { select: { name: true, image: true } } }
        });
        return res.status(200).json(review);
    } catch {
        return res.status(500).json({ error: "Failed to create review" });
    }
  }

  if (req.method === "GET") {
    const { productId } = req.query;
    if (!productId || typeof productId !== "string") {
        return res.status(400).json({ error: "Product ID required" });
    }

    const reviews = await prisma.review.findMany({
        where: { productId },
        include: {
            user: { select: { name: true, image: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json(reviews);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
