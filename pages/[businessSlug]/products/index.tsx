import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import SellerLayout from "@/components/seller/SellerLayout"
import { Search, Plus, Filter, Edit, Trash2, Eye } from "lucide-react"

interface Product {
  id: string
  title: string
  category: string
  price: number
  stock: number
  images: string[]
  // Add status if your model supports it, otherwise mock or derive it
  stockStatus: string 
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/seller/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formatted = data.map((p: any) => ({
                ...p,
                stockStatus: p.stock > 0 ? (p.stock < 10 ? "Low Stock" : "Active") : "Out of Stock"
            }))
            setProducts(formatted)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SellerLayout>
      <Head>
        <title>Products | Seller Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-sm text-gray-500">Manage your product catalog</p>
          </div>
          <Link 
            href="/seller/products/add" 
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3 w-12">
                    <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                  </th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                    <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">Loading products...</td>
                    </tr>
                ) : products.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">No products found. Add your first product!</td>
                    </tr>
                ) : (
                    products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             {product.images && product.images[0] ? <img src={product.images[0]} alt="" className="w-full h-full object-cover" /> : null}
                        </div>
                        <span className="font-medium text-gray-900">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">KES {product.price}</td>
                    <td className="px-6 py-4 text-gray-500">{product.stock} units</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stockStatus === 'Active' ? 'bg-green-100 text-green-800' :
                        product.stockStatus === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stockStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-gray-400">
                        <button className="p-1 hover:text-gray-600 transition-colors">
                            <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
           {/* Pagination */}
           <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
               <span className="text-sm text-gray-500">Showing {products.length} products</span>
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
