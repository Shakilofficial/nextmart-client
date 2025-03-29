import headphone from "@/assets/photos/headphone.webp";
import mouse from "@/assets/photos/mouse.webp";
import vr from "@/assets/photos/vr.png";
import watch from "@/assets/photos/watch.webp";
import { AdCard } from "./AdCard";
import { TrendyProductCard } from "./TrendyProductCard";

const products = [
  {
    id: 1,
    title: "Samsung Watch Series 7",
    price: 150.99,
    originalPrice: 175.99,
    image: watch.src,
  },
  {
    id: 2,
    title: "Sony Gaming Headphone",
    price: 150.99,
    originalPrice: 175.99,
    image: headphone.src,
  },
  {
    id: 3,
    title: "Logitech Gaming Mouse",
    price: 100.99,
    originalPrice: 125.99,
    image: mouse.src,
  },
  {
    id: 4,
    title: "Best VR Headset",
    price: 50.99,
    originalPrice: 75.99,
    image: vr.src,
  },
];

const TrendyProduct = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* First Ad Card */}
        <AdCard />

        {/* Product Cards */}
        {products?.map((product) => (
          <TrendyProductCard
            key={product.id}
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
