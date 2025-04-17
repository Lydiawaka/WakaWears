"use client"
import Link from 'next/link';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import Image from 'next/image';

const products = [
  { id: 4, name: 'Tote Ladies handbags', price: 'Ksh. 4500', image: '/images/Fashion/ladyhandbag.jpeg' },
  { id: 5, name: 'Passport Holder', price: 'Ksh. 1200', image: '/images/Beauty/passport1.jpeg' },
  { id: 6, name: 'Coastal Weaves Earings', price: 'Ksh. 1500', image: '/images/Fashion/Coastal.jpg' },
];

export default function Fashion() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
              <Image src={product.image} alt={product.name}
              width={300} height={300} className="w-full h-[300] object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
    </div>
    
  );
}