// This is a SERVER component — no 'use client' here
import ProductPageClient from './ProductPageClient';
import { getAllProductsAPI } from '@/services/productService'; // adjust path

// ✅ Required for output: export
export async function generateStaticParams() {
  try {
    const data = await getAllProductsAPI();
    const products = data?.products || data || [];

    return products.map((product) => ({
      id: String(product._id || product.id),
    }));
  } catch (error) {
    console.error('generateStaticParams failed:', error);
    return [];
  }
}

export default function ProductPage({ params }) {
  return <ProductPageClient params={params} />;
}