"use client";

import Category from "@/components/modules/home/Category";
import FeaturedProduct from "@/components/modules/home/FeaturedProduct";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import TrendyProduct from "@/components/modules/home/TrendyProduct";

const HomePage = () => {
  return (
    <div className="space-y-24 mb-16">
      <HeroSection />
      <TrendyProduct />
      <Category />
      <FeaturedProduct />
      <FlashSale />
    </div>
  );
};

export default HomePage;
