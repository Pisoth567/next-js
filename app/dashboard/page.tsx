import ProductForm from "@/components/forms/product-form";
import { categories } from "@/lib/data/categories";
import Link from "next/link";

export default function DashbaordPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Link href="/photos/1" className="text-blue-500 underline">
        Go to Photo
      </Link>

      <ProductForm getData={categories()}/>

    </main>
  );
}
