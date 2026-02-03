import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import SellerLayout from "@/components/seller/SellerLayout"
import { ChevronLeft, Save, Loader2, Upload, X } from "lucide-react"
import Link from "next/link"

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Fashion", // Default
    subCategory: "", // Optional
    stock: "",
    images: [] as string[] // Simplified for now (URL input)
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
        // Basic validation
        if (file.size > 5 * 1024 * 1024) {
            alert(`File ${file.name} is too large (max 5MB)`)
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, reader.result as string]
                }))
            }
        }
        reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        if (res.ok) {
            router.push('/seller/products')
        } else {
            const data = await res.json()
            alert(data.message || "Failed to create product")
        }
    } catch (error) {
        console.error(error)
        alert("An error occurred")
    } finally {
        setLoading(false)
    }
  }

  return (
    <SellerLayout>
      <Head>
        <title>Add Product | Seller Dashboard</title>
      </Head>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
            <Link href="/seller/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <div>
                 <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                 <p className="text-sm text-gray-500">Fill in the details to list your item</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product Details */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Basic Information</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Product Name *</label>
                            <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all" placeholder="e.g. African Print Dress" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-700">Description</label>
                             <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all resize-none" placeholder="Describe your product..." />
                        </div>
                    </div>
                </div>

                     {/* Image Upload Area */}
                     <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-200 hover:border-yellow-500 hover:bg-yellow-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="bg-gray-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-gray-500 group-hover:text-yellow-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Click or drag images here</h4>
                            <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG (Max 5MB)</p>
                        </div>
                     </div>

                     {/* Image Grid Preview */}
                     {formData.images.length > 0 && (
                         <div className="grid grid-cols-4 gap-4">
                             {formData.images.map((img, i) => (
                                 <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border group">
                                     {/* eslint-disable-next-line @next/next/no-img-element */}
                                     <img src={img} alt="" className="w-full h-full object-cover" />
                                     
                                     {/* Remove Button */}
                                     <button 
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                                     >
                                        <X className="w-3.5 h-3.5" />
                                     </button>
                                 </div>
                             ))}
                         </div>
                     )}

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                     <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Inventory</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input name="stock" value={formData.stock} onChange={handleChange} type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
                        </div>
                     </div>
                </div>
            </div>

            {/* Right Column - Pricing & Organization */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Pricing</h3>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Base Price (KES) *</label>
                        <input required name="price" value={formData.price} onChange={handleChange} type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
                    </div>
                </div>

                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Organization</h3>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                            <option>Fashion</option>
                            <option>Accessories</option>
                            <option>Home Decor</option>
                            <option>Beauty</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button disabled={loading} className="w-full py-2.5 bg-black text-white rounded-lg font-medium shadow hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Product
                    </button>
                </div>
            </div>
        </form>
      </div>
    </SellerLayout>
  )
}
