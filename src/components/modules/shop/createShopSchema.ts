import { z } from "zod";

export const createShopSchema = z.object({
  shopName: z.string().min(1, "Shop name is required."),
  businessLicenseNumber: z
    .string()
    .min(1, "Business license number is required."),
  address: z.string().min(1, "Address is required."),
  contactNumber: z.string().min(1, "Contact number is required."),
  website: z.string().url("Invalid URL format.").nullable().optional(),
  servicesOffered: z.string().min(1, "At least one service must be offered."),
  establishedYear: z
    .string({ invalid_type_error: "Established year required." })
    .max(new Date().getFullYear(), "Year cannot be in the future."),
  socialMediaLinks: z
    .object({
      facebook: z.string().url("Invalid Facebook URL").optional(),
      twitter: z.string().url("Invalid Twitter URL").optional(),
      instagram: z.string().url("Invalid Instagram URL").optional(),
    })
    .nullable()
    .optional(),
  taxIdentificationNumber: z
    .string()
    .min(1, "Tax identification number is required."),
  logo: z.any().optional(),
});
