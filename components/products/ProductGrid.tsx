import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  shop?: {
    name: string;
  };
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No products found.</p>
        <p className="text-sm">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.images[0] || '/placeholder.png'}
          category={product.category}
          shopName={product.shop?.name}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
