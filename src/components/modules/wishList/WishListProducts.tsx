/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { addProduct } from "@/redux/features/cartSlice";
import {
  clearWishlist,
  removeFromWishlist,
  selectWishlistProducts,
} from "@/redux/features/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EmptyWishlist from "./EmptyWishlist";
import WishlistProductCard from "./WishlistProductCard";

const WishListProducts = () => {
  const products = useAppSelector(selectWishlistProducts);
  const dispatch = useAppDispatch();
  const [isClearing, setIsClearing] = useState(false);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addProduct(product));
    toast.success("Product added to cart");
  };

  const handleClearWishlist = () => {
    if (products.length === 0) return;

    setIsClearing(true);
    try {
      dispatch(clearWishlist());
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-sm bg-background md:p-6 p-4 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary fill-primary" />
          <h2 className="text-xl font-semibold">My Wishlist</h2>
          <span className="text-sm text-muted-foreground ml-2">
            ({products.length} {products.length === 1 ? "item" : "items"})
          </span>
        </div>

        {products.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={handleClearWishlist}
            disabled={isClearing}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Wishlist
          </Button>
        )}
      </div>

      {products.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {products?.map((product) => (
            <WishlistProductCard
              key={product._id}
              product={product}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListProducts;
