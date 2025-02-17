"use client";

import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { TextInput } from "@/components/form/TextInput";
import { Textarea } from "@/components/form/Textarea";
import { createShop } from "@/services/ShopService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createShopSchema } from "./createShopSchema";

export default function CreateShopForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    resolver: zodResolver(createShopSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const servicesOffered = data?.servicesOffered
      .split(",")
      .map((service: string) => service.trim())
      .filter((service: string) => service !== "");

    const modifiedData = {
      ...data,
      servicesOffered: servicesOffered,
      establishedYear: Number(data?.establishedYear),
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("logo", imageFiles[0] as File);

      const res = await createShop(formData);

      console.log(res);

      if (res.success) {
        toast.success(res.message);
        reset();
        setImageFiles([]);
        setImagePreview([]);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        recaptchaStatus={true}
      >
        {/* Wrap all children in a single container */}
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextInput
              name="shopName"
              label="Shop Name"
              placeholder="Enter your shop name"
            />
            <TextInput
              name="businessLicenseNumber"
              label="Business License Number"
              placeholder="Enter your business license number"
            />
            <TextInput
              name="address"
              label="Address"
              placeholder="Enter your shop address"
            />
            <TextInput
              name="contactNumber"
              label="Contact Number"
              placeholder="Enter your contact number"
            />
            <TextInput
              name="website"
              label="Website"
              placeholder="Enter your website URL"
            />
            <TextInput
              type="number"
              name="establishedYear"
              label="Established Year"
              placeholder="Enter the year your shop was established"
            />
            <TextInput
              name="taxIdentificationNumber"
              label="Tax Identification Number"
              placeholder="Enter your tax identification number"
            />
            <TextInput
              name="socialMediaLinks.facebook"
              label="Facebook"
              placeholder="Enter your Facebook profile URL"
            />
            <TextInput
              name="socialMediaLinks.twitter"
              label="Twitter"
              placeholder="Enter your Twitter profile URL"
            />
            <TextInput
              name="socialMediaLinks.instagram"
              label="Instagram"
              placeholder="Enter your Instagram profile URL"
            />

            <Textarea
              name="servicesOffered"
              label="Services Offered"
              placeholder="List your services, separated by commas"
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
                  name="logo"
                  label="Upload Shop Logo"
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                />
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
