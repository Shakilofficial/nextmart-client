import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  className?: string;
}

export function TrendyProductCard({
  title,
  price,
  originalPrice,
  image,
  className,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden shadow-lg rounded-lg bg-gradient-to-br from-primary/10 to-orange-300/10 transition-transform hover:scale-[1.02] duration-200",
        "flex flex-col items-center text-center h-[230px] md:h-[250px] border-2 border-white",
        className
      )}
    >
      <CardContent className="p-4 flex flex-col justify-between h-full w-full">
        {/* Product Image - Fixed Size */}
        <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] mx-auto">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100px, 120px"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between flex-1 mt-3">
          <h3 className="text-sm md:text-base font-semibold line-clamp-2 px-2">
            {title}
          </h3>
          <div className="flex justify-center items-baseline gap-2 pt-2">
            <span className="text-lg md:text-xl font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
