import { getComments, getPostsByBlog } from "@/app/actions";
import { notFound } from "next/navigation";
import FullPost from "@/app/components/FullPost";
import Layout from "@/app/components/Layout";

export default async function Page({
  params,
}: {
  params: { id: string; postId: string };
}) {
  const blogId = Number(params.id);
  const blogPosts = await getPostsByBlog(Number(blogId));
  const postId = Number(params.postId);
  const comments = await getComments(postId);

  const commentsWithDateConverted = comments.map((comment) => {
    return {
      ...comment,
      createdAt: new Date(comment.createdAt),
    };
  });

  if (blogPosts) {
    return (
      <Layout>
        <FullPost
          postId={postId}
          returnPath={`blog/${blogId}`}
          posts={blogPosts}
          comments={commentsWithDateConverted}
        />
      </Layout>
    );
  } else {
    notFound();
  }
}
