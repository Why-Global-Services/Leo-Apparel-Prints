
import products from "@/data/products";
import ProductGrid from "../components/products/ProductGrid";

export default function ProductsPage() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <ProductGrid products={products} />
    </div>
  );
}