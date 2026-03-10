"use client";

import { Product } from "@/lib/type/product";
import { use } from "react";
import ProductCart from "./cart";
import Link from "next/link";

export default function ProductListClient({
  fetchProduct,
}: {
  fetchProduct: Promise<Product[]>;
}) {
  const products = use(fetchProduct);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 md:p-6">
      {
        products.map((p)=>(
          <Link key={p.id} href={`/product/${p.id}`} >
            <ProductCart image={p.images[0]} title={p.title.slice(0, 20)} price={p.price}/>
          </Link>
        ))
      }
    </main>
  );
}
