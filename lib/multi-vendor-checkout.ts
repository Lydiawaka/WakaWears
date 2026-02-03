import { prisma } from "@/lib/prisma";

// 1. Order Data Structure (Frontend/Cart)
export interface CartItem {
  id: string;
  productId: string;
  shopId: string; // Critical for grouping
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

export interface CheckoutPayload {
  userId: string;
  email: string;
  items: CartItem[];
  paymentReference: string; // Returned from Paystack
}

// ==========================================
// 2. Post-Payment Order Splitting Logic
// ==========================================

/**
 * Handles post-payment order creation.
 * Splits a single checkout transaction into multiple Shop-specific orders.
 */
export async function createSplitOrders(payload: CheckoutPayload) {
  const { userId, items, paymentReference } = payload;

  // Group items by shopId
  const itemsByShop = items.reduce((acc, item) => {
    if (!acc[item.shopId]) {
      acc[item.shopId] = [];
    }
    acc[item.shopId].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const createdOrderIds: string[] = [];

  // Execute in a transaction to ensure integrity
  // Note: Prisma operations in a loop should be handled purely or with $transaction
  // Here we use $transaction for the batch creation
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.$transaction(async (tx: any) => {
      for (const [shopId, shopItems] of Object.entries(itemsByShop)) {
        
        // Calculate total for this specific shop's order
        const shopTotal = shopItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create the Order for this Shop
        const order = await tx.order.create({
          data: {
            userId: userId,
            shopId: shopId,
            transactionRef: paymentReference,
            totalAmount: shopTotal,
            status: 'PAID', // Assuming validity since payment was verified
            orderItems: {
              create: shopItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                shopId: shopId, // Redundant but good for item-level integrity
              })),
            },
          },
        });
        
        createdOrderIds.push(order.id);
      }
    });

    return { success: true, orderIds: createdOrderIds };

  } catch (error) {
    console.error("Failed to split orders:", error);
    throw new Error("Order creation failed");
  }
}

// ==========================================
// 3. Prisma Examples
// ==========================================

/*
  -------------------------------------------
  A. Seller View: "My Shop's Orders"
  -------------------------------------------
  
  const sellerShopId = "shop_123";

  const sellerOrders = await prisma.order.findMany({
    where: {
      shopId: sellerShopId
    },
    include: {
      user: { select: { name: true, email: true } }, // Buyer info
      orderItems: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
*/

/*
  -------------------------------------------
  B. Buyer View: "My Order History"
  -------------------------------------------
  
  const buyerId = "user_456";

  const myOrders = await prisma.order.findMany({
    where: {
      userId: buyerId
    },
    include: {
      shop: { select: { name: true } }, // See which shop it came from
      orderItems: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  // NOTE: If you want to group them by the single Payment/Transaction:
  // You would group by `transactionRef` on the frontend or process the data.
*/
