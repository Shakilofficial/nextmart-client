"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Shakil Hossain",
      role: "Regular Customer",
      image: "https://res.cloudinary.com/dcyupktj6/image/upload/v1728503901/avatars/zelpsdb5rzpgrobkycwc.jpg",
      content:
        "I've been shopping with NEXA for over a year and the experience has been consistently excellent. Fast delivery, eco-friendly packaging, and reliable service every time!",
      rating: 5,
      location: "Dhaka, Bangladesh",
      verified: true,
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Gadget Lover",
      image: "https://res.cloudinary.com/dcyupktj6/image/upload/v1741421617/jwe6yfdpqg-1741421616437-profileImage-fe-avatar.jpg",
      content:
        "The electronics and mobile accessories section is top-notch! I found the exact product I needed at a great price, and the product descriptions were super helpful.",
      rating: 4.5,
      location: "Chattogram, Bangladesh",
      verified: true,
    },
    {
      id: 3,
      name: "Arefin Rahman",
      role: "Fashion Enthusiast",
      image: "https://res.cloudinary.com/dcyupktj6/image/upload/v1728502285/avatars/slol5llrclurjsaivzum.png",
      content:
        "I’m very particular about fashion, and NEXA’s collections always feel modern and stylish. The size guides are accurate and returns are quick and hassle-free.",
      rating: 4,
      location: "Sylhet, Bangladesh",
      verified: true,
    },
    {
      id: 4,
      name: "Farzana Ahmed",
      role: "Home Decor Lover",
      image: "https://res.cloudinary.com/dcyupktj6/image/upload/v1740962510/uknl0n0or0h-1740962509355-profileImage-female-avatar.jpg",
      content:
        "Absolutely love their home decor products! Each item I've purchased has added a unique touch to my home, and the quality always exceeds expectations.",
      rating: 4,
      location: "Rajshahi, Bangladesh",
      verified: true,
    },
    {
      id: 5,
      name: "Rafiul Islam",
      role: "Skincare Reviewer",
      image: "https://res.cloudinary.com/dcyupktj6/image/upload/v1728506293/avatars/bucohomkt90ovyisyxkt.webp",
      content:
        "NEXA's beauty and skincare range is fantastic! I’ve noticed real results using their all-natural products, and the support team is always responsive and knowledgeable.",
      rating: 5,
      location: "Khulna, Bangladesh",
      verified: true,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [screenSize, setScreenSize] = useState("large");
  const [direction, setDirection] = useState(0); 


  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small");
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
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
    if (screenSize === "small") {
      return [testimonials[currentIndex]];
    } else if (screenSize === "medium") {
      return [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
      ];
    } else {
      // For large screens, show 3 testimonials
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    }),
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white pointer-events-none"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-rose-200/20 rounded-full mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-300/20 rounded-full mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-indigo-200/20 rounded-full mix-blend-multiply blur-3xl"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwYzkuOTQgMCAxOCA4LjA2IDE4IDE4aDEuNWE0LjUgNC41IDAgMDA0LjUtNC41IDQuNSA0LjUgMCAwMC00LjUtNC41SDM2eiIgZmlsbD0icmdiYSgyNDQsIDYzLCA5NCwgMC4wMikiLz48L2c+PC9zdmc+')] opacity-40"></div>
      </div>

      <div className="container relative z-10">
        {/* Section header with modern styling */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-rose-300 mr-3"></div>
            <Badge
              variant="outline"
              className="bg-rose-50 text-rose-500 border-rose-200 uppercase text-xs tracking-wider font-medium px-3 py-1"
            >
              Testimonials
            </Badge>
            <div className="h-px w-8 bg-rose-300 ml-3"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            shopping experience with our platform.
          </p>
        </div>

        {/* Testimonial slider with improved layout */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Main testimonial display */}
          <div className="overflow-hidden py-8">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <div
                  className={`grid grid-cols-1 ${
                    screenSize === "medium"
                      ? "sm:grid-cols-2"
                      : "md:grid-cols-3"
                  } gap-6 lg:gap-8`}
                >
                  {visibleTestimonials.map((testimonial, idx) => (
                    <motion.div
                      key={`${testimonial.id}-${idx}`}
                      custom={direction}
                      variants={cardVariants}
                      className="h-full"
                    >
                      <Card
                        className={`group h-full bg-white/80 backdrop-blur-sm border-rose-100 hover:border-rose-200 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden ${
                          screenSize === "large" && idx === 1
                            ? "md:transform md:scale-105 md:shadow-lg md:border-rose-200 md:z-10"
                            : ""
                        }`}
                      >
                        <CardContent className="p-6 md:p-8 flex flex-col h-full">
                          {/* Top section with quote and rating */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="bg-rose-100 text-rose-500 w-10 h-10 rounded-full flex items-center justify-center">
                              <Quote className="h-5 w-5" />
                            </div>

                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating
                                      ? "text-amber-400"
                                      : "text-gray-200"
                                  }`}
                                  fill={
                                    i < testimonial.rating
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          {/* Testimonial content with gradient hover effect */}
                          <div className="relative mb-6 flex-grow">
                            <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                              &quot;{testimonial.content}&quot;
                            </p>
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-50/0 via-rose-50/30 to-rose-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                          </div>

                          {/* Customer info with modern layout */}
                          <div className="flex items-center pt-4 border-t border-rose-100">
                            <Avatar className="h-12 w-12 border-2 border-white ring-2 ring-rose-100 group-hover:ring-rose-200 transition-all duration-300">
                              <AvatarImage
                                src={testimonial.image}
                                alt={testimonial.name}
                              />
                              <AvatarFallback className="bg-rose-100 text-rose-500 font-medium">
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="ml-4 flex-grow">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">
                                  {testimonial.name}
                                </h4>

                                {testimonial.verified && (
                                  <Badge className="bg-green-50 text-green-600 border-green-100 text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                                <p className="text-rose-500 font-medium">
                                  {testimonial.role}
                                </p>
                                {testimonial.location && (
                                  <>
                                    <span className="hidden sm:inline text-gray-400">
                                      •
                                    </span>
                                    <p className="text-gray-500">
                                      {testimonial.location}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Modern navigation controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-6">
            {/* Indicator dots with animated active state */}
            <div className="flex gap-2 order-2 sm:order-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span
                    className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-rose-500 scale-125"
                        : "bg-rose-200 hover:bg-rose-300"
                    }`}
                  ></span>
                  <span
                    className={`absolute -inset-2 bg-rose-100 rounded-full scale-0 opacity-0 transition-all duration-300 ${
                      index === currentIndex ? "animate-ping-slow" : ""
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            {/* Navigation buttons with hover effects */}
            <div className="flex gap-3 order-1 sm:order-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-rose-200 bg-white/80 backdrop-blur-sm hover:bg-rose-50 hover:border-rose-300 hover:text-rose-500 transition-all duration-300"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-rose-200 bg-white/80 backdrop-blur-sm hover:bg-rose-50 hover:border-rose-300 hover:text-rose-500 transition-all duration-300"
                onClick={goToNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
