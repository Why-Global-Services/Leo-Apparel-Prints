import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
}