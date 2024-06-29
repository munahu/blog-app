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
      <ul className="lg:grid grid-cols-3 gap-x-6">
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
            className="w-full mb-10 sm:flex-shrink-0 cursor-pointer"
          >
            <Date createdAt={post.createdAt} />
            <div className="mt-2 relative w-full h-64 sm:h-[500px] lg:h-[400px] mb-4 brightness-90">
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
