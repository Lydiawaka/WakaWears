

import { Star, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Shop {
  id: string
  name: string
  logoUrl: string | null
  _count: {
    products: number
  }
}

interface TopVendorsProps {
  vendors?: Shop[]
}

export default function TopVendors({ vendors = [] }: TopVendorsProps) {
  
  if (vendors.length === 0) {
      return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-foreground">Top Vendors</h2>
        <p className="text-muted-foreground">Trusted sellers loved by our community</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
          >
            {/* Vendor banner */}
            <div className="h-20 bg-gradient-to-r from-primary/20 to-secondary/20"></div>

            {/* Vendor info */}
            <div className="p-2 md:p-4 space-y-3 -mt-10 relative">
              {/* Avatar */}
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 rounded-full border-4 border-card overflow-hidden bg-muted">
                  <Image
                    src={vendor.logoUrl || "/placeholder.svg"}
                    alt={vendor.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-bold text-foreground truncate">{vendor.name}</h3>
                <p className="text-xs text-muted-foreground">African Fashion</p>

                {/* Rating (Mocked for now) */}
                <div className="flex items-center justify-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < 5 ? "fill-orange-600 text-orange-600" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    5.0 (New)
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  <div>
                    <p className="font-bold text-sm">{vendor._count.products}</p>
                    <p className="text-xs text-muted-foreground">Products</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">0</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="font-bold text-xs">Fast</p>
                    <p className="text-xs text-muted-foreground">Response</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                  <Link href={`/shops/${vendor.name}`} className="flex-1">
                    <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Visit Shop
                    </Button>
                  </Link>
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
