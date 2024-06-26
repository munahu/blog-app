import { Prisma } from "@prisma/client";
import Image from "next/image";

export default function Feed({
  posts,
}: {
  posts: Prisma.PostGetPayload<{ include: { blog: true; author: true } }>[];
}) {
  return (
    <ul className="max-w-[600px]">
      {posts.map((post, index) => (
        <Card key={index} post={post} />
      ))}
    </ul>
  );
}

export function Card({
  post,
}: {
  post: Prisma.PostGetPayload<{ include: { blog: true; author: true } }>;
}) {
  return (
    <li className="mb-4 pl-5 sm:px-8 py-5 first:border-t border-b border-[#2F323D] flex justify-between">
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
