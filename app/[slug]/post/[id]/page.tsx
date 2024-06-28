import { getPostsByCategory } from "@/app/actions";
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
  const categoryPosts = await getPostsByCategory(
    params.slug.toUpperCase() as Category
  );

  if (categoryPosts) {
    return (
      <Layout>
        <FullPost
          postId={postId}
          returnPath={params.slug}
          posts={categoryPosts}
        />
      </Layout>
    );
  } else {
    notFound();
  }
}
