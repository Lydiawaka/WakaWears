import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    name: "Clothing",
    subcategories: ["Men", "Women", "Kids", "Traditional"]
  },
  {
    name: "Accessories",
    subcategories: ["Jewelry", "Bags", "Headwear", "Footwear"]
  },
  {
    name: "Home & Living",
    subcategories: ["Decor", "Textiles", "Art", "Kitchen"]
  }
];

const ProductSidebar = () => {
  const router = useRouter();
  const { category, type } = router.query;

  const handleFilter = (key: string, value: string) => {
    const query = { ...router.query, [key]: value };
    // Reset page on filter change
    delete query.page; 
    
    // Toggle logic: if already selected, remove it
    if (router.query[key] === value) {
        delete query[key];
    }
    
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Categories</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-2">
              <button 
                onClick={() => handleFilter('category', cat.name)}
                className={`flex items-center justify-between w-full text-left text-sm ${
                  category === cat.name ? 'text-yellow-600 font-bold' : 'text-gray-600 hover:text-black'
                }`}
              >
                {cat.name}
                {category === cat.name && <ChevronRight className="w-4 h-4" />}
              </button>
              
              {/* Show subcategories if parent category works or generally expanded? 
                  For now lets always show them or only when parent selected. 
                  Let's show all for better discovery per requirements. 
              */}
              <div className="pl-4 space-y-1 border-l border-gray-100 ml-1">
                {cat.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleFilter('type', sub)}
                    className={`block w-full text-left text-xs py-1 transition-colors ${
                      type === sub ? 'text-yellow-600 font-medium' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Price Range</h3>
         {/* Placeholder for price range slider if needed later */}
         <div className="flex gap-2 text-sm text-gray-600">
             <span>₦0</span> - <span>₦100,000+</span>
         </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
