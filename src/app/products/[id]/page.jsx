import products from "@/data/products";

export default function ProductDetails({ params }) {
  const id = params?.id;

  const product = products.find(
    (p) => p._id === id
  );

  if (!product) {
    return <h1 className="p-5">Product not found</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
    </div>
  );
}