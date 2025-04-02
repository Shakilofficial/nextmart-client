import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/services/Product";
import type { IProduct } from "@/types";
import { ChevronRightCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductCard from "../../products/ProductCard";

const FeaturedProduct = async () => {
  const { data: products } = await getAllProducts();

  return (
    <section className="py-16 w-full bg-gradient-to-b from-background to-muted/10">
      <div className="container">
        <div className="relative mb-10">
          <div className="absolute -top-10 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl -z-10"></div>
          <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-xl -z-10"></div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary/10 rounded-full animate-pulse"></div>
                <Sparkles className="relative w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-2xl text-rose-500">
                  Featured Products
                </h2>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-md text-center sm:text-left">
                Shop our featured products
              </p>
            </div>

            <Link href="/products" className="group">
              <Button
                variant="outline"
                className="rounded-full px-6 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <span>All Products</span>
                <ChevronRightCircle className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* Subtle container for products */}
          <div className="rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {products?.map((product: IProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
