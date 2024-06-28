import { notFound } from "next/navigation";
import { categories } from "../constants/categories";
import Nav from "../components/Nav";
import { getPostsByCategory } from "../actions";
import Feed from "../components/Feed";
import Layout from "../components/Layout";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const category = categories.find(
    (category) => category === slug.toUpperCase()
  );

  const posts = await getPostsByCategory(category ?? "TRENDING");

  if (category) {
    return (
      <Layout>
        <>
          <Nav category={category} />
          {posts && <Feed posts={posts} category={category} />}
        </>
      </Layout>
    );
  } else {
    notFound();
  }
}
