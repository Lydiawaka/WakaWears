"use client"
import Link from 'next/link';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import Image from 'next/image';

const products = [
  { id: 1, name: 'Khamrah by Lattafa Perfumes', price: 'Ksh. 4500', image: '/images/Beauty/latk.jpg' },
  { id: 2, name: 'Natural Coconut oil', price: 'Ksh. 1500 per 1L', image: '/images/Beauty/ccnut.jpg' },
  { id: 3, name: 'Aloe Vera serum', price: 'Ksh. 1200', image: '/images/Beauty/serum.jpg' },
  { id: 7, name: 'satin pillows and srunches', price: 'Ksh. 1200', image: '/images/Fashion/crpillow.jpeg' },
  { id: 8, name: 'Srunches', price: 'Ksh. 1200', image: '/images/Fashion/blsrunches.jpeg' },
  { id: 9, name: 'satin pillows ', price: 'Ksh. 1200', image: '/images/Fashion/flpillow.jpeg' },
  { id: 10, name: 'Hair claws', price: 'Ksh. 900', image: '/images/Beauty/cseven.jpeg' },
];

export default function Beauty() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Beauty Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
              <Image src={product.image} alt={product.name}
              width={300} 
              height={600}
              className="w-full h-[400] object-cover" />
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