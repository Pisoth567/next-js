import { createSlice } from "@reduxjs/toolkit";

// step to create reducer
export interface CounterState{
    value: number;
}

// 1. define initialState
const initialState: CounterState = {
    value: 0
}
// 2. define reducer that contail logic(action) of reducer
export const CounterCart = createSlice({
    name: "cartCounter",
    initialState,
    reducers: {
        increment: (state) => {state.value += 1},
    }
})

// 3. export action of reducer  
export const { increment} = CounterCart.actions;

export default CounterCart.reducer