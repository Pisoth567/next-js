// types/product.ts
export type Category ={
  id: number;
  name: string;
  slug: string;
  image: string[];
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export type ProductRequest = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[]
}