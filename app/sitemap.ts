import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/paths";
import { getBlogSlugs, getProjectSlugs } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/projects", "/blog", "/contact", "/resume"];
  const blogRoutes = getBlogSlugs().map((slug) => `/blog/${slug}`);
  const projectRoutes = getProjectSlugs().map((slug) => `/projects/${slug}`);
  const buildDate = new Date("2026-02-16T00:00:00.000Z");

  return [...staticRoutes, ...blogRoutes, ...projectRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: buildDate
  }));
}
