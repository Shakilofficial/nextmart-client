import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface initialState {
  products: CartProduct[];
}

const initialState: initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToAdd = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToAdd) {
        productToAdd.orderQuantity = productToAdd.orderQuantity + 1;
        return;
      }
      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productToUpdate = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToUpdate) {
        productToUpdate.orderQuantity = productToUpdate.orderQuantity + 1;
        return;
      }
      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    decrementOrderQuantity: (state, action) => {
      const productToUpdate = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToUpdate && productToUpdate.orderQuantity > 0) {
        productToUpdate.orderQuantity = productToUpdate.orderQuantity - 1;
        return;
      }
      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const selectCart = (state: RootState) => state.cart.products;

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
