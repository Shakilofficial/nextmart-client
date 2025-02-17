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
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [isOpen, setIsOpen] = useState(false);

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
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
      } else {
        toast.error(res.message);
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
        <DialogHeader className="flex justify-center text-center text-primary">
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
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
            {/* Wrap all children in a single container */}

            <TextInput
              name="name"
              label="Category Name"
              placeholder="Enter your category name"
            />
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
                  className="mt-8"
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
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
