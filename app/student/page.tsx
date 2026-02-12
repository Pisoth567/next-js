"use client";

import useSWR  from "swr";

// const fetcher = (url:string)=> fetch(url).then(res=>res.json());

function fetcher(url:string){
    const data = fetch(url).then(res=> res.json());
    return data;
}

export default function StudentDisplay() {
    const {data, error, isLoading} = useSWR(
        "https://api.escuelajs.co/api/v1/users",
        fetcher
    );
    if(error) return <h1>Fetch Data Error!</h1>
    if(isLoading) return <h1>Data Loading...</h1>
  return (
    <div className="flex justify-center items-center gap-4 flex-wrap mt-3">
        {data.map((s) => {
            return (
                <article
                    key={s.id}
                    className="rounded-2xl w-[200px] p-4 border-2">
                        <img className="object-cover w-full h-[150px] rounded-xl" src={s.avatar} alt={s.name}/>
                        <div className="mt-3">
                            <h1>Name: {s.name}</h1>
                            <p>ID: {s.id}</p>
                        </div>
                </article>
            );
        })}
    </div>
  )
}
