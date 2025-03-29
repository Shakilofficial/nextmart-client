/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IOrder } from "@/types/cart";
import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const createOrder = async (order: IOrder) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    revalidateTag("ORDER");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
