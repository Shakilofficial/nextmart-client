import ManageProducts from "@/components/modules/shop/product";
import { getAllProducts } from "@/services/Product";

const ProductPage = async () => {
  const { data } = await getAllProducts();

  return (
    <div>
      <ManageProducts products={data} />
    </div>
  );
};

export default ProductPage;
