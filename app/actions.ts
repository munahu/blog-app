"use server";

import { Category } from "@prisma/client";
import prisma from "./lib/client";
import { revalidateTag, unstable_cache } from "next/cache";

export const getPostsByCategory = async (selectedCategory: Category) => {
  return await prisma.post.findMany({
    include: { blog: true, author: true },
    where: {
      category: {
        has: selectedCategory,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostsByBlog = async (blogId: number) => {
  return await prisma.post.findMany({
    include: { blog: true, author: true },
    where: {
      blogId: blogId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createComment = async (postId: number, formData: FormData) => {
  await prisma.comment.create({
    data: {
      postId,
      name: String(formData.get("name")),
      message: String(formData.get("message")),
    },
  });
  revalidateTag("comments");
};

export const getComments = unstable_cache(
  async (postId: number) => {
    return await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["comments"],
  {
    tags: ["comments"],
  }
);
