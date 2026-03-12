import { configureStore } from '@reduxjs/toolkit'
import { CounterSlice } from './features/counter/counterSlice'
import { CounterCart } from './features/counter/couterCardState'
import { productApi } from './features/product/productApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter: CounterSlice.reducer,
        cartCounter: CounterCart.reducer,
        [productApi.reducerPath] : productApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']