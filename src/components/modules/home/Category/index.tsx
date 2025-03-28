import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/Category";
import { ICategory } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

const Category = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div className="container mx-auto my-20 px-4 w-full">
      <div className="flex items-center justify-between mb-10 text-primary">
        <h2 className="font-bold text-2xl">Category</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-xl">
            View All
            <ChevronRightCircle />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {categories?.map((category: ICategory) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Category;
