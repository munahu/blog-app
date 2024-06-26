import { getPost } from "@/app/actions";
import { notFound } from "next/navigation";
import FullPost from "@/app/components/FullPost";
import Layout from "@/app/components/Layout";

export default async function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const postId = Number(params.id);

  const post = await getPost(postId);

  if (post) {
    return (
      <Layout>
        <FullPost post={post} categoryURL={params.slug} />
      </Layout>
    );
  } else {
    notFound();
  }
}
