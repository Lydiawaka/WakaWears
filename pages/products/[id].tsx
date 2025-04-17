import { Suspense } from 'react';
import ProductDetail from '../components/ProductDetail';
import { useRouter } from 'next/router';

function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // Add this check to handle the case when id is undefined
  if (!id) {
    return <div>Loading...</div>;
  }
  
  // Convert id to string properly, handling both string and string[] cases
  const productId = Array.isArray(id) ? id[0] : id;
    
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetail  />
    </Suspense>
  );
}

export default ProductPage;