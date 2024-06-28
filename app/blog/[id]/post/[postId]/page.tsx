import { getPostsByBlog } from "@/app/actions";
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
  if (blogPosts) {
    return (
      <Layout>
        <FullPost
          postId={Number(params.postId)}
          returnPath={`blog/${blogId}`}
          posts={blogPosts}
        />
      </Layout>
    );
  } else {
    notFound();
  }
}
