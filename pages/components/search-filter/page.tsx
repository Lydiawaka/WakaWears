"use client"

import { useState } from "react"
import { Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchFilter() {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null)

  const categories = ["All", "Clothing", "Shoes", "Accessories", "Bags", "Activewear"]
  const priceRanges = ["Under ₦5K", "₦5K - ₦15K", "₦15K - ₦30K", "₦30K+"]

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b border-border">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg transition-all ${
                  cat === "All" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none bg-transparent">
              <Sliders className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <select className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-muted border border-border text-foreground">
              <option>Sort by: Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Rated</option>
            </select>
          </div>
        </div>

        {/* Price filter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {priceRanges.map((range) => (
            <button
              key={range}
              className="px-3 py-2 text-sm rounded-lg bg-muted border border-transparent hover:border-border transition-all"
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
