import ProductForm from "@/components/forms/product-form";
import { getProductById } from "@/lib/data/products";

async function getCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  return res.json();
}

export default async function EditProduct({params,}: {params:{id: string}}){
    const product = await getProductById(params.id)
    const category = getCategories()

    return(
        <ProductForm getData={category} product={product} isEdit={true}/>
    )
}