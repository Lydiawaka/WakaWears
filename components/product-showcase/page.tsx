import { useEffect, useState } from "react"
import ProductCard from "../products/ProductCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

type Product = {
  id: string | number
  title: string
  price: number
  images?: string[]
  image?: string
  category?: string
  shop?: { name?: string }
  seller?: { shopName?: string }
  shopName?: string
}

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    const controller = new AbortController()

    try {
      setLoading(true)
      setError(null)

      const res = await fetch("/api/products?limit=8", {
        signal: controller.signal,
        headers: { "Accept": "application/json" },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await res.json()
      setProducts(data.products ?? data ?? [])
    } catch (err) {
      if (err instanceof DOMException) return
      setError("Unable to load products")
      setProducts([])
    } finally {
      setLoading(false)
    }

    return () => controller.abort()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <p className="text-muted-foreground">
            Best-selling pieces from our community
          </p>
        </div>

        <Link href="/products" className="hidden md:block">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto w-10 h-10 text-amber-500" />
          <p className="mt-4 text-muted-foreground">{error}</p>
          <Button variant="outline" className="mt-6" onClick={fetchProducts}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              title={product.title}
              price={product.price}
              image={
                product.images?.[0] ??
                product.image ??
                "/placeholder.png"
              }
              category={product.category ?? "Uncategorized"}
              shopName={
                product.shop?.name ??
                product.seller?.shopName ??
                product.shopName
              }
            />
          ))}
        </div>
      )}

      <div className="mt-8 text-center md:hidden">
        <Link href="/products">
          <Button variant="outline" className="w-full">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  )
}
