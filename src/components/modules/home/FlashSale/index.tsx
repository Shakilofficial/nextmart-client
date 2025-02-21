"use client";
import { Button } from "@/components/ui/button";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { IProduct } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountDown from "./CountDown";
import FlashSaleProductCard from "./FlashSaleProductCard";

const FlashSale = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getFlashSaleProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </div>
    );

  return (
    <div className="container mx-auto my-20 px-4 w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 text-primary gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
          <h2 className="font-bold text-2xl">🔥 Flash Sale</h2>
          <CountDown />
        </div>
        <Link href="/products">
          <Button
            variant="outline"
            className="rounded-xl flex items-center gap-2 hover:bg-primary hover:text-white transition"
          >
            All Products
            <ChevronRightCircle className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
          <FlashSaleProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
