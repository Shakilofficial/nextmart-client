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

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      console.log(product.offerPrice);
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      console.log(product.price, "Price");
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
