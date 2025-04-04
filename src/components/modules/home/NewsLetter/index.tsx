"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Bell, CheckCircle, Gift, Mail } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-70"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-70"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-70"></div>

        {/* Decorative mail icons */}
        <motion.div
          className="absolute top-1/4 left-10 text-primary/10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Mail className="h-16 w-16" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-10 text-primary/10"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          <Mail className="h-12 w-12" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white rounded-3xl shadow-xl border border-muted overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left decorative panel */}
              <div className="hidden lg:block lg:col-span-2 bg-gradient-to-br from-primary/90 to-primary/70 p-12 relative">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl inline-flex items-center justify-center mb-6 w-16 h-16">
                    <Bell className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4">
                    Stay in the Loop
                  </h3>

                  <p className="text-white/90 mb-8">
                    Join our newsletter and be the first to know about:
                  </p>

                  <ul className="space-y-4">
                    {[
                      {
                        icon: <Gift className="h-5 w-5" />,
                        text: "Exclusive deals and promotions",
                      },
                      {
                        icon: <CheckCircle className="h-5 w-5" />,
                        text: "New product launches",
                      },
                      {
                        icon: <CheckCircle className="h-5 w-5" />,
                        text: "Seasonal collections and trends",
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-white">
                        <div className="bg-white/20 p-1.5 rounded-full mr-3">
                          {item.icon}
                        </div>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right content panel */}
              <div className="lg:col-span-3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                {!isSubmitted ? (
                  <>
                    <div className="mb-2">
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs uppercase tracking-wider font-medium">
                        Newsletter
                      </Badge>
                    </div>

                    <h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
                      Subscribe to Our Newsletter
                    </h2>

                    <p className="text-muted-foreground mb-8 text-lg">
                      Stay updated with the latest products, exclusive offers,
                      and shopping tips.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-14 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="h-14 px-8 rounded-xl w-full md:w-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="mr-2">Subscribing</span>
                            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          </>
                        ) : (
                          <>
                            Subscribe
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>

                    {/* Privacy note */}
                    <p className="text-xs text-muted-foreground mt-6">
                      By subscribing, you agree to our{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      . We respect your privacy and will never share your
                      information.
                    </p>
                  </>
                ) : (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">
                      Thank You for Subscribing!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      You&apos;ve been added to our newsletter. Get ready for
                      exclusive offers and updates!
                    </p>

                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Subscribe Another Email
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
