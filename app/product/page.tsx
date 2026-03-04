// app/components/ProductList.tsx
import { Product } from "@/lib/type/product";
import Image from "next/image";
import Link from "next/link";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
  const products = await res.json()
  return products;
}

export default async function ProductList() {
  const products: Product[] = await fetchProducts();
  console.log(products);
  
  return (
    <div className="max-w-[1400px] mx-auto p-6">
  <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {products.map((p) => (
      <Link href={`/product/${p.id}`} key={p.id}>
        <article className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src={p.images[0]}
            alt={p.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 ">
            <h2 className="text-lg font-semibold ">{p.title}</h2>
            <p className="text-blue-600 font-bold ">${p.price}</p>
            <p className="text-gray-600 text-sm">{p.description.substring(0, 10)}...</p>
            <p className="text-gray-400 text-xs mt-2">Category: {p.category.name}</p>
          </div>
        </article>
      </Link>
    ))}
  </div>
</div>
  );
}