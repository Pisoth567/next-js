import React from "react";

export default function ProductDetailsLayout({
    children,
}: { children: React.ReactNode; })
{
    return(
        <>
            {children}
            <h1 className="text-center font-bold text-xl mt-5 text-amber-900">Featured Products</h1>
        </>
    )
}