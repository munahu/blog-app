import { getPostsByBlog } from "@/app/actions";
import Feed from "@/app/components/Feed";
import Layout from "@/app/components/Layout";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id: blogId } = params;

  const blogPosts = await getPostsByBlog(Number(blogId));

  if (blogPosts) {
    return (
      <Layout>
        <div className="md:mx-10 md:mb-10">
          <div className="mx-4 mt-24 mb-6 sm:max-w-[600px]">
            <div className="flex items-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-2 mr-2">
                {blogPosts[0].author.name}
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 sm:size-7 mb-2"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="uppercase text-xs md:text-sm mb-5 opacity-60">
              {blogPosts[0].blog.name}
            </p>
            <p className="font-light">{blogPosts[0].blog.description}</p>
          </div>
          <Feed posts={blogPosts} />
        </div>
      </Layout>
    );
  } else {
    notFound();
  }
}
