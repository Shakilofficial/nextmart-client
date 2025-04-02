import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  CreditCard,
  Gift,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Shipping",
      description: "Free shipping on all orders over 5000",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure Payments",
      description: "100% secure payment processing",
    },
    {
      icon: <RotateCcw className="h-6 w-6" />,
      title: "Easy Returns",
      description: "30-day money back guarantee",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Customer support around the clock",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Gift Wrapping",
      description: "Special packaging for gifts",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Flexible Payment",
      description: "Multiple payment options available",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Shop With Us</h2>
          <p className="text-muted-foreground">
            We&apos;re committed to providing the best shopping experience with
            these key benefits
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-muted bg-muted/5 hover:shadow-md transition-all duration-300 hover:border-primary/20"
            >
              <CardContent className="p-6 flex items-start">
                <div className="mr-4 bg-primary/10 p-3 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
