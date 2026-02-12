"use client";
import { use } from "react";

export default function CustomerList(){
    const students = use(fetch("https://api.escuelajs.co/api/v1/users").then(res => res.json()));

return(
    <>
     <div className="flex justify-center items-center gap-4 flex-wrap mt-3">
        {students.map((s) => {
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
    </>
)
}