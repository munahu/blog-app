"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

export default function FullPost({
  postId,
  categoryURL,
  categoryPosts,
}: {
  postId: number;
  categoryURL: string;
  categoryPosts: Prisma.PostGetPayload<{
    include: { blog: true; author: true };
  }>[];
}) {
  const router = useRouter();
  const postIndex = categoryPosts.findIndex((post) => post.id === postId);
  const { title, description, content, blog, coverImageURL } =
    categoryPosts[postIndex];

  return (
    <div className="relative md:border border-gray rounded-tl-2xl rounded-tr-2xl md:mt-8 mx-4">
      <Image
        src={coverImageURL}
        width={50}
        height={50}
        alt={blog.name}
        className="absolute rounded-lg h-full w-full blur-[300px] opacity-20 -z-10"
      />
      <div className="border-b border-gray flex justify-center py-4 sm:py-5 mb-8">
        <svg
          onClick={() => router.push(`/${categoryURL}`)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.5}
          stroke="currentColor"
          className="size-8 md:size-10 absolute left-2 md:left-10 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="relative w-8 h-8 sm:w-10 sm:h-10">
          <Image
            src={blog.imageURL}
            fill
            alt={blog.name}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="hidden absolute left-10 lg:flex flex-col">
        <button
          className="mb-7 group"
          onClick={() =>
            router.push(
              `/${categoryURL}/post/${categoryPosts[postIndex - 1].id}`
            )
          }
          disabled={postIndex === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className="size-6 md:size-10 cursor-pointer group-disabled:stroke-neutral-500 group-disabled:cursor-not-allowed"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button
          className="mb-7 group"
          onClick={() =>
            router.push(
              `/${categoryURL}/post/${categoryPosts[postIndex + 1].id}`
            )
          }
          disabled={postIndex === categoryPosts.length - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className="size-6 md:size-10 cursor-pointer group-disabled:stroke-neutral-500 group-disabled:cursor-not-allowed"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div className="md:px-12 lg:max-w-[728px] lg:m-auto">
        <div className="pb-8 border-b border-[#464a5b]">
          <p className="uppercase text-xs md:text-sm mb-5">{blog.name}</p>
          <p className="text-3xl md:text-4xl font-semibold mb-3">{title}</p>
          <p className="text-lg opacity-70 font-light">{description}</p>
        </div>
        {content.map((item, index) => (
          <div
            key={index}
            className="my-8 leading-8 md:leading-9 text-lg md:text-xl md:tracking-[0.02em] font-light"
          >
            {parse(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
