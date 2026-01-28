import Head from "next/head"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import SellerLayout from "@/components/seller/SellerLayout"
import { Calendar, ArrowUpRight, TrendingUp, Users, ShoppingCart } from "lucide-react"

interface AnalyticsStats {
  totalSales: number;
  storeVisits: number;
  conversionRate: string;
  chart: {
      heights: number[];
      tooltips: number[];
      labels: string[];
  };
  bestSelling: {
      name: string;
      sold: number;
      revenue: string;
  }[];
  topCategories: {
      name: string;
      value: number;
      amount: string;
  }[];
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const loadingSession = status === "loading";
  const isSignedIn = status === "authenticated";
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingSession) return;

    if (isSignedIn) {
      fetch('/api/seller/analytics')
        .then(res => res.json())
        .then(data => {
            setStats(data);
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
        <title>Analytics | Seller Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500">Insights into your store&apos;s performance</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
             <Calendar className="w-4 h-4 text-gray-500" />
             Last 6 Months
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
                 { label: "Total Sales", value: stats?.totalSales.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }), change: "+0%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                 { label: "Store Visits", value: stats?.storeVisits, change: "+0%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                 { label: "Conversion Rate", value: stats?.conversionRate, change: "-0%", icon: ShoppingCart, color: "text-purple-600", bg: "bg-purple-50" },
             ].map((stat, i) => (
                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                     <div>
                         <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                         <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                         <span className="text-xs text-green-600 flex items-center gap-1 mt-2">
                             <ArrowUpRight className="w-3 h-3" /> {stat.change} <span className="text-gray-400">vs last period</span>
                         </span>
                     </div>
                     <div className={`p-3 rounded-full ${stat.bg}`}>
                         <stat.icon className={`w-6 h-6 ${stat.color}`} />
                     </div>
                 </div>
             ))}
        </div>

        {/* Charts & Graphs (Visual Placeholders) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart Placeholder */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-6">Revenue Overview</h3>
                <div className="h-64 flex items-end justify-between gap-2 px-2">
                    {stats?.chart.heights.map((h, i) => (
                        <div key={i} className="w-full bg-yellow-50 rounded-t hover:bg-yellow-100 transition-colors relative group">
                             <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-yellow-500 rounded-t opacity-80 group-hover:opacity-100 transition-opacity"></div>
                             {/* Tooltip */}
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                 KES {(stats.chart.tooltips[i] || 0).toLocaleString()}
                             </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-gray-400 px-2">
                    {stats?.chart.labels.map((label, i) => (
                        <span key={i}>{label}</span>
                    ))}
                </div>
            </div>

            {/* Category Performance (Mocked for now as we don't have categories in orders yet fully detailed) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="font-semibold text-gray-900 mb-6">Top Categories</h3>
                 <div className="space-y-6">
                     {stats?.topCategories.map((cat, i) => (
                         <div key={i}>
                             <div className="flex justify-between text-sm mb-2">
                                 <span className="font-medium text-gray-700">{cat.name}</span>
                                 <span className="font-medium text-gray-900">{cat.amount}</span>
                             </div>
                             <div className="w-full bg-gray-100 rounded-full h-2">
                                 <div className="bg-black h-2 rounded-full" style={{ width: `${cat.value}%` }}></div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Best Selling Products</h3>
             </div>
             <table className="w-full text-sm text-left">
                 <thead className="bg-gray-50 text-gray-500 font-medium">
                     <tr>
                         <th className="px-6 py-3">Product</th>
                         <th className="px-6 py-3 text-right">Sold</th>
                         <th className="px-6 py-3 text-right">Revenue (Approx)</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                     {stats?.bestSelling && stats.bestSelling.length > 0 ? (
                         stats.bestSelling.map((item, i) => (
                             <tr key={i} className="hover:bg-gray-50">
                                 <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                 <td className="px-6 py-4 text-right text-gray-600">{item.sold}</td>
                                 <td className="px-6 py-4 text-right font-medium text-gray-900">{item.revenue}</td>
                             </tr>
                         ))
                     ) : (
                         <tr>
                             <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                 No sales data yet.
                             </td>
                         </tr>
                     )}
                 </tbody>
             </table>
        </div>

      </div>
    </SellerLayout>
  )
}
