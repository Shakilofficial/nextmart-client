import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/services/Product";
import { IProduct } from "@/types/product";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container mx-auto my-20 px-4 w-full bg-gray-50/50 py-16">
      <div className="flex items-center justify-between mb-6 text-primary">
        <h2 className="font-bold text-2xl">Featured Product</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-xl">
            All Products
            <ChevronRightCircle />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {products.map((product) => (
          <FeaturedProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
