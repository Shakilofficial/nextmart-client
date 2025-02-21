import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/services/Product";
import { IProduct } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProduct = async () => {
  const { data: products } = await getAllProducts();

  return (
    <div className="container mx-auto my-20 px-4 w-full">
      <div className="flex items-center justify-between mb-10 text-primary">
        <h2 className="font-bold text-2xl">Featured Product</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-xl">
            All Products
            <ChevronRightCircle />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {products.map((product: IProduct) => (
          <FeaturedProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
