import Head from "next/head"
import SellerLayout from "@/components/seller/SellerLayout"
import { Upload, Save } from "lucide-react"
import { useSession } from "next-auth/react"

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  // @ts-ignore
  const shopName = user?.shopName || user?.name || "";
  const email = user?.email || "";

  return (
    <SellerLayout>
      <Head>
        <title>Settings | Seller Dashboard</title>
      </Head>

      <div className="max-w-4xl mx-auto space-y-6">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
           <p className="text-sm text-gray-500">Manage your business profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col - Navigation (Optional for future expansion) */}
            <div className="space-y-4">
               <nav className="flex flex-col space-y-1">
                   {['General', 'Security', 'Notifications', 'Payment Methods'].map((item, i) => (
                       <button 
                         key={item} 
                         className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                       >
                           {item}
                       </button>
                   ))}
               </nav>
            </div>

            {/* Right Col - Form */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Profile Visuals */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                     <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Store Branding</h3>
                     
                     <div className="flex items-start gap-6">
                         <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 text-2xl font-bold border-4 border-white shadow-sm">
                             {shopName ? shopName.substring(0, 2).toUpperCase() : "ST"}
                         </div>
                         <div className="space-y-2">
                             <h4 className="text-sm font-medium text-gray-900">Store Logo</h4>
                             <p className="text-xs text-gray-500 max-w-xs">Recommended size 400x400px. JPG, PNG or GIF.</p>
                             <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded text-sm font-medium hover:bg-gray-50 text-gray-700">
                                 <Upload className="w-3 h-3" /> Upload New
                             </button>
                         </div>
                     </div>

                     <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Banner Image</label>
                          <div className="h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors">
                               <div className="text-center">
                                   <Upload className="w-5 h-5 mx-auto mb-1" />
                                   <span className="text-xs">Click to upload banner</span>
                               </div>
                          </div>
                     </div>
                </div>

                {/* Business Info */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                     <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Business Information</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-700">Business Name</label>
                             <input type="text" defaultValue={shopName} placeholder="My Online Shop" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none" />
                         </div>
                         <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-700">Phone Number</label>
                             <input type="tel" placeholder="+254 700 000 000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none" />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                             <label className="text-sm font-medium text-gray-700">Email Address</label>
                             <input type="email" defaultValue={email} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none" />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                             <label className="text-sm font-medium text-gray-700">Bio / About</label>
                             <textarea rows={3} placeholder="Tell us about your business..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none resize-none" />
                         </div>
                     </div>
                </div>

                 {/* Save Button */}
                 <div className="flex justify-end">
                     <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg font-medium shadow-sm hover:bg-gray-800 transition-colors">
                         <Save className="w-4 h-4" />
                         Save Changes
                     </button>
                 </div>

            </div>
        </div>
      </div>
    </SellerLayout>
  )
}
