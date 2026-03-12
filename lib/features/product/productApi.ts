import { fakeProductApi } from "../api/api";
import { Product } from "@/lib/type/product";

export const productApi = fakeProductApi.injectEndpoints({
    endpoints: (builder)=> ({
        getProducts: builder.query<Product[], void>({
            query:() => `/products`
        }),
        getProductById: builder.query<Product , number>({
            query:(id) => `/products/${id}`
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi