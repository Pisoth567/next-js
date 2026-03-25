import { waitForDebugger } from "inspector";
import { NextRequest, NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API_URL

// nextjs can make api
export async function GET(){
    const res = await fetch(`${baseApi}/products`)
    const data = await res.json()
    return NextResponse.json(data)
}

export async function  POST(req: NextRequest) {
    const body = req.json()
    const res = await fetch(`${baseApi}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()
    
    return NextResponse.json(data)
}