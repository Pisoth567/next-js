"use client"

import { decrement, increment } from "@/lib/features/counter/counterSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Button } from "../ui/button"

export default function ICard(){
    const count = useAppSelector((state)=> state.counter.value)
    const dispatch = useAppDispatch()
    return(
        <section className="text-center mt-5">
            <p>number: {count}</p>
            <Button onClick={()=> dispatch(increment())}>+</Button>
            <Button variant={"destructive"}
                    className="mx-2"
                    onClick={()=> dispatch(decrement())}>-</Button>

        </section>
    )
}