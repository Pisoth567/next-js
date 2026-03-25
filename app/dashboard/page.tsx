// app/dashboard/page.tsx
import ProductForm from "@/components/forms/product-form";
import { categories } from "@/lib/data/categories";
import { getProductById } from "@/lib/data/products";

export default async function DashboardPage({ searchParams }: { searchParams?: { editById?: string } }) {

  const product = searchParams?.editById ? getProductById(searchParams.editById) : null;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <ProductForm categories={categories()} product={product} />
    </main>
  );
}