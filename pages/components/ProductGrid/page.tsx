import React from 'react';
import Image from 'next/image';

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: 'Bag',
      image: '/images/Beauty/baaag.jpg',
      link: '/shop/bags'
    },
    {
      id: 2,
      name: 'Earrings',
      image: '/images/Beauty/erngs.jpg',
      link: '/shop/earrings'
    },
    {
      id: 3,
      name: 'Clutch',
      image: '/images/Beauty/baag.jpg',
      link: '/shop/clutches'
    },
    {
      id: 4,
      name: 'Bracelets',
      image: '/images/Beauty/brsts.jpg',
      link: '/shop/bracelets'
    },
    
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="relative w-full aspect-square mb-4 overflow-hidden bg-gray-100 rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h2>
            <a
              href={product.link}
              className="inline-block text-sm text-yellow-600 hover:text-yellow-500 uppercase tracking-wide"
            >
              SHOP NOW
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;