import { Product, ProductRequest } from "../type/product";
export async function fetchAllProduct(){
    const data = await fetch("https://api.escuelajs.co/api/v1/products")
    const res = await data.json()
    return res;
}

// insert Product to API
export async function insertProduct(product: ProductRequest){
    const data = await fetch("https://api.escuelajs.co/api/v1/products",{
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(product)
    }
    )
    const res = await data.json()
    return res;
}

type ProductRequestById = {
    id: number
    image: string
    title: string
    price: number
    description: string
}
    
export async function getProductById(id: string){
    const data = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    const res:Product = await data.json()
    return res;
}