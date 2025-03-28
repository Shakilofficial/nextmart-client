import Category from "@/components/modules/home/Category";
import FeaturedProduct from "@/components/modules/home/FeaturedProduct";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import TopBrands from "@/components/modules/home/TopBrands";
import TrendyProduct from "@/components/modules/home/TrendyProduct";

const HomePage = async () => {
  return (
    <div className="space-y-28 mt-7">
      <HeroSection />
      <TrendyProduct />
      <Category />
      <FeaturedProduct />
      <FlashSale />
      <TopBrands />
    </div>
  );
};
export default HomePage;
