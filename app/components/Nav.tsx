"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { categories } from "@/app/constants/categories";
import Link from "next/link";
import { Category } from "@prisma/client";

export default function Nav({ category }: { category: Category }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(category);
  return (
    <nav className="md:mt-24">
      <ul className="hidden md:flex no-scrollbar">
        {categories.map((category, index) => (
          <li
            onClick={() => setSelectedCategory(category)}
            className={`w-1/3 flex justify-center border border-gray ${
              category === selectedCategory && `border-white`
            } first:ml-4 mr-4 py-1 rounded-2xl`}
            key={index}
          >
            <Link
              className="w-full  text-center"
              href={`/${category.toLowerCase()}`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <MobileNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </nav>
  );
}

function MobileNav({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: Category;
  setSelectedCategory: Dispatch<SetStateAction<Category>>;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCurrentCategory = (category: Category) =>
    selectedCategory === category;

  return (
    <>
      <ul className="flex flex-col md:hidden bg-[#13151a] pt-8 pb-10 mx-4">
        {categories.map(
          (category, index) =>
            (isCurrentCategory(category) || isMenuOpen) && (
              <li
                onClick={() =>
                  isMenuOpen
                    ? setSelectedCategory(category)
                    : setIsMenuOpen(true)
                }
                className={`flex items-center mb-3 w-full py-1 rounded-2xl border ${
                  isCurrentCategory(category) ? `border-white` : `border-gray`
                } ${isMenuOpen && `opacity-0 animate-slideIn`}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                key={index}
              >
                <Link
                  className="w-full block text-center"
                  href={`/${category.toLowerCase()}`}
                >
                  {category}
                </Link>
                {!isMenuOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="size-5 absolute right-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                )}
              </li>
            )
        )}
      </ul>
    </>
  );
}
