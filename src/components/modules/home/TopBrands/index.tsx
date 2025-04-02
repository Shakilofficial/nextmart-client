import { Button } from "@/components/ui/button";
import { getAllBrands } from "@/services/Brand";
import type { IBrand } from "@/types";
import { ArrowRight, ChevronRightCircle, Star } from "lucide-react";
import Link from "next/link";
import BrandCard from "./BrandCard";

const TopBrands = async () => {
  const { data: brands } = await getAllBrands("1", "12");

  return (
    <section className="py-16 md:py-24 w-full bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="relative mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:justify-start">
              <div className="relative">
                <div className="absolute -inset-3 bg-rose-500/5 rounded-full blur-md"></div>
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-rose-500/10 rounded-full animate-pulse"></div>
                    <Star size={28} className="relative text-rose-500" />
                  </div>
                  <h2 className="font-bold text-2xl text-rose-500">
                    Top Brands
                  </h2>
                </div>
              </div>

              <p className="text-muted-foreground text-sm md:text-base max-w-md text-center sm:text-left">
                Discover premium quality from our curated selection
              </p>
            </div>

            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <Link href="/products" className="group">
                <Button
                  variant="outline"
                  className="rounded-lg border-rose-500/20 hover:bg-rose-500/5 hover:text-rose-600 transition-all duration-300"
                >
                  <span>View All</span>
                  <ChevronRightCircle className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block absolute -top-6 right-20 text-primary/10">
            <Star className="w-12 h-12" fill="currentColor" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-4 top-1/3 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
            <div className="absolute -right-4 bottom-1/3 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
            <div className="absolute left-1/4 bottom-0 w-16 h-16 bg-rose-500/5 rounded-full blur-lg"></div>
            <div className="absolute right-1/3 top-1/4 w-20 h-20 bg-rose-500/5 rounded-full blur-lg"></div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {brands.map((brand: IBrand) => (
                <div
                  key={brand._id}
                  className="group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl overflow-hidden"
                >
                  <BrandCard brand={brand} />
                </div>
              ))}
              <Link
                href="/products"
                className="sm:hidden flex flex-col items-center justify-center p-6 border border-dashed border-primary/20 rounded-xl bg-background/50 hover:bg-primary/5 transition-colors duration-300 text-center"
              >
                <ArrowRight className="w-8 h-8 mb-2 text-primary" />
                <span className="font-medium text-primary">View All</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
