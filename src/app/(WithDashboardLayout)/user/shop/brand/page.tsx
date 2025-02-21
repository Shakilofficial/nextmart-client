import ManageBrands from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/Brand";

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
