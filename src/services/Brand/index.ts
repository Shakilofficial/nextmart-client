"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllBrands = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["BRAND"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleBrand = async (brandId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,
      {
        next: {
          tags: ["BRAND"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createBrand = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteBrand = async (brandId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
