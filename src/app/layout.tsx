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
  title: "NEXA",
  description:
    "Welcome to NEXA — your online store for fashion, electronics, home essentials, and more. Explore deals and top-rated products now.",
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
