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
import { toast } from "sonner";

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
    toast.success("Product added to cart");
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
        "group h-full flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      {/* Image Section - Fixed height */}
      <div className="relative w-full aspect-square overflow-hidden">
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

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product?.stock === 0 ? (
            <Badge
              variant="destructive"
              className="px-2 py-0.5 text-xs font-medium"
            >
              Out of Stock
            </Badge>
          ) : discountPercentage > 0 ? (
            <Badge className="px-2 py-0.5 text-xs font-medium bg-green-500">
              -{discountPercentage}%
            </Badge>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <Button
          onClick={handleAddToWishlist}
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-white transition-colors"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Info */}
      <CardContent className="flex-grow p-3">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-600">
            {product?.averageRating || "0.0"}
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/products/${product?._id}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
            {product?.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-auto">
          {product?.offerPrice ? (
            <>
              <span className="text-lg font-semibold text-primary">
                ${product?.offerPrice}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ${product?.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-primary">
              ${product?.price}
            </span>
          )}
        </div>
      </CardContent>

      {/* Action Button */}
      <CardFooter className="p-3 pt-0">
        <Button
          onClick={handleAddProduct}
          disabled={product?.stock === 0}
          variant="default"
          size="sm"
          className={cn(
            "w-full h-9 rounded-full text-xs font-medium transition-all",
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
