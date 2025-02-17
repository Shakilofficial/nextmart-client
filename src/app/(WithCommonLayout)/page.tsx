"use client";

import HeroSection from "@/components/modules/home/HeroSection";
import { useUser } from "@/contexts/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div className="mb-16">
      <HeroSection />
    </div>
  );
};

export default HomePage;
