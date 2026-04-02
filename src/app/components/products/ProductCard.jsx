import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded-xl p-3 hover:shadow-lg transition cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={product.image.includes('picsum.photos')} // Optional: for external images
          />
        </div>
        <h3 className="mt-2 font-semibold line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 font-medium">₹{product.price}</p>
        <p className="text-xs text-gray-400 mt-1">{product.category}</p>
      </div>
    </Link>
  );
}