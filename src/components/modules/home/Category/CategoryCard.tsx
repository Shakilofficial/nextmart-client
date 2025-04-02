"use client";

import { cn } from "@/lib/utils";
import type { ICategory } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Link
      href={`/products?category=${category._id}`}
      className={cn(
        "block h-full bg-background border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md group"
      )}
    >
      <div className="relative aspect-square w-full bg-muted/30 flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          <Image
            src={category?.icon || "/placeholder.svg?height=200&width=200"}
            alt={category?.name || "Category"}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      </div>

      <div className="p-3 text-center">
        <h3 className="font-medium truncate">{category?.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
