/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IFlashSale } from "@/types";
import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const createFlashSale = async (
  productData: IFlashSale
): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flash-sale`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getFlashSaleProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flash-sale`, {
      next: {
        tags: ["PRODUCT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
