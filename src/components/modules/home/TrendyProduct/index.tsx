import cupImage from "@/assets/photos/cup-with-headphone.png";
import { AdCard } from "./AdCard";
import { ProductCard } from "./TrendyProductCard";
const products = [
  {
    title: "Trendy Products",
    price: 150.99,
    originalPrice: 175.99,
    image: cupImage,
  },
  {
    title: "Logitech Gaming Headphone",
    price: 150.99,
    originalPrice: 175.99,
    image: cupImage,
  },
  {
    title: "Good Quality 100 Men Sun Glass",
    price: 100.99,
    originalPrice: 125.99,
    image: cupImage,
  },
  {
    title: "Best Bags For The Kids",
    price: 50.99,
    originalPrice: 75.99,
    image: cupImage,
  },
];
const TrendyProduct = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* First Ad Card */}
        <AdCard />

        {/* Product Cards */}
        {products.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendyProduct;
