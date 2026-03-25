"use client"

import { useGetProductsQuery } from "@/lib/features/product/productApi"


export default function ProductCartRTK() {
    const {data, isLoading} = useGetProductsQuery();

    console.log("data: "+ data);
  return (
    <section>
        <p>RTK Query:</p>
        {
            isLoading ? <p>Data Loading...</p> : <p>Already</p>
        }
    </section>
  )
}
