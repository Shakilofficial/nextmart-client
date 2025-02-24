"use client";
import emptyCart from "@/assets/photos/empty-cart.png";
import { selectCart } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types";
import Image from "next/image";
import CartProductCard from "./CartProductCard";

const CartProducts = () => {
  const products = useAppSelector(selectCart);

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-8 h-full row-span-3 space-y-5">
      {products.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image src={emptyCart} alt="empty cart" />
          </div>
        </div>
      )}
      {products.map((product: IProduct) => (
        <CartProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CartProducts;
