"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { addProduct } from "@/redux/features/cartSlice";
import { addToWishlist } from "@/redux/features/wishListSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  const handleAddToWishlist = (product: IProduct) => {
    dispatch(addToWishlist(product));
  };

  // Calculate discount percentage if there's an offer price
  const discountPercentage = product?.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md h-full flex flex-col">
      {/* Image Section */}
      <CardHeader className="relative p-0 aspect-square overflow-hidden">
        <Link
          href={`/products/${product?._id}`}
          className="block w-full h-full"
        >
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
            <Image
              src={
                product?.imageUrls[0] ||
                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png" ||
                "/placeholder.svg"
              }
              alt={product?.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
              className="rounded-t-lg"
            />
          </div>
        </Link>

        {/* Stock Badge */}
        {product?.stock === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-full">
            Out of Stock
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist Button */}
        <Button
          onClick={() => handleAddToWishlist(product)}
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-white transition-colors"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </CardHeader>

      {/* Product Info */}
      <CardContent className="flex flex-col gap-2 p-4 flex-grow">
        <Link
          href={`/products/${product?._id}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="font-medium text-sm md:text-base line-clamp-2 h-[3rem] mb-1">
            {product?.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex">
            {[...Array(5)]?.map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill={
                  i < Math.floor(product?.averageRating || 0)
                    ? "orange"
                    : "transparent"
                }
                stroke={
                  i < Math.floor(product?.averageRating || 0)
                    ? "orange"
                    : "gray"
                }
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-500 ml-1">
            {product?.averageRating || 0}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          {product?.offerPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-primary">
                ${product?.offerPrice}
              </span>
              <span className="text-2xl text-gray-400 line-through">
                ${product?.price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-primary">
              ${product?.price}
            </span>
          )}
        </div>
      </CardContent>

      {/* Action Button */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => handleAddProduct(product)}
          disabled={product?.stock === 0}
          variant="default"
          size="sm"
          className={cn(
            "w-full rounded-full transition-all",
            product?.stock === 0
              ? "bg-gray-300 hover:bg-gray-300"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          <span className="text-xs sm:text-sm">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedProductCard;
