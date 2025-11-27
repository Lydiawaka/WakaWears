"use client"

import { ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function FeaturedCollections() {
  const collections = [
    {
      id: 1,
      title: "Wakawears Essentials",
      description: "Timeless basics designed for everyday elegance",
      image: "/minimalist-clothing-collection.jpg",
      color: "from-primary/20 to-primary/5",
    },
    {
      id: 2,
      title: "Designer Spotlight",
      description: "Curated pieces from emerging African designers",
      image: "/designer-fashion-pieces.jpg",
      color: "from-secondary/20 to-secondary/5",
    },
    {
      id: 3,
      title: "Festival Ready",
      description: "Bold, expressive pieces for your next event",
      image: "/colorful-party-fashion.jpg",
      color: "from-accent/20 to-accent/5",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      {/* ✔ NEW SEARCH BAR SECTION */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search styles, vendors..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4 mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground">Featured Collections</h2>
        <p className="text-muted-foreground">Explore curated styles handpicked by our team</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className={`group bg-gradient-to-br ${collection.color} rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300`}
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.title}
                width={32}                // required
                height={32}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-foreground">{collection.title}</h3>
              <p className="text-sm text-muted-foreground">{collection.description}</p>
              <Button variant="ghost" className="w-full justify-between group/btn">
                Explore <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
