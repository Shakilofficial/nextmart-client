export interface ICoupon {
  _id: string;
  code: string;
  shop: string;
  discountType: "Percentage" | "Fixed";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICouponPayload {
  shopId: string;
  subTotal: number;
  couponCode: string;
}
