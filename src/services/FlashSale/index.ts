"use server";

import { IFlashSale } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createFlashSale = async (
  productData: IFlashSale
): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flash-sale`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
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

export const getFlashSaleProducts = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/flash-sale?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
