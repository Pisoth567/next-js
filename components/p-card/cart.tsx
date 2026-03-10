import Image from "next/image";
import Link from "next/link";

type Cart = {
    image: string;
    title: string;
    price: number;
    category?: string;
};

export default function ProductCart({ image, title, price, category }: Cart) {

    return (
        <article className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="p-4">
                {category && (
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {category}
                    </p>
                )}
                <h2 className="text-md font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h2>
                <p className="text-lg font-bold text-gray-900">${price}</p>
                
                <button className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300">
                    View
                </button>
            </div>
        </article>
    );
}