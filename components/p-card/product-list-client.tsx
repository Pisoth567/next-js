"use client";

import { Product } from "@/lib/type/product";
import Image from "next/image";
import { use } from "react";

export default function ProductListClient({
  fetchProduct,
}: {
  fetchProduct: Promise<Product[]>;
}) {
  const products = use(fetchProduct);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 md:p-6">
      {products.map((p, index) => (
        <article
          key={index}
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
          <div className="relative overflow-hidden aspect-video">
            <img
              width={300}
              height={200}
              src={p.images[0]}
              alt={p.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 md:p-5">
            <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
              {p.title}
            </h1>
            <p className="text-xl md:text-2xl font-bold text-blue-600">
              ${p.price}
            </p>
          </div>
        </article>
      ))}
    </main>
  );
}
