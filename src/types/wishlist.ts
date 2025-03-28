import { IProduct } from "@/types";

export interface WishlistProduct extends IProduct {
  addedAt: string;
}

export interface WishlistState {
  products: WishlistProduct[];
  isLoading: boolean;
  error: string | null;
}
