"use client";

import { protectedRoutes } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { logoutUser } from "@/services/AuthService";
import { Heart, LogOut, ShoppingBag, StoreIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logo from "./Logo";

const Navbar = () => {
  const { setIsLoading, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b w-full">
      <div className="w-full mx-auto flex justify-between items-center py-3 flex-wrap gap-2 px-4 md:px-8">
        <Logo />
        <div className="w-[80px] md:max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-300 rounded-full py-1 px-4 text-sm md:text-base"
          />
        </div>
        <nav className="flex gap-2 justify-center items-center">
          <Button variant="outline" className="rounded-full p-0 size-8">
            <Heart />
          </Button>
          <Link href="/cart">
            <Button variant="outline" className="rounded-full p-0 size-8">
              <ShoppingBag />
            </Button>
          </Link>
          {user ? (
            <>
              <Link href="/create-shop">
                <Button
                  variant="outline"
                  className="rounded-xl text-primary text-sm md:text-base"
                  size={"sm"}
                >
                  <StoreIcon />
                  Create Shop
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-primary/50 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" className="rounded-xl px-2" size={"sm"}>
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
