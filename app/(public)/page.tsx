import ProductListClient from "@/components/p-card/product-list-client";
import { fetchAllProduct } from "@/lib/data/products";
import { Metadata } from "next";


export default function Home() {
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Home page</h1>
      <ProductListClient fetchProduct={fetchAllProduct()}/>
    </>
  )
}