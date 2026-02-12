export default async function ProductDetails({
    params,
 }: {params: Promise<{productID: string}>} 
) {
    const pID = (await params).productID;
  return (
    <div className="bg-pink-300 w-full py-8">
      <h1 className="text-center text-2xl font-bold text-black">Here is Product: {pID}</h1>
    </div>
  )
}
