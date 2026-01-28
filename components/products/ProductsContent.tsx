import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductsHero from './ProductsHero';
import ProductSidebar from './ProductSidebar';
import ProductGrid from './ProductGrid';
import { Search, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductsContentProps {
  withHero?: boolean;
}

export default function ProductsContent({ withHero = true }: ProductsContentProps) {
  const router = useRouter();
  const { category, gender, type, q } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    // Update search term from URL
    if (q) setSearchTerm(q as string);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category as string);
        if (gender) queryParams.append('gender', gender as string);
        if (type) queryParams.append('type', type as string);
        if (q) queryParams.append('q', q as string);
        
        // Add limit for pagination if needed, default to enough for a full page
        queryParams.append('limit', '20');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = { ...router.query };
    if (searchTerm) {
      query.q = searchTerm;
    } else {
      delete query.q;
    }
    
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div className="font-sans">
      {withHero && <ProductsHero />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 sticky top-20 z-30 bg-gray-50 py-2">
           <div className="w-full md:w-auto flex md:hidden">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => setShowMobileFilter(!showMobileFilter)}
              >
                <FilterIcon className="w-4 h-4" /> Filters
              </Button>
           </div>

           <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
             <input
               type="text"
               placeholder="Search products..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
             />
             <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
           </form>
           
           {/* Sort Options could go here */}
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0 sticky top-24 h-fit">
            <ProductSidebar />
          </aside>

          {/* Mobile Sidebar Overlay */}
          {showMobileFilter && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setShowMobileFilter(false)}>
              <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-xl font-bold">Filters</h2>
                   <button onClick={() => setShowMobileFilter(false)} className="text-gray-500">Close</button>
                 </div>
                 <ProductSidebar />
              </div>
            </div>
          )}

          {/* Main Grid */}
          <div className="flex-1">
             <ProductGrid products={products} loading={loading} />
             
             {/* Load More / Pagination visual cue */}
             {!loading && products.length > 0 && (
               <div className="mt-12 text-center">
                  <Button variant="outline" className="min-w-[200px] hover:bg-black hover:text-white transition-colors">
                    Load More
                  </Button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
