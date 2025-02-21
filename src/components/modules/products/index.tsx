import { IProduct } from "@/types";
import FeaturedProductCard from "../home/FeaturedProduct/FeaturedProductCard";
import FilterSidebar from "./FilterSidebar";

const AllProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="container mx-auto w-full flex gap-4 px-2">
      <div>
        <FilterSidebar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mx-auto">
        {products.map((product) => (
          <FeaturedProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
