"use client";

import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/Category";
import { ICategory } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="container mx-auto my-20 px-4 w-full">
      <div className="flex items-center justify-between mb-10 text-primary">
        <h2 className="font-bold text-2xl">Category</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-xl">
            View All
            <ChevronRightCircle />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Category;
