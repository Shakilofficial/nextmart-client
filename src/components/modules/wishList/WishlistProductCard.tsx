/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface WishlistProductCardProps {
  product: any;
  onRemove: (productId: string) => void;
  onAddToCart: (product: any) => void;
}

const WishlistProductCard = ({
  product,
  onRemove,
  onAddToCart,
}: WishlistProductCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      onAddToCart(product);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    setIsRemoving(true);
    try {
      onRemove(product._id);
    } finally {
      setIsRemoving(false);
    }
  };

  const discountPercentage =
    product.offerPrice && product.price
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  const formattedDate = new Date(product.addedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group bg-white rounded-lg border shadow-sm overflow-hidden hover:border-primary/30 transition-colors">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Product Image */}
        <div className="relative h-36 sm:h-40 sm:w-36 md:w-40 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
          <Link
            href={`/products/${product._id}`}
            className="block w-full h-full"
          >
            {product.imageUrls?.[0] && (
              <Image
                src={product.imageUrls[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-300 rounded-md ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsImageLoading(false)}
              />
            )}
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {product.brand?.name} • {product.category?.name}
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="group-hover:text-primary transition-colors"
              >
                <h3 className="font-medium text-sm line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-2 flex items-center gap-2">
                {product.offerPrice ? (
                  <>
                    <span className="font-semibold text-primary text-sm">
                      {currencyFormatter(product.offerPrice)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {currencyFormatter(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-sm">
                    {currencyFormatter(product.price)}
                  </span>
                )}
              </div>

              <div className="mt-1 text-xs">
                <span
                  className={
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </span>
                <span className="text-muted-foreground ml-2">
                  Added on {formattedDate}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleRemoveFromWishlist}
              disabled={isRemoving}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto pt-3 flex gap-2">
            <Button
              size="sm"
              className="text-secondary border-secondary/20 hover:bg-rose-800"
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock <= 0}
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Add to Cart
            </Button>

            <Link href={`/products/${product._id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductCard;
