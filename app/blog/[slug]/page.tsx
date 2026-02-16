import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content/MdxContent";
import { ShareBar } from "@/components/blog/ShareBar";
import { renderMdx } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/paths";
import { formatDate, getBlogPostBySlug, getBlogSlugs } from "@/lib/content";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

type SourceKind = "Medium" | "Substack" | "LinkedIn" | "X" | "External";

function sourceKind(url?: string): SourceKind {
  if (!url) return "External";

  const lower = url.toLowerCase();

  if (lower.includes("medium.com")) return "Medium";
  if (lower.includes("substack.com")) return "Substack";
  if (lower.includes("linkedin.com")) return "LinkedIn";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "X";

  return "External";
}

function sourceIcon(kind: SourceKind) {
  if (kind === "Medium") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M4.37 7.17a.46.46 0 0 0-.15-.43L3.1 5.4V5.2h3.5l2.7 5.92 2.38-5.92H15v.2l-.96.92a.29.29 0 0 0-.1.28v6.8a.29.29 0 0 0 .1.28l.94.92v.2h-4.74v-.2l.97-.94c.09-.09.09-.11.09-.28V8.9l-2.7 6.87h-.36L5.1 8.9v4.6c-.03.22.04.44.2.59l1.26 1.54v.2H3v-.2l1.26-1.54c.15-.15.22-.37.19-.59V8.2a.56.56 0 0 0-.08-.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "LinkedIn") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16">
        <path d="M0 1.15C0 .52.52 0 1.15 0h13.7C15.48 0 16 .52 16 1.15v13.7c0 .63-.52 1.15-1.15 1.15H1.15A1.15 1.15 0 0 1 0 14.85V1.15ZM4.9 13.37V6.16H2.5v7.2H4.9ZM3.7 5.18c.84 0 1.36-.55 1.36-1.24-.02-.71-.52-1.24-1.34-1.24-.82 0-1.36.53-1.36 1.24 0 .69.52 1.24 1.32 1.24h.02Zm2.53 8.19h2.4V9.35c0-.22.02-.44.08-.6.18-.44.58-.9 1.27-.9.9 0 1.26.68 1.26 1.68v3.84h2.4V9.25c0-2.2-1.17-3.22-2.73-3.22-1.26 0-1.82.69-2.13 1.17h.02V6.16h-2.4c.03.69 0 7.2 0 7.2Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "X") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.2-8.3L1 2h6.2l4.3 5.7L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "Substack") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M4 4h16v3H4V4Zm0 6h16v3H4v-3Zm0 6h16v4H4v-4Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M8 5a3 3 0 0 0 0 6h2V9H8a1 1 0 1 1 0-2h2V5H8Zm6 0h-2v2h2a1 1 0 1 1 0 2h-2v2h2a3 3 0 1 0 0-6Zm-5 5h6v2H9v-2Z" fill="currentColor" />
    </svg>
  );
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;

  try {
    const doc = getBlogPostBySlug(slug);

    return buildMetadata({
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      canonicalPath: `/blog/${slug}`,
      ogImage: doc.frontmatter.ogImage
    });
  } catch {
    return buildMetadata({ title: "Post not found", canonicalPath: `/blog/${slug}` });
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  try {
    const doc = getBlogPostBySlug(slug);
    const content = await renderMdx(doc.content);
    const url = absoluteUrl(`/blog/${slug}`);
    const source = sourceKind(doc.frontmatter.canonicalUrl);

    return (
      <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/35 bg-card/75">
        {doc.frontmatter.ogImage ? (
          <img
            alt={`${doc.frontmatter.title} banner`}
            className="h-56 w-full object-cover md:h-72"
            height={288}
            src={doc.frontmatter.ogImage}
            width={1200}
          />
        ) : null}

        <div className="p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">{formatDate(doc.frontmatter.date)} · {doc.frontmatter.readingTime ?? "1 min read"}</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight md:text-4xl">{doc.frontmatter.title}</h1>
          {doc.frontmatter.description ? <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{doc.frontmatter.description}</p> : null}

          {doc.frontmatter.canonicalUrl ? (
            <div className="mt-5 rounded-xl border border-accent/35 bg-accent/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">External Publication</p>
              <a
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-accent underline-offset-4"
                href={doc.frontmatter.canonicalUrl}
                rel="noreferrer"
                target="_blank"
              >
                {sourceIcon(source)}
                Read full article on {source}
              </a>
            </div>
          ) : null}

          <div className="mt-8">
            <MdxContent>{content}</MdxContent>
          </div>

          <ShareBar title={doc.frontmatter.title} url={url} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
