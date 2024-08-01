"use client";

import { useState } from "react";
import { categories } from "@/app/constants/categories";
import Link from "next/link";
import { Category } from "@prisma/client";

export default function Nav({ category }: { category: Category }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(category);
  return (
    <nav className="mt-14 mb-6 md:mb-10">
      <p>The Blog</p>
      <ul className="no-scrollbar mt-6 lowercase text-3xl md:text-4xl flex flex-wrap">
        {categories.map((category, index) => (
          <li
            onClick={() => setSelectedCategory(category)}
            key={index}
            className={`mr-3.5 md:mr-7 ${
              selectedCategory === category
                ? `opacity-1 border-b border-white`
                : `opacity-55`
            }`}
          >
            <Link
              className="w-full text-center"
              href={`/${category.toLowerCase()}`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
