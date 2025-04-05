import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { cn } from "@/lib/utils";
import type React from "react";

interface CommonLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  transparentHeader?: boolean;
  hideSearch?: boolean;
}

const CommonLayout = ({
  children,
  className,
  fullWidth = false,
  transparentHeader = false,
  hideSearch = false,
}: CommonLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar transparent={transparentHeader} hideSearch={hideSearch} />
      <main
        className={cn(
          "flex-grow w-full mx-auto",
          fullWidth ? "px-0" : "container px-4 md:px-6 py-6 md:py-10",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
