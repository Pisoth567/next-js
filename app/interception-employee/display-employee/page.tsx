"use client"

import useSWR from "swr"
import { Employee } from "../page";

const fetcher = (url:string) => fetch(url).then(res=> res.json());

export default function DisplayEmployee({
    params,
}: {params: Promise<{employee: Employee}>}){
    const url = process.env.PUBLISH_USER_URL;
    const {data, error, isLoading} = useSWR(
        `${url}/v1/users`,
        fetcher
    )
    
    if(error) return <h1>Fecth data faild!</h1>
    if(isLoading) return <h1 className="text-center">Loading...</h1>
    return(
        <article key={data.id}>
            
        </article>
    )
}