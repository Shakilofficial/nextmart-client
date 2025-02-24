"use client";
import { Button } from "@/components/ui/button";
import {
  CartProduct,
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeProduct,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

const CartProductCard = ({ product }: { product: CartProduct }) => {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="bg-white rounded-lg flex p-5 gap-5 border-2 shadow-sm border-primary/10">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={product?.imageUrls?.[0]}
          height={100}
          width={100}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-lg font-semibold">{product?.name}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Color:</span>
            <span className="font-semibold">Black</span>
          </p>
          <p>
            <span className="text-gray-500">Stock Availability:</span>
            <span className="font-semibold">{product?.stock}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price:
            {product.offerPrice ? product.offerPrice : product.price}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
              onClick={() => handleDecrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {product?.orderQuantity}
            </p>
            <Button
              onClick={() => handleIncrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveProduct(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
