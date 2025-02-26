import ManageCoupon from "@/components/modules/shop/manage-coupon";
import CreateCouponModal from "@/components/modules/shop/manage-coupon/CreateCouponModal";
import { getCoupons } from "@/services/coupon";

const ManageCouponPage = async () => {
  const { data } = await getCoupons();
  const coupons = data.result;
  const meta = data.meta;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Manage Coupon</h1>
        <CreateCouponModal />
      </div>
      <div>
        <ManageCoupon coupons={coupons} meta={meta} />
      </div>
    </div>
  );
};

export default ManageCouponPage;
