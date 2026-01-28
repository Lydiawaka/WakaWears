import React from 'react';
import Image from 'next/image';

const ProductsHero = () => {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&q=80&w=2000"
          alt="African Fashion"
          fill
          className="object-cover opacity-60"
        />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Discover Curated African Fashion & Art
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
          Explore our exclusive collection of authentic handcrafted pieces from top vendors across Africa.
        </p>
      </div>
    </div>
  );
};

export default ProductsHero;
