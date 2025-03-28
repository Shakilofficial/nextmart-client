"use client";
import emptyCart from "@/assets/photos/empty-cart.png";
import { Button } from "@/components/ui/button";
import {
  type CartProduct,
  orderedProductsSelector,
} from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartProductCard from "./CartProductCard";

const CartProducts = () => {
  const products = useAppSelector(orderedProductsSelector);

  return (
    <div className="border rounded-lg shadow-sm bg-background p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-40">
              <Image
                src={emptyCart || "/placeholder.svg"}
                alt="Empty cart"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
            Looks like you haven&apost added anything to your cart yet. Browse
            our products and find something you&aposll love!
          </p>
          <Link href="/products">
            <Button className="rounded-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product: CartProduct) => (
            <CartProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartProducts;
