"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getCoupons = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["COUPON"],
      },
    });

    return await res.json();
  } catch (error: any) {
    return new Error(error);
  }
};

export const createCoupon = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      next: {
        tags: ["COUPON"],
      },
    });

    const result = await res.json();
    revalidateTag("COUPON");
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};
