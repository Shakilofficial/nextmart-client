"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { protectedRoutes } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { logoutUser } from "@/services/AuthService";
import { Heart, LogOut, ShoppingBag, StoreIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavUser = () => {
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logoutUser();
    setIsLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  if (!user) return null;

  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      ?.map((part) => part[0] || "")
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
          <Avatar className="h-8 w-8 border-4 border-background rounded-full shadow-lg">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
            />
            <AvatarFallback className="text-3xl">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl p-1.5" align="end">
        <DropdownMenuLabel className="font-normal rounded-lg p-3 mb-1">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem asChild className="rounded-lg py-2">
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="rounded-lg py-2">
          <Link href="/user/dashboard" className="cursor-pointer">
            <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {user.hasShop && (
          <DropdownMenuItem asChild className="rounded-lg py-2">
            <Link href="/user/my-shop" className="cursor-pointer">
              <StoreIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>My Shop</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* Mobile-only menu items */}
        <DropdownMenuItem asChild className="sm:hidden rounded-lg py-2">
          <Link href="/wishlist" className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Wishlist</span>
          </Link>
        </DropdownMenuItem>

        {!user.hasShop && (
          <DropdownMenuItem asChild className="sm:hidden rounded-lg py-2">
            <Link href="/create-shop" className="cursor-pointer">
              <StoreIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Create Shop</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          className="text-rose-500 focus:text-rose-500 cursor-pointer rounded-lg py-2"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
