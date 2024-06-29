"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { Comment, Prisma } from "@prisma/client";
import Date from "./Date";
import Comments from "./Comments";
import { MutableRefObject, useRef, useState } from "react";

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
  const commentsRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLeaveCommentClick = () => {
    commentsRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    setIsMenuOpen(false);
  };

  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsMenuOpen(false);
  };

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
            onClick={() => setIsMenuOpen(true)}
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
        {isMenuOpen && (
          <Menu
            handleLeaveCommentClick={handleLeaveCommentClick}
            handleCopyLinkClick={handleCopyLinkClick}
          />
        )}
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
      <div ref={commentsRef}>
        <Comments postId={postId} comments={comments} />
      </div>
    </div>
  );
}

function Menu({
  handleLeaveCommentClick,
  handleCopyLinkClick,
}: {
  handleLeaveCommentClick: () => void;
  handleCopyLinkClick: () => void;
}) {
  return (
    <ul className="bg-gray absolute right-0 lg:right-10 py-2 px-2 top-16 w-64 h-32 flex flex-col justify-center rounded-xl z-50">
      <li
        onClick={() => handleCopyLinkClick()}
        className="flex h-fit w-full py-3 pl-5 cursor-pointer hover:bg-[#434756] rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
        <span>Copy link</span>
      </li>
      <li
        onClick={() => handleLeaveCommentClick()}
        className="flex h-fit w-full py-3 pl-5 cursor-pointer hover:bg-[#434756] rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>
        <span>Leave a comment</span>
      </li>
    </ul>
  );
}
