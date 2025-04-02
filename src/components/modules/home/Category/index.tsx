import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/Category";
import type { ICategory } from "@/types";
import { ArrowRight, ChevronRightCircle, Grid3X3, Layers } from "lucide-react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

const Category = async () => {
  const { data: categories } = await getAllCategories("1", "12");

  return (
    <section className="py-16 md:py-20 w-full bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="relative mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:justify-start">
              <div className="relative">
                <div className="absolute -inset-3 bg-rose-500/5 rounded-full blur-md"></div>
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-rose-500/10 rounded-full animate-pulse"></div>
                    <Layers size={28} className="relative text-rose-600" />
                  </div>
                  <h2 className="font-bold text-2xl text-rose-500">
                    Categories
                  </h2>
                </div>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-md text-center sm:text-left">
                Shop by category to find what you&apos;re looking for
              </p>
            </div>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <Link href="/products" className="group">
                <Button
                  variant="outline"
                  className="rounded-lg border-rose-500/20 hover:bg-rose-500/5 hover:text-rose-600 transition-all duration-300"
                >
                  <span>View All Categories</span>
                  <ChevronRightCircle className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block absolute -top-6 right-20 text-rose-500/10">
            <Grid3X3 className="w-12 h-12" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-4 top-1/3 w-24 h-24 bg-rose-500/5 rounded-full blur-xl"></div>
            <div className="absolute -right-4 bottom-1/3 w-32 h-32 bg-rose-500/5 rounded-full blur-xl"></div>
            <div className="absolute left-1/4 bottom-0 w-16 h-16 bg-rose-500/5 rounded-full blur-lg"></div>
            <div className="absolute right-1/3 top-1/4 w-20 h-20 bg-rose-500/5 rounded-full blur-lg"></div>
          </div>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">
                Popular Categories
              </h3>
              <span className="text-sm text-gray-500">
                {categories?.length || 0} Categories
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {categories?.map((category: ICategory) => (
                <div key={category._id} className="aspect-square">
                  <CategoryCard category={category} />
                </div>
              ))}
              <Link
                href="/products"
                className="sm:hidden aspect-square flex flex-col items-center justify-center p-4 border border-dashed border-rose-200 rounded-xl bg-rose-50/50 hover:bg-rose-100/50 transition-colors duration-300 text-center"
              >
                <ArrowRight className="w-8 h-8 mb-2 text-rose-500" />
                <span className="font-medium text-rose-600 text-sm">
                  View All
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
