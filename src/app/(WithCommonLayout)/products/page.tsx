import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/Banner";
import Category from "@/components/modules/products/Category/Category";
import { getAllCategories } from "@/services/Category";
import { getAllProducts } from "@/services/Product";

const AllProductsPage = async () => {
  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts();

  return (
    <div className="space-y-28 mb-16">
      <div className="container mx-auto px-2 space-y-10">
        <ProductBanner title="All Products" path="Home - Products" />
        <Category categories={categories} />
        <AllProducts products={products} />
      </div>
    </div>
  );
};

export default AllProductsPage;
