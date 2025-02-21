import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FlashSaleProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card className="shadow-md rounded-lg border-2 border-white bg-gradient-to-r from-rose-100/10 to-orange-200/10 transition-transform hover:scale-[1.02] duration-200 p-4 flex flex-col justify-between">
      {/* Image Section */}
      <CardHeader className="aspect-video relative mb-4 rounded-lg overflow-hidden">
        <Image
          src={product?.imageUrls[0] || "/placeholder.svg"}
          alt={product?.name}
          fill
          className="object-cover"
        />
        {product?.stock === 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 text-xs font-medium rounded-full">
            Out of Stock
          </div>
        )}
      </CardHeader>

      {/* Rating Section */}
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium text-gray-700">
          {product?.averageRating}
        </span>
      </div>

      {/* Product Title */}
      <Link href={`/products/${product?._id}`} passHref>
        <CardTitle className="cursor-pointer text-base font-semibold text-gray-600 mb-2 line-clamp-2">
          {product?.name}
        </CardTitle>
      </Link>

      {/* Price Section */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-semibold text-primary">
          {product?.offerPrice ? (
            <>
              <span className="text-orange-500">${product?.offerPrice}</span>
              <del className="text-xs text-gray-500 ml-2">
                ${product?.price}
              </del>
            </>
          ) : (
            <span>${product?.price}</span>
          )}
        </p>
      </div>

      {/* Action Buttons */}
      <CardFooter className="px-2 flex justify-between">
        <div className="flex gap-2 items-center justify-between w-full">
          <Button
            disabled={product?.stock === 0}
            className="flex-1 rounded-full"
          >
            Buy Now
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/50">
            <span className="sr-only">Add to cart</span>
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/50">
            <span className="sr-only">Add to wishlist</span>
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FlashSaleProductCard;
