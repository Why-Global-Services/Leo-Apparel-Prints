// "use client";

// import ProductGrid from "../components/products/ProductGrid";

// export default function ProductsClient() {
//   return (
//     <main className="min-h-screen bg-white text-white">

//       {/* Products Section */}
//       <section className="max-w-[1400px] mx-auto  px-6 pb-20">
//         <ProductGrid />
//       </section>
//     </main>
//   );
// }


"use client";

import ProductGrid from "../components/products/ProductGrid";

export default function ProductsClient() {
  return (
    <main className="h-screen w-full overflow-hidden bg-white flex flex-col">
      <ProductGrid />
    </main>
  );
}