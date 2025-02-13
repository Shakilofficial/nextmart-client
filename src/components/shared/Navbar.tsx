import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="border-b w-full">
      <div className="w-full mx-auto flex justify-between items-center py-3 flex-wrap gap-4">
        <Logo />
        <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-300 rounded-full py-1 px-5"
          />
        </div>
        <nav className="flex gap-3">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
