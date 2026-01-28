import React from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useCurrency } from '@/context/CurrencyContext';

interface ProductProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  shopName?: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, title, price, image, category, shopName }) => {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  return (
    <Card 
      className="group relative overflow-hidden border-none shadow-none hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      onClick={() => router.push(`/products/${id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="rounded-full bg-white hover:bg-yellow-400 hover:text-white transition-colors shadow-md">
            <Heart className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full bg-white hover:bg-yellow-400 hover:text-white transition-colors shadow-md">
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <CardContent className="pt-4 px-2 pb-2">
        <div className="flex justify-between items-start mb-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{category}</p>
          {shopName && <span className="text-xs text-gray-400">{shopName}</span>}
        </div>
        <h3 className="font-medium text-gray-900 line-clamp-1 mb-1 group-hover:text-yellow-600 transition-colors">{title}</h3>
        <p className="font-bold text-lg">{formatPrice(price)}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
