"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, SearchX } from "lucide-react";

interface ProductNotFoundProps {
  className?: string;
}

const ProductNotFound = ({ className }: ProductNotFoundProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center py-12 px-4 sm:py-16 sm:px-6",
        "bg-gradient-to-b from-rose-50/50 to-background rounded-xl",
        "border border-rose-100 shadow-sm",
        "animate-in fade-in duration-700",
        className
      )}
    >
      <div className="relative mb-6">
        {/* Main icon with pulse effect */}
        <div className="relative z-10">
          <SearchX
            size={64}
            className="text-primary animate-in zoom-in-50 duration-700 delay-300"
            strokeWidth={1.5}
          />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3 animate-in slide-in-from-bottom-2 duration-700 delay-150">
        No products found
      </h3>

      <p className="text-muted-foreground text-center max-w-md mb-8 animate-in slide-in-from-bottom-3 duration-700 delay-300">
        We couldn&apos;t find any products matching your criteria. Try adjusting
        your filters or search terms.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 animate-in slide-in-from-bottom-4 duration-700 delay-450">
        <Button
          variant="outline"
          className="group"
          onClick={() => window.history.back()}
        >
          <ArrowLeft
            size={16}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ProductNotFound;
