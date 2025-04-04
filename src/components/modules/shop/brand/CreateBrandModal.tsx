/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
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
import { createBrand } from "@/services/Brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createBrandSchema } from "./createBrandSchema";

const CreateBrandModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(createBrandSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("logo", imageFiles[0] as File);
      const res = await createBrand(formData);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
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
          <Button size={"sm"}>
            <span>
              <Tag />
            </span>
            Add Brand
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm md:max-w-md rounded-lg border-2 border-primary/50">
          <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
            <DialogTitle className="text-xl text-center ">
              Create Brand
            </DialogTitle>
            <DialogDescription className="text-sm text-center">
              Create a new brand for your shop.
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
                name="name"
                label="Brand Name"
                placeholder="Enter your brand name"
              />

              <div className="flex flex-col">
                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="mt-4"
                  />
                ) : (
                  <ImageUploader
                    name="logo"
                    label="Upload Brand Logo"
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                  />
                )}
              </div>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBrandModal;
