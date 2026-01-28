import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { signIn } from "next-auth/react"
import Header from "@/components/header/page"
import Footer from "@/components/Footer/page"
import { Check, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"

export default function SellerRegister() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
  })
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  const categories = [
    "Men's Clothing", "Women's Clothing", "Kids & Babies",
    "Jewelry", "Bags & Purses", "Headwear",
    "Home Decor", "Textiles", "Wall Art"
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      // 1. Create account on server
      const res = await fetch('/api/seller/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            categories: selectedCategories
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registration failed")
        setLoading(false)
        return
      }

      // 2. Sign in automatically
      const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
      })

      if (result?.error) {
          setError("Account created but failed to sign in automatically. Please log in.")
          router.push('/seller/login') // Fallback
      } else {
          router.push('/seller/dashboard')
      }

    } catch (error: any) {
        console.error("Registration error:", error)
        setError(error.message || "An error occurred. Please try again.")
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Head>
        <title>Register as a Seller | WakaWears</title>
      </Head>

      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Seller Account</h1>
            <p className="mt-2 text-gray-600">Join our community and start selling your African-inspired products today.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              
              {/* Business Info Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">Business Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Business Name</label>
                    <input
                      required
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. AfroChic Designs"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Owner Name</label>
                    <input
                      required
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                </div>

              </div>

              {/* Product Categories Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">What do you sell?</h2>
                <p className="text-sm text-gray-500 mb-4">Select all categories that apply to your products.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <div 
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`
                        cursor-pointer flex items-center p-3 rounded-lg border transition-all duration-200
                        ${selectedCategories.includes(cat) 
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-900 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                      `}
                    >
                      <div className={`
                        w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors
                        ${selectedCategories.includes(cat) ? 'bg-yellow-500 border-yellow-500' : 'border-gray-300 bg-white'}
                      `}>
                        {selectedCategories.includes(cat) && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-sm font-medium">{cat}</span>
                    </div>
                  ))}
                </div>
                {selectedCategories.length === 0 && (
                  <p className="text-sm text-red-500 flex items-center mt-2">
                    <AlertCircle className="w-4 h-4 mr-1" /> Please select at least one category
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || selectedCategories.length === 0}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Creating Account...
                    </>
                  ) : (
                    "Create Seller Account"
                  )}
                </button>
              </div>
              
              <div className="text-center mt-4 text-sm text-gray-500">
                Already have an account? <Link href="/seller/login" className="text-yellow-600 font-semibold hover:underline">Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
