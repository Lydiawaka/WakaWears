import Navbar from "./components/Navbar/page"
import Image from "next/image"


const products = [
  {
    id: 1,
    title: "Hair claw",
    description: "Revolutionary quantum computing project",
    image: "/images/beauty/ctwo.jpeg",
  },
  {
    id: 2,
    title: "EcoSphere",
    description: "Sustainable ecosystem simulation",
    image: "/images/beauty/latk.jpg",
  },
  {
    id: 3,
    title: "NeuroPulse",
    description: "Advanced neural network architecture",
    image: "/images/beauty/cfive.jpeg",
  },
  
]

export default function beauty() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-600 text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id}>
              <Image src={product.image} 
              alt={product.title}
              width={300}
              height={200} 
              className="rounded-lg h-[250]"/>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <button className="bg-black text-white rounded-lg px-3 py-1 hover:bg-yellow-500 hover:text-black">Add To Cart</button>
            </div>
            
             

          ))}
        </div>
      </main>
    </div>
  )
}

