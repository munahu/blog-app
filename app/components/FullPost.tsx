"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { Comment, Prisma } from "@prisma/client";
import Date from "./Date";
import Comments from "./Comments";

export default function FullPost({
  postId,
  returnPath,
  posts,
  comments,
}: {
  postId: number;
  returnPath: string;
  posts: Prisma.PostGetPayload<{
    include: { blog: true; author: true };
  }>[];
  comments: Comment[];
}) {
  const router = useRouter();
  const postIndex = posts.findIndex((post) => post.id === postId);
  const { title, description, content, blog, coverImageURL, createdAt } =
    posts[postIndex];

  return (
    <div>
      <div className="relative border-b md:border border-gray rounded-tl-2xl rounded-tr-2xl md:mt-8 mx-4 pb-8">
        <div className="border-b border-gray flex justify-center items-center py-4 sm:py-5 mb-8 relative">
          <svg
            onClick={() => router.push(`/${returnPath}`)}
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
              onClick={() => router.push(`/blog/${blog.id}`)}
              src={blog.imageURL}
              fill
              alt={blog.name}
              className="rounded-lg cursor-pointer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 absolute right-0 sm:right-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
        <div className="hidden absolute left-10 lg:flex flex-col">
          <button
            className="mb-7 group"
            onClick={() =>
              router.push(`/${returnPath}/post/${posts[postIndex - 1].id}`)
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
              router.push(`/${returnPath}/post/${posts[postIndex + 1].id}`)
            }
            disabled={postIndex === posts.length - 1}
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
            <div className="flex justify-between items-center mb-5">
              <p
                onClick={() => router.push(`/blog/${blog.id}`)}
                className="uppercase text-xs md:text-sm cursor-pointer"
              >
                {blog.name}
              </p>
              <Date createdAt={createdAt} />
            </div>
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
      <Comments postId={postId} comments={comments} />
    </div>
  );
}
