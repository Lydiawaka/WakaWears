"use client"

import { Star, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function TopVendors() {
  const vendors = [
    {
      id: 1,
      name: "Luxe African Creations",
      category: "Designer Fashion",
      rating: 4.9,
      reviews: 1203,
      followers: "15K",
      image: "/abstract-fashion-logo.jpg",
      products: 245,
      responseTime: "< 1 hour",
    },
    {
      id: 2,
      name: "Urban Street Collective",
      category: "Streetwear",
      rating: 4.8,
      reviews: 892,
      followers: "12K",
      image: "/streetwear-brand.jpg",
      products: 156,
      responseTime: "< 2 hours",
    },
    {
      id: 3,
      name: "Artisan Footwear Studio",
      category: "Handcrafted Shoes",
      rating: 4.9,
      reviews: 654,
      followers: "8.5K",
      image: "/shoe-store-logo.jpg",
      products: 78,
      responseTime: "< 3 hours",
    },
    {
      id: 4,
      name: "Minimalist Essentials Co",
      category: "Basics & Classics",
      rating: 4.7,
      reviews: 1456,
      followers: "22K",
      image: "/minimalist-fashion-brand.jpg",
      products: 312,
      responseTime: "< 30 mins",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-foreground">Top Vendors</h2>
        <p className="text-muted-foreground">Trusted sellers loved by our community</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
          >
            {/* Vendor banner */}
            <div className="h-20 bg-gradient-to-r from-primary/20 to-secondary/20"></div>

            {/* Vendor info */}
            <div className="p-4 space-y-3 -mt-10 relative">
              {/* Avatar */}
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 rounded-full border-4 border-card overflow-hidden bg-muted">
                  <Image
                    src={vendor.image || "/placeholder.svg"}
                    alt={vendor.name}
                    width={80}                // required
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-bold text-foreground">{vendor.name}</h3>
                <p className="text-xs text-muted-foreground">{vendor.category}</p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(vendor.rating) ? "fill-secondary text-secondary" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {vendor.rating} ({vendor.reviews})
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  <div>
                    <p className="font-bold text-sm">{vendor.products}</p>
                    <p className="text-xs text-muted-foreground">Products</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{vendor.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-xs">{vendor.responseTime}</p>
                    <p className="text-xs text-muted-foreground">Response</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    Visit Shop
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
