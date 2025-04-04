import Providers from "@/providers/Providers";
import { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    default: "NEXA - Discover Everything You Need Online",
    template: "%s | NEXA",
  },
  description:
    "NEXA is your one-stop online shopping destination for quality products — from electronics and fashion to home goods and accessories.",
  keywords: [
    "NEXA",
    "Online Shopping",
    "Ecommerce",
    "Buy Online",
    "Fashion",
    "Home Essentials",
    "Tech Products",
    "Accessories",
    "Best Deals",
    "Shop Now",
  ],
  authors: [{ name: "NEXA Team", url: "https://nexa.com" }],
  creator: "NEXA | Created By Md Shakil Hossain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sora.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
