/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Form } from "@/components/form/Form";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  couponSelector,
  fetchCoupon,
  shopSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, TicketPlus, Trash } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define validation schema
const couponSchema = z.object({
  coupon: z.string().min(3, "Coupon code must be at least 3 characters"),
});

const Coupon = () => {
  const dispatch = useAppDispatch();
  const subTotal = useAppSelector(subTotalSelector);
  const shopId = useAppSelector(shopSelector);
  const { isLoading, code } = useAppSelector(couponSelector);

  const form = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      coupon: "",
    },
  });

  const {
    formState: { isSubmitting, isValid },
    watch,
    reset,
  } = form;

  const couponInput = watch("coupon");

  const handleRemoveCoupon = () => {
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await dispatch(
        fetchCoupon({ couponCode: data.coupon, subTotal, shopId })
      ).unwrap();

      if (res.success) {
        toast.success("Coupon applied successfully!");
        reset();
      } else {
        toast.error(res.message || "Failed to apply coupon");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to apply coupon");
    }
  };

  return (
    <div className="border rounded-lg shadow-sm bg-background p-4 md:p-6">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-4">
          <TicketPlus className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Coupon Code</h2>
        </div>
        <p className="text-gray-500 mb-6">
          Enter your coupon code if you have one.
        </p>

        <Form
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
          recaptchaStatus={true}
        >
          <TextInput
            name="coupon"
            label="Coupon Code"
            placeholder="Promo / Coupon code"
          />
          {couponInput && (
            <Button
              onClick={handleRemoveCoupon}
              variant="outline"
              className="bg-red-100 rounded-full size-10"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin text-red-500" />
              ) : (
                <Trash size={24} className="text-red-500" />
              )}
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Coupon;
