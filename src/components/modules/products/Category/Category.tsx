"use client";

import { ICategory } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import CategoryCard from "../../home/Category/CategoryCard";

const Category = ({ categories }: { categories: ICategory[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="py-6 px-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-primary">All Categories</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 bg-primary/40 hover:bg-gray-300 rounded-full transition duration-200"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 bg-primary/40 hover:bg-gray-300 rounded-full transition duration-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Embla Carousel Wrapper */}
      <div className="overflow-hidden py-2" ref={emblaRef}>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <div key={category._id} className="flex-shrink-2 w-[150px] ">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
