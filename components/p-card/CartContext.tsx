"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define type for product
type Product = {
  id: number;
  title: string;
  price: number;
  images?: string[];
  category?: { name: string };
  quantity?: number;
};

type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existing = cartItems.find((p) => p.id === product.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCartItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return; 
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};  