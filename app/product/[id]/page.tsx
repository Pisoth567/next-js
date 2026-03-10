
import Image from "next/image";
import { getProductById } from "@/lib/data/products";
import AddToCartButton from "@/components/p-card/ButtonAddToCart";

export default async function ProductDetail({params}: {params:Promise<{id: string}>}) {
  const {id} = await params;
  const product = await getProductById(id);
  return (
    <main className="w-[80%] mx-auto mt-10 flex gap-10" key={product.id}>
      <Image
        src={product.images[0]}
        alt={product.title}
        width={400}
        height={400}
        className="rounded-lg"
      />
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold text-green-600">
          ${product.price}
        </p>
        
        <AddToCartButton product={product} />
        
      </div>

    </main>
  );
}