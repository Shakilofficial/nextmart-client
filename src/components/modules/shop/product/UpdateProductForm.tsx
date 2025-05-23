/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { TextInput } from "@/components/form/TextInput";
import { Textarea } from "@/components/form/Textarea";
import { Button } from "@/components/ui/button";
import { getAllBrands } from "@/services/Brand";
import { getAllCategories } from "@/services/Category";
import { updateProduct } from "@/services/Product";
import { IBrand, ICategory } from "@/types";
import { IProduct } from "@/types/product";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";

export default function UpdateProductForm({ product }: { product: IProduct }) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    product?.imageUrls || []
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      category: product?.category?._id || "",
      brand: product?.brand?._id || "",
      stock: product?.stock?.toString() || "",
      weight: product?.weight?.toString() || "",
      availableColors: product?.availableColors?.map((color) => ({
        value: color,
      })) || [{ value: "" }],
      keyFeatures: product?.keyFeatures?.map((feature) => ({
        value: feature,
      })) || [{ value: "" }],
      specification: Object.entries(product?.specification || {})?.map(
        ([key, value]) => ({
          key,
          value,
        })
      ) || [{ key: "", value: "" }],
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Field arrays
  const { append: appendColor, fields: colorFields } = useFieldArray({
    control: form.control,
    name: "availableColors",
  });

  const { append: appendFeature, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });

  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          getAllCategories(),
          getAllBrands(),
        ]);
        setCategories(categoriesData?.data || []);
        setBrands(brandsData?.data || []);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Convert form data to API-compatible format
      const availableColors = data.availableColors?.map(
        (color: { value: string }) => color.value
      );

      const keyFeatures = data.keyFeatures?.map(
        (feature: { value: string }) => feature.value
      );

      const specification = Object.fromEntries(
        data.specification?.map((item: { key: string; value: string }) => [
          item.key,
          item.value,
        ])
      );

      const modifiedData = {
        ...data,
        availableColors,
        keyFeatures,
        specification,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        weight: parseFloat(data.weight),
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));

      // Append new images
      imageFiles.forEach((file) => formData.append("images", file));

      // Correct API call parameter order
      const res = await updateProduct(product._id, formData);

      if (res.success) {
        toast.success(res.message);
        router.push("/user/shop/products");
      } else {
        const errorMessage =
          res.errorSources?.[0]?.message || res.message || "Unknown error";
        toast.error(errorMessage);
      }
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err.message || "Failed to update product");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-xl font-bold">Update Product</h1>
      </div>

      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        recaptchaStatus={true}
      >
        <div className="space-y-4">
          {/* Basic Information Section */}
          <div className="border-t border-b py-3 my-5">
            <h2 className="text-primary font-bold text-xl">
              Basic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextInput
              name="name"
              label="Product Name"
              placeholder="Enter product name"
            />
            <TextInput
              name="price"
              label="Price"
              type="number"
              placeholder="Enter price"
            />
            <SelectDropdown
              name="category"
              label="Category"
              options={categories?.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
              placeholder="Select Product Category"
            />
            <SelectDropdown
              name="brand"
              label="Brand"
              options={brands?.map((b) => ({ value: b._id, label: b.name }))}
              placeholder="Select Product Brand"
            />
            <TextInput
              name="stock"
              label="Stock"
              type="number"
              placeholder="Enter stock quantity"
            />
            <TextInput
              name="weight"
              label="Weight"
              type="number"
              placeholder="Enter weight"
            />
          </div>

          <Textarea
            name="description"
            label="Description"
            placeholder="Enter product description"
          />

          {/* Images Section */}
          <div className="border-t border-b py-3 my-5">
            <h2 className="text-primary font-bold text-xl">Images</h2>
          </div>
          <div className="flex gap-4 flex-wrap">
            <ImageUploader
              name="images"
              label="Upload New Images"
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
            />
            <ImagePreviewer
              className="flex flex-wrap gap-4"
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>

          {/* Available Colors Section */}
          <div className="border-t border-b py-3 my-5">
            <div className="flex justify-between items-center">
              <h2 className="text-primary font-bold text-xl">
                Available Colors
              </h2>
              <Button
                variant="outline"
                className="size-10"
                onClick={() => appendColor({ value: "" })}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {colorFields?.map((field, index) => (
              <TextInput
                key={field.id}
                name={`availableColors.${index}.value`}
                label={`Color ${index + 1}`}
                placeholder="Enter color"
              />
            ))}
          </div>

          {/* Key Features Section */}
          <div className="border-t border-b py-3 my-5">
            <div className="flex justify-between items-center">
              <h2 className="text-primary font-bold text-xl">Key Features</h2>
              <Button
                variant="outline"
                className="size-10"
                onClick={() => appendFeature({ value: "" })}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {featureFields?.map((field, index) => (
              <TextInput
                key={field.id}
                name={`keyFeatures.${index}.value`}
                label={`Feature ${index + 1}`}
                placeholder="Enter feature"
              />
            ))}
          </div>

          {/* Specifications Section */}
          <div className="border-t border-b py-3 my-5">
            <div className="flex justify-between items-center">
              <h2 className="text-primary font-bold text-xl">Specifications</h2>
              <Button
                variant="outline"
                className="size-10"
                onClick={() => appendSpec({ key: "", value: "" })}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {specFields?.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <TextInput
                  name={`specification.${index}.key`}
                  label={`Spec Key ${index + 1}`}
                  placeholder="Enter specification key"
                />
                <TextInput
                  name={`specification.${index}.value`}
                  label={`Spec Value ${index + 1}`}
                  placeholder="Enter specification value"
                />
              </div>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
}
