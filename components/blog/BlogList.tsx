import type { BlogFrontmatter } from "@/lib/content";
import { BlogCard } from "@/components/blog/BlogCard";
import { ResponsiveGrid } from "@/components/sections/ResponsiveGrid";

type BlogListProps = {
  posts: BlogFrontmatter[];
};

export function BlogList({ posts }: BlogListProps) {
  return (
    <ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </ResponsiveGrid>
  );
}
