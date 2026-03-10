import { createSlice } from "@reduxjs/toolkit";

// step to create reducer
export interface CounterState{
    value: number;
}

// 1. define initialState
const initialState: CounterState = {
    value: 10
}
// 2. define reducer that contail logic(action) of reducer
export const CounterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state)=> {state.value += 1},
        decrement: (state) => {state.value -= 1} 
    }
})

// 3. export action of reducer
export const { increment, decrement } = CounterSlice.actions;

export default CounterSlice.reducer