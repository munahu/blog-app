"use client";

import { Category, Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Date from "./Date";

export default function Feed({
  posts,
  category,
}: {
  posts: Prisma.PostGetPayload<{ include: { blog: true; author: true } }>[];
  category?: Category;
}) {
  const router = useRouter();
  return (
    <div className="mx-4 md:mt-14">
      <ul className="sm:grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-6">
        {posts.map((post) => (
          <li
            onClick={() =>
              router.push(
                `/${
                  category ? category.toLowerCase() : `blog/${post.blogId}`
                }/post/${post.id}`
              )
            }
            key={post.id}
            className="w-full mb-10 sm:flex-shrink-0 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              {category && (
                <p className="uppercase opacity-45 text-xs">
                  {post.author.name}
                </p>
              )}
              <Date createdAt={post.createdAt} />
            </div>
            <div className="mt-2 relative w-full max-h-96 aspect-square mb-4 brightness-90 group-hover:brightness-100">
              <Image
                src={post.coverImageURL}
                alt={post.title}
                objectFit="cover"
                fill
                className="rounded-md brightness-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <p className="text-lg md:text-xl tracking-tight line-clamp-2">
              {post.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
