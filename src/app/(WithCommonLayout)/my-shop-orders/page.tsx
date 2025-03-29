import ProductBanner from "@/components/modules/products/Banner";
import MyShopOrders from "@/components/modules/user/my-shop-order/MyShopOrders";
import { getMyShopOrders } from "@/services/orderService";

const MyShopOrdersPage = async () => {
  const { data: orders } = await getMyShopOrders();
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <ProductBanner title="My Shop Orders" path="Home - My Shop Orders" />
      <MyShopOrders orders={orders} />
    </div>
  );
};

export default MyShopOrdersPage;
