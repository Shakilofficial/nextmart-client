"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import { searchProducts } from "@/services/Product";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  offerPrice: number | null;
  imageUrls: string[];
  slug?: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const { data } = await searchProducts(debouncedQuery);
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSearch = () => {
    if (!query.trim()) return;

    setOpen(false);
    router.push(`/products?searchTerm=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const popularSearches = [
    "smartphone",
    "laptop",
    "headphone",
    "camera",
    "watch",
    "tv",
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex-1 w-[100px] mx-2 md:mx-5">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-rose-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-hover:text-rose-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-10 rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-300 focus-visible:border-rose-300 group-hover:border-rose-200 group-hover:shadow-md"
                onClick={() => setOpen(true)}
                readOnly
              />
            </div>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-screen max-w-md border border-gray-200 shadow-lg rounded-xl overflow-hidden"
        align="center"
        sideOffset={8}
      >
        <div className="flex items-center border-b p-3 bg-white">
          <Search className="mr-2 h-4 w-4 shrink-0 text-rose-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border-0 bg-transparent p-0 text-sm focus:outline-none placeholder:text-gray-400"
            autoComplete="off"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full hover:bg-rose-50 hover:text-rose-500"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto bg-white">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </motion.div>
            )}

            {!loading && query.length >= 2 && products.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center"
              >
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-rose-300" />
                </div>
                <p className="text-gray-500 text-sm">
                  No products found for &quot;{query}&quot;
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try a different search term
                </p>
              </motion.div>
            )}

            {!loading && products.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-2"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/products/${product._id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0 border border-gray-200">
                        <Image
                          src={
                            product.imageUrls[0] ||
                            "/placeholder.svg?height=48&width=48"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {product.offerPrice ? (
                            <>
                              <p className="text-sm font-semibold text-rose-500">
                                ${product.offerPrice}
                              </p>
                              <p className="text-xs text-gray-400 line-through">
                                ${product.price}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm font-semibold text-gray-700">
                              ${product.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-medium text-sm"
                    onClick={handleSearch}
                  >
                    View all results for &quot;{query}&quot;
                  </Button>
                </div>
              </motion.div>
            )}

            {!loading && query.length < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-3 px-4"
              >
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-xs font-medium text-gray-500">
                    POPULAR SEARCHES
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-rose-50 text-gray-600 hover:text-rose-500 rounded-full text-xs border border-gray-200 hover:border-rose-200 transition-colors"
                      onClick={() => {
                        setQuery(term);
                        setTimeout(() => handleSearch(), 100);
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  );
}
