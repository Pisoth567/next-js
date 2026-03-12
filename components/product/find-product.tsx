"use client"
import { useGetProductByIdQuery } from "@/lib/features/product/productApi";
import Image from "next/image";

export default function FindProductById(){
    const {data, isLoading } = useGetProductByIdQuery(1);
    console.log(data);
    
    return(
        <>
            {
                isLoading? <p>Loading...</p>:
                 <article>
                    <Image src={data?.category.image} alt="" width={100} height={100}/>
                    <h1>{data?.title}</h1>
                 </article>
            }
        </>
    )
}