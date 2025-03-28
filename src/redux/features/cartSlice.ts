/* eslint-disable @typescript-eslint/no-explicit-any */
import { addCoupon } from "@/services/coupon";
import { IProduct } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
  shopId: string;
  coupon: {
    code: string;
    discountAmount: number;
    isLoading: boolean;
    error: string;
  };
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
  shopId: "",
  coupon: {
    code: "",
    discountAmount: 0,
    isLoading: false,
    error: "",
  },
};

export const fetchCoupon = createAsyncThunk(
  "cart/fetchCoupon",
  async ({
    couponCode,
    subTotal,
    shopId,
  }: {
    couponCode: string;
    subTotal: number;
    shopId: string;
  }) => {
    try {
      const res = await addCoupon(couponCode, subTotal, shopId);
      if (!res.success) {
        throw new Error(res.message);
      }
      toast.success("Coupon applied successfully!", { id: "coupon-toast" });
      return res;
    } catch (err: any) {
      toast.error("Failed to apply coupon: " + err.message, {
        id: "coupon-toast",
      });
      throw new Error(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.products.length === 0) {
        state.shopId = action.payload.shop._id;
      } else {
        if (state.shopId !== action.payload.shop._id) {
          toast.warning(
            "You must checkout before adding products from another shop.",
            { id: "shop-warning" }
          );
          return;
        }
      }

      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        toast.success("Product quantity increased", {
          id: "increase-quantity",
        });
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
      toast.success("Product added to cart", { id: "add-product" });
    },
    incrementOrderQuantity: (state, action) => {
      const productToUpdate = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToUpdate) {
        productToUpdate.orderQuantity += 1;
        toast.info("Increased product quantity.", { id: "increase-quantity" });
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToUpdate = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToUpdate && productToUpdate.orderQuantity > 1) {
        productToUpdate.orderQuantity -= 1;
        toast.info("Decreased product quantity.", { id: "decrease-quantity" });
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        toast.warning("Product removed from cart.", { id: "remove-product" });
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      toast.success("Product removed from cart", { id: "remove-product" });
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
      toast.info("Cart cleared", { id: "clear-cart" });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.pending, (state) => {
      state.coupon.isLoading = true;
      state.coupon.error = "";
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = action.error.message as string;
      state.coupon.code = "";
      state.coupon.discountAmount = 0;
    });
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = "";
      state.coupon.code = action.payload.data.coupon.code;
      state.coupon.discountAmount = action.payload.data.discountAmount;
    });
  },
});

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};

export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};

//* Payment

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
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
  const shippingCost = shippingCostSelector(state);
  const discountAmount = discountAmountSelector(state);

  return subTotal - discountAmount + shippingCost;
};

export const couponSelector = (state: RootState) => {
  return state.cart.coupon;
};

export const discountAmountSelector = (state: RootState) => {
  return state.cart.coupon.discountAmount;
};

//* Address

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
