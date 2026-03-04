import { Student, students } from "@/lib/utils";
import Image from "next/image";

export default function DisplayFullPage(){
    return(
        <div className="mx-auto mt-10 mb-5 flex justify-center items-center">
            <table className="border-collapse w-[80%]">
                <thead>
                    <tr>
                        <th className="border p-8 bg-blue-400 text-center">ID</th>
                        <th className="border p-8 bg-blue-400 text-center">Image</th>
                        <th className="border p-8 bg-blue-400 text-center">Name</th>
                    </tr>   
                </thead>
                <tbody>
                    {
                        students.map((s:Student)=>{
                            return(
                                <tr key={s.id}>
                                    <td className="border py-8 w-[15%] px-2 text-center">{s.id}</td>
                                    <td className="border py-8 px-2  flex justify-center items-center">
                                        <Image className="w-20" src={s.image} alt={s.name} />
                                    </td>
                                    <td className="border py-8 px-2 w-[60%] text-center">{s.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )  
}