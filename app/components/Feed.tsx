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
    <ul className="animate-slideIn grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 lg:gap-x-6 xl:gap-x-7 gap-y-24 sm:gap-y-16 mb-14">
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
          className="h-full"
        >
          <div className="relative w-full aspect-video hover:cursor-pointer group">
            <Image
              src={post.coverImageURL}
              alt={post.title}
              fill
              className="rounded-3xl brightness-90 object-cover duration-300 ease-in-out delay-100 lg:group-hover:-translate-y-1"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="h-full lg:invisible group-hover:visible transition-transform lg:translate-y-[5%] lg:-translate-x-[5%] duration-300 ease-in-out delay-100 lg:group-hover:-translate-y-0 lg:group-hover:-translate-x-0">
              <svg
                className="w-12 h-12 text-black fill-current absolute bottom-0 left-[23px] transform translate-x-full rotate-180"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                viewBox="0 0 100 100"
              >
                <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z"></path>
              </svg>
              <svg
                className="w-12 h-12 text-black fill-current absolute bottom-[65px] -left-[49px] transform translate-x-full rotate-180"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                viewBox="0 0 100 100"
              >
                <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z"></path>
              </svg>
              <div className="absolute -bottom-3 -left-2 w-20 aspect-square bg-black border-8 border-black rounded-2xl">
                <Image
                  src={post.blog.imageURL}
                  alt={post.blog.name}
                  fill
                  className="brightness-90 object-cover rounded-2xl p-2.5"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 mb-1 opacity-65 font-light">
            {category && <p>{post.author.name}</p>}
            <Date createdAt={post.createdAt} />
          </div>
          <p className="text-lg md:text-xl tracking-tight line-clamp-2">
            {post.title}
          </p>
        </li>
      ))}
    </ul>
  );
}
