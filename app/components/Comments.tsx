import { createComment } from "../actions";
import { Comment } from "@prisma/client";
import Date from "./Date";
import { MutableRefObject, useRef } from "react";

export default function Comments({
  postId,
  comments,
}: {
  postId: number;
  comments: Comment[];
}) {
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const createCommentWithPostId = createComment.bind(null, postId);

  return (
    <div className="mt-10 sm:mt-16 pb-12 px-5 sm:px-10 max-w-[730px] lg:max-w-none lg:flex">
      <form
        ref={formRef}
        className="mt-4 flex flex-col lg:w-1/2 mr-16 lg:sticky top-6 h-fit"
        action={async (formData) => {
          await createCommentWithPostId(formData);
          formRef.current?.reset();
        }}
      >
        {comments.length > 0 && (
          <h2 className="text-lg mb-5">
            {comments.length} {comments.length > 1 ? `comments` : `comment`}
          </h2>
        )}
        <textarea
          required
          name="message"
          placeholder="Leave a comment..."
          className="w-full bg-transparent border border-white outline-none rounded-lg pl-4 pt-4 pb-6 resize-none"
        />
        <input
          required
          autoComplete="off"
          name="name"
          type="text"
          placeholder="Your name"
          className="bg-transparent rounded-lg border border-white mt-4 mb-10 pl-4 pt-2 pb-3 outline-none sm:w-2/3"
        />
        <button
          type="submit"
          className="border border-white w-fit py-1 px-5 text-sm"
        >
          Submit
        </button>
      </form>
      {comments.length > 0 ? (
        <ul className="flex flex-col mt-12 mb-3 lg:w-1/2">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-8">
              <div className="flex justify-between items-start">
                <p className="font-medium">{comment.name}</p>
                <Date createdAt={comment.createdAt} />
              </div>
              <p className="leading-7 mt-5 font-light">{comment.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="">There aren&#39;t any comments on this post yet.</h2>
      )}
    </div>
  );
}
