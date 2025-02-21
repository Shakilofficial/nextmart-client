import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

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
