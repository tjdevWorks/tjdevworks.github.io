import { MdxContent } from "@/components/content/MdxContent";
import { renderMdx } from "@/lib/mdx";
import { getPageDoc } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const doc = getPageDoc("about");

  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    canonicalPath: "/about"
  });
}

export default async function AboutPage() {
  const doc = getPageDoc("about");
  const content = await renderMdx(doc.content);

  return (
    <article className="rounded-2xl border border-border/35 bg-card/70 p-6 md:p-8">
      <h1 className="font-serif text-4xl font-semibold">{doc.frontmatter.title}</h1>
      {doc.frontmatter.description ? <p className="mt-3 text-muted">{doc.frontmatter.description}</p> : null}
      <div className="mt-8">
        <MdxContent>{content}</MdxContent>
      </div>
    </article>
  );
}
