import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, HelpCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

const PaymentFailedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 p-4 my-12">
      <div className="w-full max-w-lg mx-auto">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute -z-10 w-40 h-40 rounded-full bg-destructive/10 blur-xl" />
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center animate-[fadeIn_0.5s_ease-out]">
            <div className="animate-[scaleIn_0.5s_ease-out]">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
        </div>

        <Card className="border-none shadow-lg overflow-hidden">
          <div className="bg-destructive/5 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Payment Failed</h1>
              <Badge variant="destructive">Error</Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  We couldn&apos;t process your payment!
                </p>
                <p className="text-lg font-semibold">
                  Your transaction was declined
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>

                <Button variant="outline" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Get Help
                </Button>
              </div>

              <div className="text-center">
                <Link
                  href="/my-orders"
                  className="text-primary hover:underline text-sm inline-flex items-center"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Return to My Orders
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Need assistance? Contact our{" "}
            <span className="text-primary hover:underline cursor-pointer">
              customer support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
