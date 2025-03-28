"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products?category=${category._id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden shadow-sm rounded-md bg-gray-50 transition-transform hover:scale-[1.05] duration-200",
        "flex flex-col items-center text-center cursor-pointer",
        "h-[120px] w-[110px] border border-gray-200"
      )}
    >
      <CardContent className="p-2 flex flex-col justify-between relative z-10">
        <div className="relative w-[80px] h-[80px] mx-auto">
          <Image
            src={category?.icon || "/placeholder.svg"}
            alt={category?.name}
            fill
            sizes="(max-width: 768px) 80px"
          />
        </div>

        <h3 className="text-xs font-semibold truncate mt-1 text-gray-700">
          {category?.name}
        </h3>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
