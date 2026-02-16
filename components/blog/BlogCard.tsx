import type { BlogFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/content";

type BlogCardProps = {
  post: BlogFrontmatter;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="rounded-xl border border-border/40 bg-card p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-muted">{formatDate(post.date)}</p>
      <h3 className="mt-2 text-xl font-semibold">
        <a className="hover:text-accent" href={`/blog/${post.slug}`}>
          {post.title}
        </a>
      </h3>
      {post.description ? <p className="mt-2 text-sm text-muted">{post.description}</p> : null}
      <p className="mt-3 text-xs text-muted">{post.readingTime ?? "2 min read"}</p>

      {post.tags && post.tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li className="rounded-full border border-border/60 px-2.5 py-1 text-xs" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {post.canonicalUrl ? (
        <a className="mt-4 inline-block text-sm font-medium underline decoration-accent underline-offset-4" href={post.canonicalUrl} rel="noreferrer" target="_blank">
          Read externally
        </a>
      ) : null}
    </article>
  );
}
