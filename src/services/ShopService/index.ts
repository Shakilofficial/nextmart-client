/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const createShop = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });
    revalidateTag("SHOP");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyShop = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/shop/my-shop`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["SHOP"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
