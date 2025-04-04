import ManageBrands from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/Brand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Brands - Shop",
  description:
    "Manage Brands on NEXA — from fashion and tech to home accessories and gadgets. Discover your next favorite brand.",
};

const ProductBrandPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllBrands(page);

  return (
    <div>
      <ManageBrands brands={data} meta={meta} />
    </div>
  );
};

export default ProductBrandPage;
