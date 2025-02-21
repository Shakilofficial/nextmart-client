"use client";
import { Form } from "@/components/form/Form";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define validation schema
const couponSchema = z.object({
  coupon: z.string().min(3, "Coupon code must be at least 3 characters"),
});

const Coupon = () => {
  const form = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: { coupon: "" },
    mode: "onChange",
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
      console.log("Applying coupon:", data.coupon);
      toast.success("Coupon applied successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to apply coupon");
    }
  };

  return (
    <div className="border-2 border-white shadow-md border-primary/30 bg-background brightness-105 rounded-md col-span-4 p-5">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-xl font-bold text-primary">Use Coupon Code</h1>
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
            >
              <Trash size={24} className="text-red-500" />
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Coupon;
