import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content/MdxContent";
import { renderMdx } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { getProjectBySlug, getProjectSlugs, formatDate } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;

  try {
    const doc = getProjectBySlug(slug);

    return buildMetadata({
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      canonicalPath: `/projects/${slug}`,
      ogImage: doc.frontmatter.image
    });
  } catch {
    return buildMetadata({ title: "Project not found", canonicalPath: `/projects/${slug}` });
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  try {
    const doc = getProjectBySlug(slug);
    const content = await renderMdx(doc.content);

    return (
      <article className="rounded-2xl border border-border/35 bg-card/70 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.15em] text-muted">{formatDate(doc.frontmatter.date)}</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">{doc.frontmatter.title}</h1>
        {doc.frontmatter.description ? <p className="mt-3 text-muted">{doc.frontmatter.description}</p> : null}
        <div className="mt-8">
          <MdxContent>{content}</MdxContent>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
