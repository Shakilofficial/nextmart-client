import { IProduct } from "@/types";
import { WishlistState } from "@/types/wishlist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RootState } from "../store";

const initialState: WishlistState = {
  products: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        toast.info("Product already in wishlist");
        return;
      }
      state.products.push({
        ...action.payload,
        addedAt: new Date().toISOString(),
      });

      toast.success("Product added to wishlist");
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );

      toast.success("Product removed from wishlist");
    },
    clearWishlist: (state) => {
      state.products = [];
      toast.info("Wishlist cleared");
    },
  },
});

// Selectors
export const selectWishlistProducts = (state: RootState) =>
  state.wishlist.products;
export const selectWishlistCount = (state: RootState) =>
  state.wishlist.products.length;
export const selectIsProductInWishlist =
  (productId: string) => (state: RootState) =>
    state.wishlist.products.some((product) => product._id === productId);

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
