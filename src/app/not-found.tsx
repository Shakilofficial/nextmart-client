import { Button } from "@/components/ui/button";
import { Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top gradient decoration */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/10 to-transparent -z-10" />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl mx-auto text-center">
          {/* 404 Visual */}
          <div className="relative mb-8">
            <div className="absolute -inset-4 blur-xl bg-primary/5 rounded-full -z-10" />
            <div className="flex items-center justify-center">
              <div className="text-[120px] md:text-[180px] font-extrabold text-primary/10 leading-none select-none">
                4 <span className="text-primary/5 opacity-0">0</span> 4
              </div>
              <div className="absolute">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-dashed border-primary/20 animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 md:h-16 md:w-16 text-primary/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            We couldn&apos;t find the page you&apos;re looking for. It might
            have been removed, renamed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" className="rounded-full gap-2">
              <Link href="/">
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full gap-2"
            >
              <Link href="/products">
                <ShoppingBag className="h-5 w-5" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom decoration */}
      <div className="h-16 bg-muted/30 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Need help? Contact our{" "}
          <span className="text-primary hover:underline cursor-pointer">
            customer support
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
