"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Quote,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Customer",
      image: "/placeholder.svg?height=100&width=100&text=SJ",
      content:
        "I've been shopping here for over a year now and I'm consistently impressed by the quality of products and customer service. The delivery is always on time and the packaging is eco-friendly!",
      rating: 5,
      location: "New York, USA",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Enthusiast",
      image: "/placeholder.svg?height=100&width=100&text=MC",
      content:
        "The electronics section is unmatched! I found exactly what I was looking for at a better price than competitors. The detailed product descriptions helped me make an informed decision.",
      rating: 5,
      location: "San Francisco, USA",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Fashion Blogger",
      image: "/placeholder.svg?height=100&width=100&text=ER",
      content:
        "As someone who's very particular about fashion, I appreciate the curated collections and trending styles. The size guides are accurate and returns are hassle-free when needed.",
      rating: 4,
      location: "Miami, USA",
      verified: true,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Home Decor Enthusiast",
      image: "/placeholder.svg?height=100&width=100&text=DW",
      content:
        "The home collection is absolutely stunning! Every piece I've purchased has received countless compliments from guests. The quality is exceptional and the designs are unique.",
      rating: 5,
      location: "London, UK",
      verified: true,
    },
    {
      id: 5,
      name: "Sophia Kim",
      role: "Beauty Expert",
      image: "/placeholder.svg?height=100&width=100&text=SK",
      content:
        "Their beauty products are all-natural and work wonders! I've seen a noticeable difference in my skin since switching to their skincare line. Plus, their customer service team is incredibly knowledgeable.",
      rating: 5,
      location: "Seoul, South Korea",
      verified: true,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, testimonials.length]);

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Calculate visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[currentIndex]];
    } else {
      // For desktop, show 3 testimonials centered around the current index
      const indices = [
        (currentIndex - 1 + testimonials.length) % testimonials.length,
        currentIndex,
        (currentIndex + 1) % testimonials.length,
      ];
      return indices.map((index) => testimonials[index]);
    }
  };

  const visibleTestimonials = getVisibleTestimonials();

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-muted/20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-70"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-50"></div>
      </div>

      <div className="container  relative z-10">
        {/* Section header with enhanced styling */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-primary/40 mr-3"></div>
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20 uppercase text-xs tracking-wider font-medium px-3 py-1"
            >
              Testimonials
            </Badge>
            <div className="h-px w-8 bg-primary/40 ml-3"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            shopping experience with our platform.
          </p>
        </div>

        {/* Testimonial slider */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Main testimonial display */}
          <div className="overflow-hidden px-4 py-8">
            <div className="flex justify-center">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-1" : "grid-cols-3"
                    } gap-6 md:gap-8`}
                  >
                    {visibleTestimonials.map((testimonial, idx) => (
                      <Card
                        key={`${testimonial.id}-${idx}`}
                        className={`bg-white border-muted h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 rounded-2xl overflow-hidden ${
                          !isMobile && idx === 1
                            ? "ring-2 ring-primary/20 shadow-lg transform scale-105 z-10"
                            : ""
                        }`}
                      >
                        <CardContent className="p-6 md:p-8 flex flex-col h-full relative">
                          {/* Decorative quote marks */}
                          <div className="absolute top-4 right-4 text-primary/10">
                            <MessageSquareQuote className="h-16 w-16 rotate-180" />
                          </div>

                          {/* Verified badge */}
                          {testimonial.verified && (
                            <Badge className="absolute top-6 right-6 bg-green-50 text-green-600 border-green-100 z-10">
                              Verified Purchase
                            </Badge>
                          )}

                          {/* Quote icon */}
                          <div className="mb-6 relative z-10">
                            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                              <Quote className="h-6 w-6 text-primary" />
                            </div>
                          </div>

                          {/* Testimonial content */}
                          <p className="text-foreground/90 mb-6 flex-grow relative z-10 text-lg leading-relaxed">
                            &quot;{testimonial.content}&quot;
                          </p>

                          {/* Rating */}
                          <div className="flex mb-4 relative z-10">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 mr-1"
                                fill={
                                  i < testimonial.rating
                                    ? "currentColor"
                                    : "none"
                                }
                                color={
                                  i < testimonial.rating ? "#FFB800" : "#D1D5DB"
                                }
                              />
                            ))}
                          </div>

                          {/* Customer info */}
                          <div className="flex items-center relative z-10">
                            <Avatar className="h-14 w-14 border-2 border-primary/10 ring-2 ring-white">
                              <AvatarImage
                                src={testimonial.image}
                                alt={testimonial.name}
                              />
                              <AvatarFallback className="bg-primary/5 text-primary font-medium">
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                              <h4 className="font-semibold text-lg">
                                {testimonial.name}
                              </h4>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <p className="text-sm text-primary font-medium">
                                  {testimonial.role}
                                </p>
                                {testimonial.location && (
                                  <>
                                    <span className="hidden sm:inline text-muted-foreground">
                                      •
                                    </span>
                                    <p className="text-sm text-muted-foreground">
                                      {testimonial.location}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
              onClick={goToPrevious}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
