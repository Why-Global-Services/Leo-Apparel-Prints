import ProductPageClient from './ProductPageClient';
import { Suspense } from 'react';

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #003E9B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <ProductPageClient />
    </Suspense>
  );
}
