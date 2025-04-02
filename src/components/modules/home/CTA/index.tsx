import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 left-1/4 w-10 h-10 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-white/10 rounded-full"></div>
          </div>

          <div className="relative z-10 py-12 sm:py-16 md:py-20 px-6 sm:px-12 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-12">
            {/* Left Side - Text and Buttons */}
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Ready to Transform Your Shopping Experience?
              </h2>
              <p className="text-white/80 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                Join thousands of satisfied customers who have discovered the
                perfect products for their needs. Sign up today and get 15% off
                your first order.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-6 sm:px-8"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="text-white border-white/30 hover:bg-white/10 rounded-full px-6 sm:px-8"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Side - Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-md sm:max-w-lg md:max-w-none">
              {[
                { value: "10K+", label: "Products" },
                { value: "24/7", label: "Support" },
                { value: "100K+", label: "Happy Customers" },
                { value: "4.9/5", label: "Customer Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
