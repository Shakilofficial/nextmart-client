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
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        <div className="relative h-48 sm:h-auto sm:w-40 md:w-48 bg-gray-100 flex-shrink-0">
          <Link href={`/products/${product.slug}`}>
            <div className="w-full h-full relative">
              {product.imageUrls?.[0] && (
                <Image
                  src={product.imageUrls[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    isImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setIsImageLoading(false)}
                />
              )}
            </div>
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-primary text-white">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <div className="mb-1">
                <span className="text-xs text-muted-foreground">
                  {product.brand?.name} • {product.category?.name}
                </span>
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="group-hover:text-primary transition-colors"
              >
                <h3 className="font-medium line-clamp-2">{product.name}</h3>
              </Link>

              <div className="mt-2 flex items-baseline gap-1.5">
                {product.offerPrice ? (
                  <>
                    <span className="font-semibold text-primary">
                      {currencyFormatter(product.offerPrice)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {currencyFormatter(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">
                    {currencyFormatter(product.price)}
                  </span>
                )}
              </div>

              <div className="mt-1 text-sm">
                <span
                  className={
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </span>
                <span className="text-muted-foreground text-xs ml-3">
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

          <div className="mt-auto pt-3 flex flex-wrap gap-2 justify-end sm:justify-start">
            <Button
              variant="outline"
              size="sm"
              className="text-primary border-primary/20 hover:bg-primary/10"
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <Link href={`/products/${product.slug}`}>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Product description preview */}
      {product.description && (
        <div className="px-4 pb-4 pt-0 border-t mt-2 hidden sm:block">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default WishlistProductCard;
