import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id; // Corrected to use ID

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate total amount in KES
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalAmount = cart.items.reduce((sum: number, item: any) => {
        return sum + (Number(item.product.price) * item.quantity);
    }, 0);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const email = user?.email;

    if (!email) {
        return res.status(400).json({ error: "User email not found" });
    }

    const amountInSubunits = Math.round(totalAmount * 100); 

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amountInSubunits,
        currency: "KES", // or standard currency
        callback_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/checkout/verify`,
        metadata: {
            cart_id: cart.id,
            user_id: userId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Paystack Init Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Payment processing failed" });
  }
}
