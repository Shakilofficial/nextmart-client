/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const createCategory = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllCategories = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["CATEGORY"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleCategory = async (categoryId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        next: {
          tags: ["CATEGORY"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCategory = async (categoryId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
