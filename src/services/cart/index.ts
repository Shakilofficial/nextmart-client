"use server";

import { getValidToken } from "@/lib/verifyToken";
import { IOrder } from "@/types";

export const createOrder = async (order: IOrder) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
