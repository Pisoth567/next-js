import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ph1 from "../photos/1.jpg";
import ph2 from "../photos/2.jpg";
import ph3 from "../photos/3.jpg";
import ph4 from "../photos/4.jpg";
import ph5 from "../photos/5.jpg";  
import ph6 from "../photos/6.jpg";

import { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Student{
  id: number
  name: string
  image: StaticImageData

}

export const students: Student[] = [
  {
    id: 1,
    name: "Oggy",
    image: ph1
  },
   {
    id: 2,
    name: "Ah Muyy",
    image: ph2
  },
   {
    id: 3,
    name: "Vit",
    image: ph3
  },
   {
    id: 4,
    name: "Nit",
    image: ph4
  },
   {
    id: 5,
    name: "Kun",
    image: ph5
  },
   {
    id: 6,
    name: "Hong",
    image: ph6
  }
]