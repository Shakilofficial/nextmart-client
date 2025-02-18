import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden shadow-md rounded-lg bg-gray-50 transition-transform hover:scale-[1.02] duration-200",
        "transition-transform hover:scale-[1.02] duration-200 flex flex-col items-center text-center",
        "h-[150px] w-[140px] border-2 border-white"
      )}
    >
      <CardContent className="p-3 flex flex-col justify-between relative z-10">
        <div className="relative w-[100px] h-[100px] mx-auto">
          <Image
            src={category?.icon || "/placeholder.svg"}
            alt={category?.name}
            fill
            sizes="(max-width: 768px) 100px"
          />
        </div>

        <h3 className="text-sm font-semibold truncate mt-2 text-gray-700">
          {category?.name}
        </h3>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
