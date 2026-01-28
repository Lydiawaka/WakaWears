import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/header/page';
import Footer from '@/components/Footer/page';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  const router = useRouter();
  const { category, gender, type, q } = router.query;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category as string);
        if (gender) queryParams.append('gender', gender as string);
        if (type) queryParams.append('type', type as string);
        if (q) queryParams.append('q', q as string);

        const response = await axios.get(`/api/marketplace?${queryParams.toString()}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router.isReady, category, gender, type, q]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-6">Marketplace</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Active Filters</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-500 block">Category</span>
                <span className="font-medium">{category || 'All'}</span>
              </div>
              {gender && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <span className="text-sm text-gray-500 block">Gender</span>
                  <span className="font-medium">{gender}</span>
                </div>
              )}
              {type && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <span className="text-sm text-gray-500 block">Type</span>
                  <span className="font-medium">{type}</span>
                </div>
              )}
              {q && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <span className="text-sm text-gray-500 block">Search</span>
                  <span className="font-medium">{q}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (

            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white border border-gray-100 group">
               <div className="aspect-square bg-gray-100 relative overflow-hidden">
                 {product.images && product.images[0] ? (
                   <img 
                     src={product.images[0]} 
                     alt={product.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400">
                     No Looking Image
                   </div>
                 )}
                 {product.stock <= 0 && (
                   <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                     Out of Stock
                   </div>
                 )}
               </div>
               <CardContent className="p-4">
                 <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    <span className="font-medium text-gray-900 truncate flex-1">{product.shop?.name}</span>
                    {product.shop?.isVerified && (
                      <span className="text-blue-500" title="Verified Shop">✓</span>
                    )}
                 </div>
                 <h3 className="font-medium mb-1 truncate text-gray-900">{product.title}</h3>
                 <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10">{product.description}</p>
                 <div className="flex items-center justify-between mt-4">
                   <p className="font-bold text-lg">₦{Number(product.price).toLocaleString()}</p>
                   <Button 
                     variant="outline" 
                     size="sm"
                     onClick={() => router.push(`/products/${product.id}`)}
                     className="hover:bg-black hover:text-white transition-colors"
                   >
                     View
                   </Button>
                 </div>
               </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            <p>No products found matching your criteria.</p>
          </div>
        )}

        {loading && (
           <div className="text-center py-12 text-gray-500">
            <p>Loading products...</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
