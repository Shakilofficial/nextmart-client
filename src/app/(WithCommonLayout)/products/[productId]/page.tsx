import ProductBanner from "@/components/modules/products/Banner";
import ProductDetails from "@/components/modules/products/ProductDetails";
import { getSingleProduct } from "@/services/Product";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const { productId } = params;
  const { data: product } = await getSingleProduct(productId);

  return {
    title: `${product.name} - Buy Online | NEXA`,
    description:
      product.shortDescription ||
      product.description ||
      "Find the best products on NEXA. Shop now for great deals on top items.",
    keywords: [
      product.name,
      product.category,
      "Buy Online",
      "NEXA",
      "Ecommerce",
      product.tags?.join(", ") || "",
    ],
  };
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);
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
