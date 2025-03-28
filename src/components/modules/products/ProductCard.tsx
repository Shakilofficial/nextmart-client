"use client";
import { Badge } from "@/components/ui/badge";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { addProduct } from "@/redux/features/cartSlice";
import { addToWishlist } from "@/redux/features/wishListSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { IProduct } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleAddProduct = () => {
    if (product?.stock === 0) return;
    dispatch(addProduct(product));
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToWishlist(product));
  };

  // Calculate discount percentage
  const discountPercentage = product?.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      {/* Image Section - Reduced height */}
      <div className="relative aspect-[3/3] overflow-hidden">
        <Link href={`/products/${product?._id}`}>
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
            <Image
              src={
                product?.imageUrls[0] || "/placeholder.svg?height=240&width=320"
              }
              alt={product?.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-contain",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsImageLoading(false)}
            />

            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
          </div>
        </Link>

        {/* Badges - Positioned for smaller image */}
        {product?.stock === 0 ? (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 px-2 py-0.5 text-xs"
          >
            Out of Stock
          </Badge>
        ) : discountPercentage > 0 ? (
          <Badge className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-green-500">
            -{discountPercentage}%
          </Badge>
        ) : null}

        {/* Wishlist Button */}
        <Button
          onClick={handleAddToWishlist}
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-white transition-colors"
        >
          <Heart className="h-6 w-6" />
        </Button>
      </div>

      {/* Product Info - Compact */}
      <CardContent className="p-3">
        {/* Rating - Smaller */}
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">
            {product?.averageRating || "0.0"}
          </span>
        </div>

        {/* Title - Shorter */}
        <Link
          href={`/products/${product?._id}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="font-medium text-sm line-clamp-1 mb-1">
            {product?.name}
          </h3>
        </Link>

        {/* Price - Compact */}
        <div className="flex items-baseline gap-1.5">
          {product?.offerPrice ? (
            <>
              <span className="text-xl font-semibold text-primary">
                ${product?.offerPrice}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ${product?.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-semibold text-primary">
              ${product?.price}
            </span>
          )}
        </div>
      </CardContent>

      {/* Action Button - Smaller */}
      <CardFooter className="p-2 pt-0">
        <Button
          onClick={handleAddProduct}
          disabled={product?.stock === 0}
          variant="default"
          size="sm"
          className={cn(
            "w-full h-8 rounded-full text-xs transition-all",
            product?.stock === 0
              ? "bg-gray-300 hover:bg-gray-300"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
