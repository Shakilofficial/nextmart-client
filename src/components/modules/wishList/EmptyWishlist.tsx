import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

const EmptyWishlist = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Heart className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Items added to your wishlist will be saved here. Start exploring and
        save items you love for later!
      </p>
      <Link href="/products">
        <Button size="lg" className="rounded-full px-8">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Explore Products
        </Button>
      </Link>
    </div>
  );
};

export default EmptyWishlist;
