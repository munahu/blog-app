"use client";

import { useState } from "react";
import { categories } from "@/app/constants/categories";
import Link from "next/link";
import { Category } from "@prisma/client";

export default function Nav({ category }: { category: Category }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(category);
  return (
    <nav className="pt-14 py-8">
      <ul className="flex border-y border-[#2F323D] py-4 sm:py-5 overflow-x-scroll no-scrollbar">
        {categories.map((category, index) => (
          <li
            onClick={() => setSelectedCategory(category)}
            className="mr-2 first:ml-3 sm:first:ml-8"
            key={index}
          >
            <Link
              className={`capitalize border ${
                category === selectedCategory
                  ? `border-white`
                  : `border-[#2F323D]`
              } px-5 py-1.5 mr-2 font-light rounded-full text-sm cursor-pointer`}
              href={`/${category.toLowerCase()}`}
            >
              {category.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
