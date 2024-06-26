"use client";

import { Category, Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Feed({
  posts,
  category,
}: {
  posts: Prisma.PostGetPayload<{ include: { blog: true; author: true } }>[];
  category: Category;
}) {
  return (
    <ul className="grid lg:grid-cols-2">
      {posts.map((post, index) => (
        <Card key={index} post={post} category={category} />
      ))}
    </ul>
  );
}

export function Card({
  post,
  category,
}: {
  post: Prisma.PostGetPayload<{ include: { blog: true; author: true } }>;
  category: Category;
}) {
  const router = useRouter();
  return (
    <li
      onClick={() => router.push(`/${category.toLowerCase()}/post/${post.id}`)}
      className="max-w-1/2 pl-5 sm:px-8 py-5 border-t border-gray flex justify-between hover:bg-[#1d1f27] cursor-pointer"
    >
      <div className="w-2/3 mr-4">
        <div className="flex items-center mb-3 text-sm">
          <Image
            src={post.blog.imageURL}
            width={25}
            height={25}
            alt={post.blog.name}
          />
          <p className="uppercase ml-2 text-xs">{post.blog.name}</p>
        </div>
        <p className="mb-1">{post.title}</p>
        <p className="text-sm opacity-50 font-thin mb-4 tracking-wide">
          {post.description}
        </p>
        <p className="opacity-45 uppercase text-xs tracking-wide">
          {post.author.name}
        </p>
      </div>
      <div className="relative w-1/3 max-w-32 max-h-24 sm:max-h-28">
        <Image
          src={post.coverImageURL}
          fill
          alt={post.title}
          className="rounded-lg object-cover"
        />
      </div>
    </li>
  );
}
