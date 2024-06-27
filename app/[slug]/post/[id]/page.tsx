import { getPost, getPosts } from "@/app/actions";
import { notFound } from "next/navigation";
import FullPost from "@/app/components/FullPost";
import Layout from "@/app/components/Layout";
import { Category } from "@prisma/client";

export default async function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const postId = Number(params.id);
  const post = await getPost(postId);
  const categoryPosts = await getPosts(params.slug.toUpperCase() as Category);

  if (post) {
    return (
      <Layout>
        <FullPost
          postId={postId}
          categoryURL={params.slug}
          categoryPosts={categoryPosts}
        />
      </Layout>
    );
  } else {
    notFound();
  }
}
