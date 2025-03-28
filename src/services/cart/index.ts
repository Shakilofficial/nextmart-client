/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IOrder } from "@/types";
import { getValidToken } from "@/utils/verifyToken";

export const createOrder = async (order: IOrder) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
