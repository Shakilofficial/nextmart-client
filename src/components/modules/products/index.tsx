"use client";

import type { IProduct } from "@/types/product";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

const AllProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="container mx-auto w-full flex gap-4 px-2">
      <div className="max-w-sm w-[384px]">
        <FilterSidebar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mx-auto">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
