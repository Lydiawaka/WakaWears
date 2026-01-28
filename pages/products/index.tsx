import React from 'react';
import Head from 'next/head';
import Header from '@/components/header/page';
import Footer from '@/components/Footer/page';
import ProductsContent from '@/components/products/ProductsContent';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Shop African Fashion & Art | WakaWears</title>
        <meta name="description" content="Discover curated African fashion, art, and accessories." />
      </Head>

      <Header />
      
      <main>
        <ProductsContent />
      </main>

      <Footer />
    </div>
  );
}

