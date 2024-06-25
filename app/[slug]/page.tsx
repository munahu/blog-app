"use client";

import { notFound } from "next/navigation";
import { categories } from "../constants/categories";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const category = categories.find((category) => category === slug);

  if (category) {
    return <h1>{category}</h1>;
  } else {
    notFound();
  }
}
