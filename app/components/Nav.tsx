"use client";

import { useState } from "react";
import { Category, categories } from "@/app/constants/categories";
import Link from "next/link";

export default function Nav() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  return (
    <nav className="pt-14 py-8 mx-4 sm:mx-0 overflow-x-scroll no-scrollbar">
      <ul className="flex">
        {categories.map((category, index) => (
          <li
            onClick={() => setSelectedCategory(category)}
            className="mr-2"
            key={index}
          >
            <Link
              className={`capitalize border ${
                category === selectedCategory
                  ? `border-white`
                  : `border-[#2F323D]`
              } px-5 py-1.5 mr-2 font-light rounded-full text-sm cursor-pointer`}
              href={`/${category}`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
