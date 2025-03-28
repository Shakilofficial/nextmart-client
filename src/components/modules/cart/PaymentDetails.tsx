"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  citySelector,
  clearCart,
  couponSelector,
  discountAmountSelector,
  grandTotalSelector,
  orderedProductsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/services/cart";
import { CreditCard, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PaymentDetails = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const discountAmount = useAppSelector(discountAmountSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const coupon = useAppSelector(couponSelector);

  const { user } = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOrder = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const orderLoading = toast.loading("Processing your order...");

    try {
      if (!user) {
        router.push("/login");
        throw new Error("Please login to continue");
      }

      if (cartProducts.length === 0) {
        throw new Error("Your cart is empty");
      }

      if (!city) {
        throw new Error("Please select your city");
      }

      if (!shippingAddress) {
        throw new Error("Please enter your shipping address");
      }

      const orderData = {
        ...order,
        coupon: coupon.code || undefined,
        shop: order.shop || undefined,
      };

      const res = await createOrder(orderData);

      if (res.success) {
        toast.success("Order placed successfully!", { id: orderLoading });
        dispatch(clearCart());
        router.push(res.data.paymentUrl);
      } else {
        throw new Error(res.message || "Failed to place order");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(errorMessage, { id: orderLoading });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-sm bg-background p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Order Summary</h2>
      </div>

      {coupon.isLoading ? (
        <div className="space-y-3 mt-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      ) : (
        <>
          <div className="space-y-3 mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{currencyFormatter(subTotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600">
                {discountAmount > 0
                  ? `- ${currencyFormatter(discountAmount)}`
                  : currencyFormatter(0)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{currencyFormatter(shippingCost)}</span>
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">{currencyFormatter(grandTotal)}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleOrder}
            className="w-full mt-6"
            size="lg"
            disabled={isProcessing || cartProducts.length === 0}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Checkout Now
              </>
            )}
          </Button>

          {cartProducts.length === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              Add items to your cart to checkout
            </p>
          )}

          {!city && cartProducts.length > 0 && (
            <p className="text-center text-sm text-amber-600 mt-2">
              Please select your city
            </p>
          )}

          {!shippingAddress && city && cartProducts.length > 0 && (
            <p className="text-center text-sm text-amber-600 mt-2">
              Please enter your shipping address
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentDetails;
