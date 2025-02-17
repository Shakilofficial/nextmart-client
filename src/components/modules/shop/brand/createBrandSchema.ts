import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(2, "Brand name is required."),
  logo: z.any().optional(),
});
