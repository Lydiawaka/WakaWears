"use client"

import { Heart, Star, ShoppingCart } from "lucide-react"

export default function ProductShowcase() {
  const products = [
    {
      id: 1,
      name: "Emerald Wrap Dress",
      vendor: "Chic Atelier",
      price: "₦12,500",
      originalPrice: "₦18,000",
      rating: 4.8,
      reviews: 234,
      image: "/emerald-wrap-dress.jpg",
      badge: "New",
    },
    {
      id: 2,
      name: "Urban Blazer Set",
      vendor: "Style Labs",
      price: "₦15,900",
      originalPrice: "₦22,000",
      rating: 4.9,
      reviews: 156,
      image: "/blazer-outfit.jpg",
      badge: "Popular",
    },
    {
      id: 3,
      name: "Gold Minimalist Sandals",
      vendor: "Feet Forward",
      price: "₦8,200",
      originalPrice: "₦12,000",
      rating: 4.7,
      reviews: 89,
      image: "/gold-sandals.jpg",
      badge: null,
    },
    {
      id: 4,
      name: "Silk Camisole Top",
      vendor: "Luxury Basics",
      price: "₦6,800",
      originalPrice: "₦10,500",
      rating: 4.6,
      reviews: 412,
      image: "/silk-camisole.jpg",
      badge: "Sale",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
        <p className="text-muted-foreground">Best-selling pieces from our community</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-background rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Product image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.badge && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </div>
              )}
              <button className="absolute top-3 left-3 p-2 bg-background/80 rounded-full hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
                <Heart className="w-4 h-4 text-accent" />
              </button>
              <button className="absolute bottom-3 right-3 w-full mx-3 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Product info */}
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{product.vendor}</p>
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mt-1">{product.name}</h3>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <p className="font-bold text-foreground">{product.price}</p>
                <p className="text-xs text-muted-foreground line-through">{product.originalPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
