import Category from "@/components/modules/home/Category";
import CTA from "@/components/modules/home/CTA";
import FeaturedProduct from "@/components/modules/home/FeaturedProduct";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import Newsletter from "@/components/modules/home/NewsLetter";
import Testimonials from "@/components/modules/home/Testimonials";
import TopBrands from "@/components/modules/home/TopBrands";
import TrendyProduct from "@/components/modules/home/TrendyProduct";

const HomePage = async () => {
  return (
    <div className="space-y-28 mt-10">
      <HeroSection />
      <TrendyProduct />
      <Category />
      <FeaturedProduct />
      <FlashSale />
      <TopBrands />
      <CTA />
      <Testimonials />
      <Newsletter />
    </div>
  );
};
export default HomePage;
