// app/components/ProductList.tsx
import ProductListClient from "@/components/p-card/product-list-client";
import { Product } from "@/lib/type/product";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
  const products = await res.json()
  return products;
}

export default async function ProductPage() {
  
  return (
    <ProductListClient fetchProduct={fetchProducts()}/>
  );
}