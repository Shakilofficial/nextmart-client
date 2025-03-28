import NContainer from "@/components/core/NContainer";
import ProductBanner from "@/components/modules/products/Banner";
import WishListProducts from "@/components/modules/wishList/WishListProducts";

const WishListPage = () => {
  return (
    <NContainer>
      <ProductBanner title="Wish List" path="Home - Wish List" />
      <WishListProducts />
    </NContainer>
  );
};

export default WishListPage;
