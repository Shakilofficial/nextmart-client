import Category from "@/components/modules/home/Category";
import FeaturedProduct from "@/components/modules/home/FeaturedProduct";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import TopBrands from "@/components/modules/home/TopBrands";
import TrendyProduct from "@/components/modules/home/TrendyProduct";
import { getNewToken } from "@/services/AuthService";

const HomePage = async () => {
  const result = await getNewToken();
  console.log(result);
  return (
    <div className="space-y-28 mb-16">
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
