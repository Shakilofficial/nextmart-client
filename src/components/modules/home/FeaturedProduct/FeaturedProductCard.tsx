"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addProduct } from "@/redux/features/cartSlice";
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

  return (
    <Card className="shadow-md rounded-lg border-2 border-white bg-gradient-to-r from-rose-50/10 to-orange-50/10 transition-transform hover:scale-[1.02] duration-200 w-full h-[280px] flex flex-col">
      {/* Image Section - Fixed Height */}
      <CardHeader className="relative w-full flex justify-center overflow-hidden rounded-t-lg h-[100px]">
        <div className="relative w-[70px] h-[70px] mx-auto">
          <Image
            src={
              product?.imageUrls[0] ||
              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
            }
            alt={product?.name}
            fill
            sizes="(max-width: 70px) 70px"
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>

        {product?.stock === 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 text-xs font-medium rounded-full">
            Out of Stock
          </div>
        )}

        {/* Heart Icon */}
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 rounded-full px-2 hover:bg-primary/50 z-10"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </CardHeader>

      {/* Product Info */}
      <CardContent className="flex flex-col gap-2 h-[120px]">
        <Link href={`/products/${product?._id}`} passHref>
          <CardTitle
            title={product?.name}
            className="cursor-pointer text-xs md:text-sm font-semibold line-clamp-2 text-gray-600"
          >
            {product?.name}
          </CardTitle>
        </Link>

        {/* Price & Rating */}
        <div className="flex items-center justify-between">
          <p className="text-lg text-primary/80">
            {product?.offerPrice ? (
              <>
                <span className="font-semibold text-orange-500">
                  $ {product?.offerPrice}
                </span>
                <del className="text-xs text-gray-500 ml-2">
                  $ {product?.price}
                </del>
              </>
            ) : (
              <span className="font-semibold text-lg text-primary/80">
                $ {product?.price}
              </span>
            )}
          </p>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            <span className="text-sm font-medium text-gray-700">
              {product?.averageRating}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="px-2 flex justify-between mt-auto">
        <div className="flex gap-2 items-center justify-between w-full">
          <Button
            disabled={product?.stock === 0}
            size="sm"
            variant="outline"
            className="w-full py-1 font-medium text-primary hover:bg-primary/70"
          >
            Buy Now
          </Button>
          <Button
            onClick={() => handleAddProduct(product)}
            disabled={product?.stock === 0}
            variant="outline"
            size="sm"
            className="rounded-full px-2 hover:bg-primary/50"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeaturedProductCard;
