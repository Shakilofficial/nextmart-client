"use client";
import { Form } from "@/components/form/Form";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createFlashSale } from "@/services/FlashSale";
import { TicketPercent } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TDiscountModalProps = {
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
};

const DiscountModal = ({
  selectedIds,
  setSelectedIds,
}: TDiscountModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({});

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      products: [...selectedIds],
      discountPercentage: parseFloat(data.discountPercentage),
    };
    console.log(modifiedData);
    try {
      const res = await createFlashSale(modifiedData);
      if (res.success) {
        toast.success(res.message);
        setSelectedIds([]);
        setIsOpen(false);
        reset();
      } else {
        toast.error(res.errorSources[0].message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button disabled={!selectedIds?.length} size={"sm"}>
            <span>
              <TicketPercent />
            </span>
            Add Flash Sale
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm md:max-w-md rounded-lg border-2 border-primary/50">
          <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
            <DialogTitle className="text-xl text-center ">
              Create Flash Sale
            </DialogTitle>
            <DialogDescription className="text-sm text-center">
              Create a new flash sale for your product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form
              form={form}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              isValid={isValid}
              recaptchaStatus={true}
            >
              <TextInput
                name="discountPercentage"
                label="Discount Percentage"
                placeholder="Enter your discount percentage"
                type="number"
              />
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscountModal;
