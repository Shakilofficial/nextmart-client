import { cn } from "@/lib/utils";
import type { IBrand } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface BrandCardProps {
  brand: IBrand;
  className?: string;
}

const BrandCard = ({ brand, className }: BrandCardProps) => {
  return (
    <Link
      href={`/products?brand=${brand?._id}`}
      className={cn(
        "block h-full bg-background border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md group",
        className
      )}
    >
      <div className="relative aspect-square w-full bg-muted/30 flex items-center justify-center p-4">
        {/* Brand logo */}
        <div className="relative w-full h-full">
          <Image
            src={brand.logo || "/placeholder.svg?height=200&width=200"}
            alt={brand.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      </div>

      <div className="p-3 text-center">
        <h3 className="font-medium truncate">{brand.name}</h3>
      </div>
    </Link>
  );
};

export default BrandCard;
