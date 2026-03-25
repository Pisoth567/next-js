"use client";

import { ProductTable } from "@/components/product/product-table";

export default function ProductsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductTable />
    </main>
  );
}