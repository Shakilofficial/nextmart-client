import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, XCircle } from "lucide-react";
import Link from "next/link";

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 p-4 my-12">
      <div className="w-full max-w-lg mx-auto">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute -z-10 w-40 h-40 rounded-full bg-amber-500/10 blur-xl" />
          <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center animate-[fadeIn_0.5s_ease-out]">
            <div className="animate-[scaleIn_0.5s_ease-out]">
              <XCircle className="h-12 w-12 text-amber-500" />
            </div>
          </div>
        </div>

        <Card className="border-none shadow-lg overflow-hidden">
          <div className="bg-amber-500/5 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Payment Cancelled</h1>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                Cancelled
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  Your payment process was cancelled
                </p>
                <p className="text-lg font-semibold">
                  Your cart items are still saved
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-background flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Your cart is still active</p>
                      <p className="text-sm text-muted-foreground">
                        You can resume your purchase at any time
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link href="/my-orders">Resume Checkout</Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-primary hover:underline text-sm inline-flex items-center"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Return to Shopping
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Need help with your order?{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Contact us
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
