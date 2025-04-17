"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import { useCart } from './context/CartContext'; 
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
interface OrderTotals {
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
}

type PaymentMethod = 'credit-card' | 'paypal' | 'm-pesa';

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const [orderTotals, setOrderTotals] = useState<OrderTotals>({
    subtotal: '0.00',
    shipping: '5.99',
    tax: '0.00',
    total: '0.00'
  });

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('m-pesa');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'm-pesa'
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    calculateOrderTotal();
  }, [cartItems, selectedMethod]);

  const calculateOrderTotal = (): void => {
    const subtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return sum + (price * item.quantity);
    }, 0);

    const shipping = parseFloat(orderTotals.shipping);
    const tax = parseFloat((subtotal * 0.16).toFixed(2));
    const total = (subtotal + shipping + tax).toFixed(2);

    setOrderTotals({
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (name === 'paymentMethod') {
      setSelectedMethod(value as PaymentMethod);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = `${key} is required`;
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Order placed:", {
        cartItems,
        formValues,
        orderTotals
      });
      alert("Order successfully placed!");
    }
  };

  return (
    <>
    <Navbar />
      <Head>
        <title>Checkout</title>
      </Head>

      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <h2 className="text-lg font-semibold mb-2">Billing Info</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="p-2 border rounded"
                value={formValues.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <span className="text-red-500">{formErrors.name}</span>}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="p-2 border rounded"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}

              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                className="p-2 border rounded"
                value={formValues.address}
                onChange={handleInputChange}
              />
              {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}

              <input
                type="text"
                name="city"
                placeholder="City"
                className="p-2 border rounded"
                value={formValues.city}
                onChange={handleInputChange}
              />
              {formErrors.city && <span className="text-red-500">{formErrors.city}</span>}

              <select
                name="paymentMethod"
                className="p-2 border rounded"
                value={formValues.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="m-pesa">M-Pesa</option>
              </select>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <section className="order-summary bg-black text-yellow-600 p-4 rounded-lg">
              <div className="cart-items mb-4">
                {cartItems.map(item => (
                  <div className="cart-item flex justify-between" key={item.id}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="totals text-sm space-y-1">
                <p>Subtotal: KES {orderTotals.subtotal}</p>
                <p>Shipping: KES {orderTotals.shipping}</p>
                <p>Tax: KES {orderTotals.tax}</p>
                <p className="font-bold">Total: KES {orderTotals.total}</p>
              </div>
            </section>

            <button
              type="submit"
              className="mt-6 w-full bg-yellow-500 text-black py-2 rounded font-bold hover:bg-yellow-400 transition"
            >
              Place Order
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
