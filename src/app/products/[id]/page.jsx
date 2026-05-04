// import JerseyCustomizer from "@/app/components/products/JersyCustomizer";

// export async function generateMetadata({ params }) {
//   const { id } = await params;
  
//   return {
//     title: `Customize Product — LEO CULT`,
//     description: "Customize your sports wear with Leo Apparel",
//   };
// }

// export default async function ProductDetailPage({ params }) {
//   const { id } = await params;
//   console.log("id",id)
//   // Pass only the ID to the client component
//   return <JerseyCustomizer productId={id} />;
// }



'use client';

import JerseyCustomizer from '@/app/components/products/JersyCustomizer';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@/features/products/productThunks';

export default function ProductPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, selectedProductLoading, selectedProductError } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (params?.id) {
      console.log("Fetching product with ID:", params.id);
      dispatch(fetchProductById(params.id))
        .unwrap()
        .then((result) => {
          console.log("Product fetched:", result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
          setIsLoading(false);
        });
    }
  }, [dispatch, params?.id]);
  
  if (isLoading || selectedProductLoading) {
    return (
      <div style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #003E9B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }
  
  if (selectedProductError || !product) {
    return (
      <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <h2>Product not found</h2>
        <p>{selectedProductError || "Unable to load product"}</p>
        <button 
          onClick={() => window.location.href = '/products'} 
          style={{ padding: '10px 20px', background: '#003E9B', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
        >
          Back to Products
        </button>
      </div>
    );
  }
  
  // Pass the entire product object, not just the ID
  return <JerseyCustomizer product={product} />;
}