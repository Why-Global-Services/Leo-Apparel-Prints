'use client';

import JerseyCustomizer from '@/app/components/products/JersyCustomizer';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@/features/products/productThunks';

export default function ProductPageClient() {
  const params = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, selectedProductLoading, selectedProductError } = useSelector(
    (state) => state.products
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      dispatch(fetchProductById(params.id))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
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
        <p>{selectedProductError || 'Unable to load product'}</p>
        <button
          onClick={() => window.location.href = '/products'}
          style={{ padding: '10px 20px', background: '#003E9B', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return <JerseyCustomizer product={product} />;
}