"use client";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  type CartProduct,
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeProduct,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartProductCardProps {
  product: CartProduct;
}

const CartProductCard = ({ product }: CartProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleIncrementQuantity = () => {
    dispatch(incrementOrderQuantity(product._id));
  };

  const handleDecrementQuantity = () => {
    if (product.orderQuantity > 1) {
      dispatch(decrementOrderQuantity(product._id));
    }
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct(product._id));
  };

  const price = product.offerPrice || product.price;
  const totalPrice = price * product.orderQuantity;

  return (
    <div className="bg-white rounded-lg border shadow-sm p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 mx-auto sm:mx-0">
          {product?.imageUrls?.[0] && (
            <Image
              src={product.imageUrls[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsImageLoading(false)}
            />
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <h3 className="font-medium text-base sm:text-lg line-clamp-2">
              {product.name}
            </h3>
            <div className="text-right mt-1 sm:mt-0">
              <p className="font-semibold text-primary">
                {currencyFormatter(price)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
            <p>
              <span>Color: </span>
              <span className="font-medium">Black</span>
            </p>
            <span className="hidden sm:inline">•</span>
            <p>
              <span>Stock: </span>
              <span className="font-medium">{product.stock}</span>
            </p>
          </div>

          <div className="mt-auto pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center">
              <Button
                onClick={handleDecrementQuantity}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded"
                disabled={product.orderQuantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-10 text-center font-medium">
                {product.orderQuantity}
              </span>

              <Button
                onClick={handleIncrementQuantity}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded"
                disabled={product.orderQuantity >= product.stock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <p className="font-semibold">{currencyFormatter(totalPrice)}</p>

              <Button
                onClick={handleRemoveProduct}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded hover:bg-red-50 hover:text-red-500 hover:border-red-200"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
