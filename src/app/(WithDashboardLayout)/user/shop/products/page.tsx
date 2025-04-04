import ManageProducts from "@/components/modules/shop/product";
import { getAllProducts } from "@/services/Product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Shop",
  description:
    "Browse Products on NEXA — from fashion and tech to home accessories and gadgets. Discover your next favorite product.",
};

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllProducts(page);

  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default ProductPage;
