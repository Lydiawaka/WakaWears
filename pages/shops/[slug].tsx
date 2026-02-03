import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Header from '@/components/header/page';
import Footer from '@/components/Footer/page';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  title: string;
  price: string;
  images: string[];
  category: string;
}

interface Shop {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  isVerified: boolean;
  createdAt: string;
}

interface ShopPageProps {
  shop: Shop;
  products: Product[];
}

export default function ShopPage({ shop, products }: ShopPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{shop.name} | WakaWears</title>
        <meta name="description" content={shop.description || `Shop at ${shop.name} on WakaWears`} />
      </Head>

      <Header />

      <main>
        {/* Shop Banner */}
        <div className="relative h-64 md:h-80 w-full bg-gray-200">
          {shop.bannerUrl ? (
            <Image
              src={shop.bannerUrl}
              alt={`${shop.name} Banner`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
              <span className="text-4xl font-light">{shop.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Shop Info */}
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-32 h-32 flex-shrink-0 bg-white rounded-full p-1 shadow-md">
              <div className="w-full h-full relative rounded-full overflow-hidden bg-gray-100">
                {shop.logoUrl ? (
                  <Image
                    src={shop.logoUrl}
                    alt={`${shop.name} Logo`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-4xl font-bold">{shop.name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
                {shop.isVerified && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">Verified</span>
                )}
              </div>
              <p className="text-gray-600 mb-4 max-w-2xl">{shop.description}</p>
              <div className="text-sm text-gray-500">
                Member since {new Date(shop.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-light mb-8 pb-4 border-b border-gray-200">Products</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">This shop hasn&apos;t listed any products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group block">
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="relative aspect-[3/4] bg-gray-100">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-medium text-gray-900 mb-1 truncate">{product.title}</h3>
                      <p className="font-semibold text-gray-900">
                        {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(Number(product.price))}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    // Assuming 'name' is the slug for now as per schema
    const shop = await prisma.shop.findUnique({
      where: {
        slug: slug,
      },
      include: {
        products: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!shop) {
      return {
        notFound: true,
      };
    }

    // Serialize dates to strings for JSON
    const serializedShop = {
      ...shop,
      createdAt: shop.createdAt.toISOString(),
      updatedAt: shop.updatedAt.toISOString(),
      // Remove products from shop object to avoid duplication if we want to pass them separate, 
      // but findUnique returns them nested. We can just separate them.
      products: undefined, 
    };

    const serializedProducts = shop.products.map((product: {
      id: string;
      title: string;
      price: { toString: () => string };
      images: string[];
      category: string;
      createdAt: Date;
      updatedAt: Date;
    }) => ({
      ...product,
      price: product.price.toString(), // Decimal to string
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    return {
      props: {
        shop: serializedShop,
        products: serializedProducts,
      },
    };
  } catch (error) {
    console.error('Error fetching shop:', error);
    return {
      notFound: true,
    };
  }
};
