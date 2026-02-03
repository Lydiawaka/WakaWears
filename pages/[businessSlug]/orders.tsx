import Head from "next/head"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import SellerLayout from "@/components/seller/SellerLayout"
import { Search, Filter, Eye, Download } from "lucide-react"

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  payment: string;
  status: string;
  total: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const loadingSession = status === "loading";
  const isSignedIn = status === "authenticated";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingSession) return;
    
    if (isSignedIn) {
      fetch('/api/seller/orders')
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                setOrders(data);
            }
            setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
        setLoading(false);
    }
  }, [isSignedIn, loadingSession]);

  if (loading) {
     return (
        <SellerLayout>
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
            </div>
        </SellerLayout>
     )
  }

  return (
    <SellerLayout>
      <Head>
        <title>Orders | Seller Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-gray-500">Manage and track your customer orders</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Orders
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
           <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-colors"
            />
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-yellow-500 text-sm">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3 w-12">
                    <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                  </th>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Payment</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length > 0 ? (
                  orders.map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                       <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="px-6 py-4">
                          <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{order.customer}</span>
                              <span className="text-xs text-gray-500">{order.email}</span>
                          </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 text-gray-500">{order.payment}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Completed' || order.status === 'PAID' || order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{order.total}</td>
                      <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors font-medium text-sm flex items-center justify-end gap-1 w-full">
                              Details <Eye className="w-3 h-3" />
                          </button>
                      </td>
                    </tr>
                  ))
                ) : (
                    <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                            No orders found.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
           {/* Pagination (Static for now) */}
           <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">Showing {orders.length} orders</span>
              <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Previous</button>
                  <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">Next</button>
              </div>
           </div>
        </div>
      </div>
    </SellerLayout>
  )
}
