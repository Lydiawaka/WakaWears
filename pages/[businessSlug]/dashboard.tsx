import Head from "next/head"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import SellerLayout from "@/components/seller/SellerLayout"
import { ArrowUpRight, ArrowDownRight, Package, ShoppingBag, DollarSign, Clock } from "lucide-react"

interface DashboardStats {
  revenue: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
  recentOrders: {
    id: string;
    product: string;
    customer: string;
    date: string;
    status: string;
    amount: string;
  }[];
}


export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const loadingSession = status === "loading";
  const isSignedIn = status === "authenticated";
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingSession) return;

    if (isSignedIn) {
      fetch('/api/seller/stats')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch stats');
          return res.json();
        })
        .then(data => {
          setStats(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
        // Handle unauthenticated state if needed, though middleware usually handles this
        setLoading(false);
    }
  }, [isSignedIn, loadingSession]);

  if (loading || loadingSession) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <Head>
        <title>Seller Dashboard | WakaWears</title>
      </Head>

      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, here&apos;s what&apos;s happening with your store today.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Revenue" 
            value={stats ? stats.revenue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }) : "KES 0"} 
            trend="+0%" 
            trendUp={true}
            icon={DollarSign}
            iconColor="text-green-600"
            bgColor="bg-green-50"
          />
          <MetricCard 
            title="Total Orders" 
            value={stats?.totalOrders || 0} 
            trend="+0%" 
            trendUp={true}
            icon={ShoppingBag}
            iconColor="text-blue-600"
            bgColor="bg-blue-50"
          />
           <MetricCard 
            title="Total Products" 
            value={stats?.totalProducts || 0} 
            trend="0%" 
            trendUp={true}
            icon={Package}
            iconColor="text-purple-600"
            bgColor="bg-purple-50"
          />
           <MetricCard 
            title="Pending Orders" 
            value={stats?.pendingOrders || 0} 
            trend="0" 
            trendUp={false}
            icon={Clock}
            iconColor="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
             <h2 className="font-semibold text-gray-900">Recent Orders</h2>
             <button className="text-sm text-yellow-600 font-medium hover:text-yellow-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                  stats.recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="px-6 py-4">{order.product}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 text-gray-500">{order.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Completed' || order.status === 'PAID' || order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SellerLayout>
  )
}

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  iconColor: string;
  bgColor: string;
}

function MetricCard({ title, value, trend, trendUp, icon: Icon, iconColor, bgColor }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-xs font-medium flex items-center gap-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </span>
        <span className="text-xs text-gray-400">vs last month</span>
      </div>
    </div>
  )
}

