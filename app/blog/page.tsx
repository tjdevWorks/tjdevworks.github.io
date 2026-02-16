import { BlogList } from "@/components/blog/BlogList";
import { MdxContent } from "@/components/content/MdxContent";
import { renderMdx } from "@/lib/mdx";
import { getAllBlogPosts, getPageDoc } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const doc = getPageDoc("blog");

  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    canonicalPath: "/blog"
  });
}

export default async function BlogPage() {
  const pageDoc = getPageDoc("blog");
  const content = await renderMdx(pageDoc.content);
  const posts = getAllBlogPosts().map((entry) => entry.frontmatter);

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-border/35 bg-card/70 p-6 md:p-8">
        <h1 className="font-serif text-4xl font-semibold">{pageDoc.frontmatter.title}</h1>
        <div className="mt-4">
          <MdxContent>{content}</MdxContent>
        </div>
      </header>
      <BlogList posts={posts} />
    </section>
  );
}
