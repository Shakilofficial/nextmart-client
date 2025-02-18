"use client";

import HeroSection from "@/components/modules/home/HeroSection";
import TrendyProduct from "@/components/modules/home/TrendyProduct";
import { useUser } from "@/contexts/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div className="mb-16">
      <HeroSection />
      <TrendyProduct />
    </div>
  );
};

export default HomePage;
