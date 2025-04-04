import NContainer from "@/components/core/NContainer";
import ProductBanner from "@/components/modules/products/Banner";
import WishListProducts from "@/components/modules/wishList/WishListProducts";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wish List",
  description:
    "View your wishlist on NEXA — your online store for fashion, electronics, home essentials, and more.",
};

const WishListPage = () => {
  return (
    <NContainer>
      <ProductBanner title="Wish List" path="Home - Wish List" />
      <WishListProducts />
    </NContainer>
  );
};

export default WishListPage;
