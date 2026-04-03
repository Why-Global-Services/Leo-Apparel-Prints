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
    /* h-screen and overflow-hidden ensure the page itself never scrolls */
    <main className="h-screen w-full overflow-hidden bg-white">
        <ProductGrid />
    </main>
  );
}