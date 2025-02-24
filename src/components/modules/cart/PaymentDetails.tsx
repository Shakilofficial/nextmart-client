"use client";
import { Button } from "@/components/ui/button";
import { subTotalSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";

const PaymentDetails = () => {
  const subTotal = useAppSelector(subTotalSelector);
  return (
    <div className="border-2 border-white shadow-md border-primary/30 bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">{subTotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Discount</p>
          <p className="font-semibold">00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">00</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">00</p>
      </div>
      <Button className="w-full font-semibold py-2">Order Now</Button>
    </div>
  );
};

export default PaymentDetails;
