import React from 'react';
import Navbar from './components/Navbar/page';
import Image from 'next/image'

// Define the type for an art product
type ArtProduct = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};

// Sample data for art products
const artProducts: ArtProduct[] = [
  {
    id: 1,
    title: 'Starry Night',
    price: 299.99,
    imageUrl: '/images/Art/bfour.jpeg',
  },
  {
    id: 2,
    title: 'Mona Lisa',
    price: 499.99,
    imageUrl: '/images/Art/bfour.jpeg',
  },
  {
    id: 3,
    title: 'The Persistence of Memory',
    price: 399.99,
    imageUrl: '/images/Art/bfour.jpeg',
  },
  {
    id: 4,
    title: 'The Persistence of Memory',
    price: 399.99,
    imageUrl: '/images/Art/bfour.jpeg',
  }
  // Add more products as needed
];

const ArtPage: React.FC = () => {
  return (
    <div>
        <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Art Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {artProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={250}
              height={400}

              className="w-full h-[400] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>
              <button
                className="mt-4 w-28 bg-gray-200 text-black py-2 px-2 rounded hover:bg-yellow-400 transition duration-200"
                onClick={() => alert(`Added ${product.title} to cart`)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ArtPage;