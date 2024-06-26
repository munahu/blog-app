import { notFound } from "next/navigation";
import { categories } from "../constants/categories";
import Nav from "../components/Nav";
import { getPosts } from "../actions";
import Feed from "../components/Feed";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const category = categories.find(
    (category) => category === slug.toUpperCase()
  );

  const posts = await getPosts(category ?? "TRENDING");

  if (category) {
    return (
      <main>
        <Nav category={category} />
        {posts && <Feed posts={posts} />}
      </main>
    );
  } else {
    notFound();
  }
}
