"use client"

import { useEffect, useState } from "react"
import ProductCard from "../products/ProductCard"
import axios from "axios"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function ProductShowcase() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Try multiple endpoints as fallback
      const endpoints = [
        '/api/marketplace?limit=8',
        '/api/products?limit=8',
        '/api/products/trending?limit=8'
      ]
      
      let lastError = null
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`)
          const response = await axios.get(endpoint)
          
          // Handle different response formats
          const productsData = response.data.products || 
                               response.data || 
                               (Array.isArray(response.data) ? response.data : [])
          
          if (productsData.length > 0) {
            setProducts(productsData)
            return // Success, exit the function
          }
        } catch (err) {
          lastError = err
          console.log(`Failed to fetch from ${endpoint}:`, err)
          // Continue to next endpoint
        }
      }
      
      // If all endpoints failed, use mock data
      if (lastError) {
        console.error("All API endpoints failed, using mock data")
        setProducts(getMockProducts())
      }
      
    } catch (error) {
      console.error("Failed to fetch products", error)
      setError(error instanceof Error ? error.message : "Failed to load products")
      // Use mock data as fallback
      setProducts(getMockProducts())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Mock data for fallback
  const getMockProducts = () => {
    return [
      {
        id: 1,
        title: "African Print Dress",
        price: 59.99,
        images: ["/african-print-dress.png"],
        category: "Women's Clothing",
        shop: { name: "AfroChic Designs" }
      },
      {
        id: 2,
        title: "Beaded Necklace",
        price: 29.99,
        images: ["/beaded-necklace.png"],
        category: "Jewelry",
        shop: { name: "Heritage Crafts" }
      },
      {
        id: 3,
        title: "Men's Kaftan",
        price: 45.99,
        images: ["/men-kaftan.png"],
        category: "Men's Clothing",
        shop: { name: "Royal Attire" }
      },
      {
        id: 4,
        title: "Handwoven Basket",
        price: 35.50,
        images: ["/handwoven-basket.png"],
        category: "Home Decor",
        shop: { name: "Artisan Crafts" }
      },
      {
        id: 5,
        title: "Colorful Headwrap",
        price: 19.99,
        images: ["/colorful-headwrap.png"],
        category: "Headwear",
        shop: { name: "Style Africa" }
      },
      {
        id: 6,
        title: "Leather Sandals",
        price: 42.00,
        images: ["/leather-sandals.png"],
        category: "Footwear",
        shop: { name: "Safari Leathers" }
      },
      {
        id: 7,
        title: "Wooden Mask",
        price: 89.99,
        images: ["/wooden-mask.png"],
        category: "Wall Art",
        shop: { name: "Tribal Arts" }
      },
      {
        id: 8,
        title: "Embroidered Bag",
        price: 38.75,
        images: ["/embroidered-bag.png"],
        category: "Bags & Purses",
        shop: { name: "Nairobi Designs" }
      }
    ]
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
          <p className="text-muted-foreground">Best-selling pieces from our community</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span>Showing demo products</span>
            </div>
          )}
          <Link href="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 space-y-4">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="w-12 h-12 text-amber-500" />
            <h3 className="text-lg font-semibold">Unable to load products</h3>
            <p className="text-muted-foreground">Showing demo products instead</p>
          </div>
        </div>
      ) : null}

      {!loading && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.images?.[0] || product.image || '/placeholder.png'}
                category={product.category}
                shopName={product.shop?.name || product.seller?.shopName || product.shopName}
              />
            ))}
          </div>
          
          {products.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={fetchProducts}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </>
      )}
      
      <div className="mt-8 text-center md:hidden">
        <Link href="/products">
          <Button variant="outline" className="w-full">View All Products</Button>
        </Link>
      </div>
    </section>
  )
}