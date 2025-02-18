/* eslint-disable @typescript-eslint/no-unused-vars */
import cupImage from "@/assets/photos/mouse.webp";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function AdCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden shadow-lg rounded-lg bg-gradient-to-br from-orange-200/20 to-pink-200/20 transition-transform hover:scale-[1.02] duration-200",
        "flex flex-col items-center text-center h-[230px] md:h-[250px] border border-white"
      )}
    >
      {/* Border Animation */}
      <BorderBeam
        duration={6}
        size={80}
        className="from-orange-500/80 to-pink-500/80"
      />

      <CardContent className="p-4 flex flex-col justify-between h-full relative z-10">
        {/* Ad Image - Fixed Size */}

        <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] mx-auto">
          <Image
            src={cupImage}
            alt="product image"
            fill
            sizes="(max-width: 768px) 100px, 120px"
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* Ad Text & Button */}
        <div className="flex flex-col justify-between flex-1 mt-3">
          <h3 className="text-sm md:text-base font-semibold px-2 text-gray-700">
            🎉 Special Offer! Limited Time Only
          </h3>
          <Button
            variant="default"
            className="mt-3 w-full bg-primary/90 hover:bg-primary text-white rounded-xl"
          >
            Shop Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
