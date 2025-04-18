import Category from "@/components/modules/home/Category";
import CTA from "@/components/modules/home/CTA";
import FeaturedProduct from "@/components/modules/home/FeaturedProduct";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import LatestProducts from "@/components/modules/home/LatestProducts";
import Newsletter from "@/components/modules/home/NewsLetter";
import Testimonials from "@/components/modules/home/Testimonials";
import TopBrands from "@/components/modules/home/TopBrands";
import TrendyProduct from "@/components/modules/home/TrendyProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to NEXA — your online store for fashion, electronics, home essentials, and more. Explore deals and top-rated products now.",
};

const HomePage = async () => {
  return (
    <div className="space-y-28 mt-10">
      <HeroSection />
      <TrendyProduct />
      <LatestProducts />
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
