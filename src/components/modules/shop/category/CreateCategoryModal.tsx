"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { Textarea } from "@/components/form/Textarea";
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
import { createCategory } from "@/services/Category";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutGridIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategorySchema } from "./createCategorySchema";

const CreateCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
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
      formData.append("icon", imageFiles[0] as File);
      const res = await createCategory(formData);

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <span>
            <LayoutGridIcon />
          </span>
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md rounded-lg border-2 border-primary/50">
        <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
          <DialogTitle className="text-xl text-center ">
            Create Category
          </DialogTitle>
          <DialogDescription className="text-sm text-center">
            Create a new category for your shop.
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
              label="Category Name"
              placeholder="Enter your category name"
            />
            <div className="flex justify-between gap-2">
              <Textarea
                name="description"
                label="Category Description"
                placeholder="Enter Description of Category"
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
                    name="icon"
                    label="Upload Category Icon"
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                  />
                )}
              </div>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
