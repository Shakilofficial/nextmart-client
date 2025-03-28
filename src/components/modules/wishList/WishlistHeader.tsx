"use client";

import { Button } from "@/components/ui/button";
import {
  clearWishlist,
  selectWishlistProducts,
} from "@/redux/features/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const WishlistHeader = () => {
  const [isClearing, setIsClearing] = useState(false);
  const products = useAppSelector(selectWishlistProducts);
  const dispatch = useAppDispatch();

  const handleClearWishlist = () => {
    if (products.length === 0) return;

    setIsClearing(true);
    try {
      dispatch(clearWishlist());
      toast.success("Wishlist cleared successfully");
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b">
      <div>
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground mt-1">
          {products.length} {products.length === 1 ? "item" : "items"} saved
        </p>
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
  );
};

export default WishlistHeader;
