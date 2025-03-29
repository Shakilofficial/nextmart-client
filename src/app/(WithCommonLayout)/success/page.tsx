import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 p-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute -z-10 w-40 h-40 rounded-full bg-primary/10 blur-xl" />
          <div className="w-24 h-24 rounded-full bg-green-500/50 flex items-center justify-center animate-[fadeIn_0.5s_ease-out]">
            <div className="animate-[scaleIn_0.5s_ease-out]">
              <CheckCircle className="h-12 w-12 text-green-900" />
            </div>
          </div>
        </div>

        <Card className="border-none shadow-lg overflow-hidden">
          <div className="bg-green-600/70 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Payment Successful</h1>
              <Badge className="bg-green-100 text-green-900 hover:bg-green-200">
                Completed
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  Thank you for your purchase!
                </p>
                <p className="text-lg font-semibold">
                  Your order has been confirmed
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1 gap-2">
                  <Link href="/my-orders">
                    <ShoppingBag className="h-4 w-4" />
                    View Order
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <Link href="/" className="text-primary hover:underline text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>A confirmation email has been sent to your email address</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
