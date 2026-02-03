import Head from "next/head"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import SellerLayout from "@/components/seller/SellerLayout"
import { DollarSign, Download, Plus, Clock } from "lucide-react"

interface PaymentStats {
  totalBalance: number;
  pendingClearance: number;
  totalWithdrawn: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payouts: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentMethods: any[];
}

export default function PaymentsPage() {
  const { data: session, status } = useSession();
  const loadingSession = status === "loading";
  const isSignedIn = status === "authenticated";
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingSession) return;

    if (isSignedIn) {
      fetch('/api/seller/payments')
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
        <title>Payments | Seller Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500">Manage your earnings and payouts</p>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-gray-400 font-medium text-sm">Total Balance</p>
              <h3 className="text-3xl font-bold mt-2">
                 {stats?.totalBalance.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }) || 'KES 0'}
              </h3>
              <div className="mt-8 flex gap-3">
                 <button className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                    Withdraw
                 </button>
              </div>
            </div>
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20" />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Clearance</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats?.pendingClearance.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }) || 'KES 0'}
                </h3>
              </div>
              <div className="p-2 rounded-lg bg-orange-50">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Funds from pending orders</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Withdrawn</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats?.totalWithdrawn.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }) || 'KES 0'}
                </h3>
              </div>
              <div className="p-2 rounded-lg bg-green-50">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Lifetime earnings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payout History */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                     <h2 className="font-semibold text-gray-900">Payout History</h2>
                     <button className="text-sm text-gray-500 hover:text-black flex items-center gap-1">
                         <Download className="w-4 h-4" /> Export
                     </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Reference</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Method</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                             {stats?.payouts && stats.payouts.length > 0 ? (
                                 stats.payouts.map((payout, i) => (
                                     <tr key={i} className="hover:bg-gray-50 transition-colors">
                                         <td className="px-6 py-4 font-medium text-gray-900">{payout.ref}</td>
                                         <td className="px-6 py-4 text-gray-500">{payout.date}</td>
                                         <td className="px-6 py-4 text-gray-500">{payout.method}</td>
                                         <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                {payout.status}
                                            </span>
                                         </td>
                                         <td className="px-6 py-4 text-right font-medium text-gray-900">{payout.amount}</td>
                                     </tr>
                                 ))
                             ) : (
                                 <tr>
                                     <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                         No payout history found.
                                     </td>
                                 </tr>
                             )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Methods */}
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-fit">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                     <h2 className="font-semibold text-gray-900">Payment Methods</h2>
                     <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Plus className="w-4 h-4 text-gray-600" />
                     </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="text-center text-gray-500 text-sm py-4">
                        No payment methods added.
                    </div>
                </div>
             </div>
        </div>
      </div>
    </SellerLayout>
  )
}



