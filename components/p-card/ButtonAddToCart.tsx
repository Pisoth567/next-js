"use client";

import { useCart } from "./CartContext";

export default function AddToCartButton({ product }: any) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-black text-white px-6 py-2 rounded-lg"
    >
      Add to cart
    </button>
  );
}