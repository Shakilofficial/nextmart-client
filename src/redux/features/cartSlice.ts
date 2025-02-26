import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface initialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
  shopId: string;
}

const initialState: initialState = {
  products: [],
  city: "",
  shippingAddress: "",
  shopId: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // If cart is empty, set shopId
      if (state.products.length === 0) {
        state.shopId = action.payload.shop._id;
      } else {
        // Prevent adding products from different shops
        if (state.shopId !== action.payload.shop._id) {
          toast.warning(
            "You must checkout before adding products from another shop."
          );
          return;
        }
      }

      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
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
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
      state.shopId = "";
    },
  },
});

/*
 * Products
 */
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "Black",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};

/*
 * Payment
 */

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

export const shippingCoastSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCoast = shippingCoastSelector(state);
  return subTotal + shippingCoast;
};

export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};

// * Address

export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
