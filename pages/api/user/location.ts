import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  const { latitude, longitude } = req.body;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        latitude,
        longitude,
        lastSeen: new Date(),
        isOnline: true, // Implicitly online if sending location
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Location Update Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
