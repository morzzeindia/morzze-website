import BlogDetailPage from "@/components/blogs/blogData";
import MoreToExploreSection from "@/components/blogs/exploreMore";
import { getBlogBySlug, getBlogs } from "@/helper/blog/action";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getBlogs();

  const sameCategoryBlogs = allBlogs.filter(
    (item: any) =>
      item.blogCategory === blog.blogCategory &&
      item.slug !== blog.slug &&
      item.isVisible !== false
  );

  const fallbackBlogs = allBlogs.filter(
    (item: any) =>
      item.slug !== blog.slug &&
      item.isVisible !== false
  );

  const shuffledFallbackBlogs = [...fallbackBlogs].sort(
    () => Math.random() - 0.5
  );

  const relatedBlogs =
    sameCategoryBlogs.length > 0
      ? sameCategoryBlogs
      : shuffledFallbackBlogs;

  return (
    <div>
      <BlogDetailPage
        blog={blog}
        relatedBlogs={relatedBlogs.slice(0, 3)}
      />

      <MoreToExploreSection />
    </div>
  );
};

export default page;