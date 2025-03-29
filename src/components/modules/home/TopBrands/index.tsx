import { Button } from "@/components/ui/button";
import { getAllBrands } from "@/services/Brand";
import { IBrand } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";
import BrandCard from "./BrandCard";

const TopBrands = async () => {
  const { data: brands } = await getAllBrands();

  return (
    <div className="container mx-auto my-20 px-4 w-full">
      <div className="flex items-center justify-between mb-10 text-primary">
        <h2 className="font-bold text-2xl">Top Brands</h2>
        <Link href="/brands">
          <Button variant="outline" className="rounded-xl">
            All Brands
            <ChevronRightCircle className="w-5 h-5" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {brands?.map((brand: IBrand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default TopBrands;
