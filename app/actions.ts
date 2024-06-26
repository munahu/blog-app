"use server";

import { Category } from "@prisma/client";
import prisma from "./lib/client";

export const getPosts = async (selectedCategory: Category) => {
  return await prisma.post.findMany({
    include: { blog: true, author: true },
    where: {
      category: {
        has: selectedCategory,
      },
    },
  });
};
