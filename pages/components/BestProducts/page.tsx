import Image from "next/image"
import { ShoppingBag } from "lucide-react"

interface Product {
  View: string | undefined
  id: number
  name: string
  price: number
  image: string
}

const products: Product[] = [
  { id: 1, name: "Satin Skirt", price: 19.99, image: "/images/product/satin.jpeg", View: "/custom" },
  { id: 2, name: "Casual Jeans", price: 29.99, image: "/images/product/jeans.jpeg", View: "/fashion" },
  { id: 3, name: "Satin tops", price: 39.99, image: "/images/product/blouse.jpeg", View: "/custom" },
  { id: 4, name: "Fur Jackets", price: 59.99, image: "/images/product/fur.jpeg", View: "/fashion" },
 
]

export default function BestProducts() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Best Products </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={400}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-white text-black px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors duration-300">
                <ShoppingBag size={20} />
                <a href={product.View}>Quick View</a>
              </button>
            </div>
            <div className="flex flex-col justify-end ">
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 ">${product.price.toFixed(2)}</p>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}

