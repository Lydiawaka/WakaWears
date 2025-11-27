"use client"

export default function CategoryShowcase() {
  const categories = [
    { name: "Dresses", icon: "👗", count: "2.3K items" },
    { name: "Tops", icon: "👕", count: "1.8K items" },
    { name: "Bottoms", icon: "👖", count: "1.5K items" },
    { name: "Shoes", icon: "👠", count: "980 items" },
    { name: "Bags", icon: "👜", count: "650 items" },
    { name: "Jewelry", icon: "💍", count: "520 items" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-muted/30 rounded-2xl">
      <h3 className="text-2xl font-bold text-foreground mb-8">Shop by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="flex flex-col items-center justify-center p-6 rounded-xl bg-background hover:shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-4xl mb-2">{cat.icon}</span>
            <p className="font-semibold text-foreground text-sm">{cat.name}</p>
            <p className="text-xs text-muted-foreground">{cat.count}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
