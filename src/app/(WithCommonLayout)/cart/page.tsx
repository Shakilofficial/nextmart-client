import NContainer from "@/components/core/NContainer";
import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/Banner";

const CartPage = () => {
  return (
    <NContainer>
      <ProductBanner title="Cart Page" path="Home - Cart" />
      <div className="grid grid-cols-12 gap-8 my-5 w-full p-8">
        <CartProducts />
        <Coupon />
        <Address />
        <PaymentDetails />
      </div>
    </NContainer>
  );
};

export default CartPage;
