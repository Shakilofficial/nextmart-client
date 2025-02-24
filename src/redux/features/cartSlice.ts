import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface initialState {
  products: IProduct[];
}

const initialState: initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const selectCart = (state: RootState) => state.cart.products;

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
