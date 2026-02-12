import React from "react";

export default function ProductDetailsLayout({
    children,
    chart,
    data,
}: { 
    children: React.ReactNode;
    chart: React.ReactNode;
    data: React.ReactNode;
 })
{
    return(
        <>
        {children}
        <div className="flex gap-5 justify-center items-center mt-3 ">
            {chart}
            {data}
        </div>
            <h1 className="text-center font-bold text-xl mt-5 text-amber-900"> Here is Dashboard Page </h1>
        </>
    )
}