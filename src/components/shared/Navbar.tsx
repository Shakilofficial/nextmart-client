"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { selectWishlistCount } from "@/redux/features/wishListSlice";
import { useAppSelector } from "@/redux/hooks";
import { Heart, ShoppingBag, StoreIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "../modules/products/SearchBar";
import Logo from "./Logo";
import NavUser from "./NavUser";

interface NavbarProps {
  className?: string;
  logoOnly?: boolean;
  hideSearch?: boolean;
  transparent?: boolean;
}

const Navbar = ({
  className,
  logoOnly = false,
  hideSearch = false,
  transparent = false,
}: NavbarProps) => {
  const { user } = useUser();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = useAppSelector(orderedProductsSelector);

  const wishlistCount = useAppSelector(selectWishlistCount);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 md:px-4",
        scrolled || !transparent
          ? "bg-background border-b border-primary/30 shadow-sm"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Logo />
        </div>

        {!logoOnly && (
          <>
            {/* Search - Responsive width */}
            {!hideSearch && <SearchBar />}

            <div className="flex items-center gap-2">
              <Link href="/wishlist" className="hidden sm:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative h-9 w-9 hover:bg-rose-50"
                >
                  <Heart className="h-[18px] w-[18px] text-slate-600" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-rose-500 text-white">
                    {wishlistCount}
                  </Badge>
                </Button>
              </Link>

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative h-9 w-9 hover:bg-rose-50"
                >
                  <ShoppingBag className="h-[18px] w-[18px] text-slate-600" />

                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-rose-500 text-white">
                    {products.length}
                  </Badge>
                </Button>
              </Link>

              {user ? (
                <>
                  {!user.hasShop && (
                    <Link href="/create-shop" className="hidden sm:block">
                      <Button
                        variant="outline"
                        className="rounded-full text-rose-600 font-medium h-9 border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                        size="sm"
                      >
                        <StoreIcon className="mr-1.5 h-3.5 w-3.5" />
                        Create Shop
                      </Button>
                    </Link>
                  )}

                  <div className="ml-1">
                    <NavUser />
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <Button
                    variant="default"
                    className="rounded-full h-9 bg-rose-500 hover:bg-rose-600 text-white"
                    size="sm"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
