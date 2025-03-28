import NContainer from "@/components/core/NContainer";
import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/Banner";

const CartPage = () => {
  return (
    <NContainer>
      <ProductBanner title="Shopping Cart" path="Home - Cart" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 my-5 w-full p-4 md:p-8">
        <div className="col-span-1 md:col-span-8 space-y-4">
          <CartProducts />
        </div>
        <div className="col-span-1 md:col-span-4 space-y-4">
          <Coupon />
          <Address />
          <PaymentDetails />
        </div>
      </div>
    </NContainer>
  );
};

export default CartPage;
