import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/user(\/.*)?/, /^\/create-shop/, /^\/my-orders/, /^\/profile/],
  admin: [/^\/admin(\/.*)?/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  const userRole = userInfo?.role as keyof typeof roleBasedPrivateRoutes;
  if (
    roleBasedPrivateRoutes[userRole]?.some((route) => pathname.match(route))
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/create-shop",
    "/my-orders",
    "/admin/:path*",
    "/user/:path*",
    "/user/my-shop-orders",
    "/profile",
  ],
};
