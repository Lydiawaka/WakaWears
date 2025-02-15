"use client"
import Link from "next/link"
import { useCart } from "../contexts/CartContext"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                  >
                    -
                  </button>
                  <p className="mx-2 text-gray-700">{item.quantity}</p>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 focus:outline-none focus:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-lg font-medium text-gray-900">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

