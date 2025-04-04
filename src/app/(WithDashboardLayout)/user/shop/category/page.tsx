import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories - Shop",
  description:
    "Manage Product Categories on NEXA — from fashion and tech to home accessories and gadgets. Discover your next favorite category.",
};
const ProductCategoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllCategories(page);

  return (
    <div>
      <ManageCategories categories={data} meta={meta} />
    </div>
  );
};

export default ProductCategoryPage;
