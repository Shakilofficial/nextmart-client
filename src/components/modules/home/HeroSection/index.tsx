import cupImage from "@/assets/photos/cup-with-headphone.png";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <div
      className={`${styles.banner} container mx-auto rounded-3xl p-6 md:p-12 my-12 md:my-6`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-secondary text-transparent bg-clip-text">
            Don&apos;t Miss Out on <br className="hidden md:block" />
            These Unbeatable <br className="hidden md:block" />
            Black Friday Deals!
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-md">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock, shop now.
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <PulsatingButton className="w-full md:w-auto">
              Buy Now
            </PulsatingButton>
            <RippleButton className="w-full md:w-auto">
              All Products
            </RippleButton>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src={cupImage}
            alt="Cup with Headphone"
            className="w-48 md:w-56 lg:w-72 transition-transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
