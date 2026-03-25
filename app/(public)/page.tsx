import ICard from "@/components/forms/i-card";
import ProductCartRTK from "@/components/p-card/productCart";
import FindProductById from "@/components/product/find-product";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Home page</h1>
      <ICard/>
      {/* <ProductCartRTK /> */}
      <FindProductById />
    </>
  )
}