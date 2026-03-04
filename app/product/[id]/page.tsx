import { Product } from "@/lib/type/product";

async function getProductById(id: string){
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const data = await res.json();
  return data; 
}


export default async function ProductDetails(
  {params}: {params: Promise<{id: string}>}
) {
  const { id } =await params;
  const product: Product = await getProductById(id);
  console.log("Product: ",product);
  
  return (
    <div className="bg-pink-300 w-full py-8">
      <h1 className="text-center text-2xl font-bold text-black">
        Here is Product: {product.title}
      </h1>
      <img src={product.images[0]} alt={product.title} className="mx-auto w-64 h-64 object-cover" />
      <p className="text-center mt-4">{product.description}</p>
      <p className="text-center mt-2 font-bold text-blue-600">${product.price}</p>
    </div>
  );
}