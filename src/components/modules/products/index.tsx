"use client";

import ProductNotFound from "@/components/core/ProductNotFound";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { IMeta } from "@/types";
import type { IProduct } from "@/types/product";
import { Filter } from "lucide-react";
import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import ProductPagination from "./ProductPagination";

interface AllProductsProps {
  products: IProduct[];
  meta: IMeta;
}

const AllProducts = ({ products, meta }: AllProductsProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Filter Button */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-xl font-semibold">Products</h2>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
            <div className="h-full overflow-y-auto">
              <FilterSidebar onFilterApplied={() => setIsFilterOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-full md:w-[280px] lg:w-[320px] flex-shrink-0 sticky top-4 self-start">
          <FilterSidebar />
        </div>

        {/* Products Grid and Pagination */}
        <div className="flex-1">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="mt-8">
                <ProductPagination totalPage={meta?.totalPage} />
              </div>
            </>
          ) : (
            <ProductNotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
