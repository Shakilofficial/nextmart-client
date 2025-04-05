import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/Banner";
import Category from "@/components/modules/products/Category/Category";
import { getAllCategories } from "@/services/Category";
import { getAllProducts } from "@/services/Product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products - NEXA",
  description:
    "Browse all categories on NEXA — from fashion and tech to home accessories and gadgets. Discover your next favorite product.",
};

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;

  const { data: categories } = await getAllCategories("1", "100");

  const { data: products, meta } = await getAllProducts(
    undefined,
    "10",
    resolvedSearchParams
  );

  return (
    <div className="space-y-28 mb-16">
      <div className="container mx-auto px-2 space-y-10 animate-in fade-in duration-700">
        <ProductBanner title="All Products" path="Home - Products" />
        <Category categories={categories} />
        <AllProducts products={products} meta={meta} />
      </div>
    </div>
  );
};

export default AllProductsPage;
