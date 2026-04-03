// import { notFound } from "next/navigation";
// import { products } from "@/data/products";
// import ProductDetailClient from "./ProductDetailClient";

// export async function generateMetadata({ params }) {
//   const product = products.find((p) => p.id === params.id);
//   if (!product) return {};
//   return {
//     title: `${product.name} — LEO CULT`,
//     description: product.description,
//   };
// }

// export default function ProductDetailPage({ params }) {
//   const product = products.find((p) => p.id === params.id);
//   if (!product) notFound();
//   return <ProductDetailClient product={product} />;
// }



import { notFound } from "next/navigation";
import { products } from "@/data/products";
import JerseyCustomizer from "@/app/components/products/JersyCustomizer";

export async function generateMetadata({ params }) {
  // For Next.js 15+
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} — LEO CULT`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  // For Next.js 15+ - await params
  const { id } = await params;
  
  console.log("Looking for product with ID:", id); // Debug line
  
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    console.log(`Product with ID "${id}" not found. Available IDs:`, 
                products.map(p => p.id));
    notFound();
  }
  
  return <JerseyCustomizer product={product} />;
}