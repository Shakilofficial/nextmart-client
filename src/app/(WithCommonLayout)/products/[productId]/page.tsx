import ProductBanner from "@/components/modules/products/Banner";
import ProductDetails from "@/components/modules/products/ProductDetails";
import { getSingleProduct } from "@/services/Product";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);
  console.log(product);
  return (
    <div>
      <div className="container mx-auto px-2 space-y-10">
        <ProductBanner
          title="Product Details"
          path="Home - Products - Product Details"
        />
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
