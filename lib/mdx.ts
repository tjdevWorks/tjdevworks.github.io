import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

export async function renderMdx(source: string): Promise<ReactNode> {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: []
      }
    }
  });

  return content;
}
