import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ error: "Missing transaction reference" });
  }

  try {
    // Verify transaction
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = verifyResponse.data.data;
    
    if (data.status !== "success") {
        return res.status(400).json({ error: "Transaction verification failed" });
    }

    const { cart_id, user_id } = data.metadata;

    // Fetch Cart
    const cart = await prisma.cart.findUnique({
        where: { id: cart_id },
        include: { items: { include: { product: true } } }
    });

    if (!cart) return res.status(400).json({ error: "Cart not found" });

    // Create Order(s)
    // Group items by shop logic? 
    // For simplicity, we create one order per shop found in items.
    
    const itemsByShop: Record<string, typeof cart.items> = {};
    
    cart.items.forEach(item => {
        const shopId = item.product.shopId;
        if (!itemsByShop[shopId]) itemsByShop[shopId] = [];
        itemsByShop[shopId].push(item);
    });

    const orders = [];

    for (const shopId of Object.keys(itemsByShop)) {
        const shopItems = itemsByShop[shopId];
        const shopTotal = shopItems.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
        
        const order = await prisma.order.create({
            data: {
                userId: user_id,
                shopId: shopId,
                totalAmount: shopTotal,
                status: "PAID",
                transactionRef: reference,
                orderItems: {
                    create: shopItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                        shopId: shopId // Redundant relation but good for querying
                    }))
                }
            }
        });
        orders.push(order);
    }

    // Clear Cart
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
    });

    return res.status(200).json({ success: true, orders });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Paystack Verify Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Verification failed" });
  }
}
