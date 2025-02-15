"use client"
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';



const products = [
  { 
    id: 1, 
    name: 'Khamrah by Lattafa Perfumes', 
    price: '$25', 
    images: [
      '/images/Beauty/latk.jpg',
      '/images/Beauty/lkharwah.jpg',
      '/images/Beauty/lkharwah2.JPG'
    ],
    description: 'A luxurious oriental fragrance with rich woody notes and exotic spices.',
    details: [
      'Crystal bottle design',
      'Long-lasting fragrance',
      'Premium ingredients',
      'Luxury packaging'
    ]
  },
  { 
    id: 2, 
    name: 'Natural Coconut Oil', 
    price: 'Ksh. 150 per 1L', 
    images: [
      '/images/Beauty/ccnut.jpg',
      '/images/Beauty/cccnut.jpg',
    ],
    description: 'Pure natural coconut oil for nourishing skin and hair.',
    details: [
      '100% natural and cold-pressed',
      'Deeply hydrates and protects',
      'Multipurpose: skin and hair'
    ]
  },
  { 
    id: 3, 
    name: 'Aloe Vera Serum', 
    price: '$30', 
    images: [
      '/images/Beauty/serum.jpg',
    ],
    
    description: 'Brightens skin and reduces the appearance of dark spots.',
    details: [
      'Natural ingredients',
      'Suitable for all skin types',
      'Hydrating formula'
    ]
  },
  { 
    id: 4, 
    name: 'Leather Tote Ladies Handbag', 
    price: 'Ksh. 4500', 
    images: [
      '/images/Fashion/gladyhandbag.jpeg',
      '/images/Fashion/bladyhandbag.jpeg',
      '/images/Fashion/blladyhandbag.jpeg',
      '/images/Fashion/rladyhandbag.jpeg'
     
    ],
    description: 'Elegant leather tote bag with spacious interior.',
    details: [
      'Genuine leather',
      'Multiple compartments',
      'Durable construction'
    ]
  },
  { 
    id: 5, 
    name: 'Passport Holder', 
    price: 'Ksh. 1200', 
    images: [
      '/images/Beauty/passport1.jpeg',
      '/images/Beauty/passport2.jpeg',
      '/images/Beauty/lpassport.jpeg'
    ],
    description: 'Stylish hair claws for effortless styling.',
    details: [
      'Durable material',
      'Strong grip',
      'Various colors available'
    ]
  },
  { 
    id: 6, 
    name: 'Aloe Vera Serum', 
    price: 'Ksh. 1200', 
    images: [
      '/images/Beauty/serum.jpg',
    
    ],
    description: 'Hydrating serum with pure aloe vera extract.',
    details: [
      'Natural ingredients',
      'Suitable for all skin types',
      'Made in Kenya'
    ]
  },
  { 
    id: 7, 
    name: 'satin pillowcases and srunches', 
    price: 'Ksh. 1500', 
    images: [
      '/images/Fashion/pnpillow.jpeg',
      '/images/Fashion/crpillow.jpeg',
      '/images/Fashion/nbpillow.jpeg',
      '/images/Fashion/rpillow.jpeg'
    ],
    description: 'Smooth satin pillowcase pair for a luxurious sleep experience.',
    details: [
      'Soft and gentle on hair and skin',
      'Reduces frizz and wrinkles',
      'Durable and easy to clean'
    ]
  },
  { 
    id: 8, 
    name: 'Srunches', 
    price: 'Ksh. 1200', 
    images: [
      '/images/Fashion/blsrunches.jpeg',
      '/images/Fashion/bscrunches.jpeg'
    ],
    description: 'Stylish satin scrunchies for a gentle, crease-free hold.',
    details: [
      'Prevents hair breakage and frizz',
      'Soft, smooth, and comfortable',
      'Ideal for all hair types'
      
    ]
  },
  { 
    id: 9, 
    name: 'satin pillows', 
    price: 'Ksh. 1500', 
    images: [
      '/images/Fashion/flpillow.jpeg',
    ],
    description: 'Satin pillowcase pair for smooth, frizz-free hair and skin.',
    details: [
      'Natural ingredients',
      'Durable and easy to clean',
      'Made in Kenya'
      
    ]
  },
  { 
    id: 10, 
    name: 'Hair Claws', 
    price: 'Ksh. 900', 
    images: [
      '/images/Beauty/cseven.jpeg',
      '/images/Beauty/cfour.jpeg',
      '/images/Beauty/ctwo.jpeg',
      '/images/Beauty/claw.jpeg',
      


    ],
    description: 'Durable and stylish hair claws for a secure, all-day hold.',
    details: [
      'Strong grip for all hair types',
      'Lightweight and comfortable'
      
    ]
  }

];

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImage, setSelectedImage] = useState(0);  
  const currentProduct = products.find(p => p.id === Number(id)) || products[0];
  const navigateToProduct = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Product Navigation */}
      <div className="mb-8 flex flex-wrap gap-4">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => navigateToProduct(p.id)}
            className={`px-4 py-2 rounded-lg ${
              p.id === currentProduct.id
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full md:w-1/4">
          <div className="flex flex-col gap-4">
            {currentProduct.images.map((img, index) => (
              <div 
                key={index}
                className={`cursor-pointer border-2 rounded-lg overflow-hidden relative h-24 ${
                  selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img}
                  alt={`${currentProduct.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square rounded-lg overflow-hidden relative">
            <Image
              src={currentProduct.images[selectedImage]}
              alt={currentProduct.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/4">
          <h1 className="text-3xl font-bold text-gray-900">{currentProduct.name}</h1>
          <p className="text-2xl font-semibold text-pink-600 mt-4">{currentProduct.price}</p>
          <p className="mt-6 text-gray-600">{currentProduct.description}</p>
          
          <button className="w-full mt-8 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-200">
            Add to Cart
          </button>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-gray-900">Product Details</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              {currentProduct.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;