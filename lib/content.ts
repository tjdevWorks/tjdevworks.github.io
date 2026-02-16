import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ThemeMode = "light" | "dark" | "system";

export type NavItem = {
  label: string;
  href: string;
};

export type SocialProfile = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "medium" | "mail" | "link";
};

export type SeoDefaults = {
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  siteUrl: string;
  twitterHandle?: string;
};

export type SiteConfig = {
  siteName: string;
  tagline: string;
  headline?: string;
  pronouns?: string;
  company?: string;
  location: string;
  email: string;
  avatarImage: string;
  affiliation?: string;
  githubRepoUrl?: string;
};

export type SiteProfile = {
  config: SiteConfig;
  summary: string;
};

export type FrontmatterBase = {
  title: string;
  description?: string;
};

export type PageFrontmatter = FrontmatterBase;

export type BlogFrontmatter = FrontmatterBase & {
  slug: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  canonicalUrl?: string;
  ogImage?: string;
};

export type ProjectFrontmatter = FrontmatterBase & {
  slug: string;
  date: string;
  featured?: boolean;
  status?: "active" | "archived";
  stack?: string[];
  links?: {
    repo?: string;
    demo?: string;
  };
  image?: string;
};

export type ResumeMetadata = {
  title: string;
  pdfPath: string;
  lastUpdated?: string;
  displayAs?: "mdx" | "external";
};

export type ContentDoc<T> = {
  frontmatter: T;
  content: string;
};

type Predicate<T> = (value: unknown) => value is T;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function assertWith<T>(value: unknown, message: string, predicate: Predicate<T>): T {
  if (!predicate(value)) {
    throw new Error(message);
  }

  return value;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSocialIcon(value: unknown): value is SocialProfile["icon"] {
  return (
    value === "github" ||
    value === "linkedin" ||
    value === "twitter" ||
    value === "medium" ||
    value === "mail" ||
    value === "link"
  );
}

function isNavItemArray(value: unknown): value is NavItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) => isObject(item) && isString(item.label) && isString(item.href)
    )
  );
}

function isSocialProfileArray(value: unknown): value is SocialProfile[] {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!isObject(item)) {
        return false;
      }

      return isString(item.label) && isString(item.href) && isSocialIcon(item.icon);
    })
  );
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function getContentDir(...segments: string[]): string {
  return path.join(process.cwd(), "content", ...segments);
}

export function loadMdxFile<T>(absolutePath: string): ContentDoc<T> {
  const raw = readFile(absolutePath);
  const parsed = matter(raw);

  return {
    frontmatter: parsed.data as T,
    content: parsed.content
  };
}

export function listMdxSlugs(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

function validateSiteConfig(value: unknown): SiteConfig {
  const input = assertWith(value, "Invalid site config", isObject);

  if (
    !isString(input.siteName) ||
    !isString(input.tagline) ||
    !isOptionalString(input.headline) ||
    !isOptionalString(input.pronouns) ||
    !isOptionalString(input.company) ||
    !isString(input.location) ||
    !isString(input.email) ||
    !isString(input.avatarImage) ||
    !isOptionalString(input.affiliation) ||
    !isOptionalString(input.githubRepoUrl)
  ) {
    throw new Error("Invalid site config frontmatter shape.");
  }

  return {
    siteName: input.siteName,
    tagline: input.tagline,
    headline: input.headline,
    pronouns: input.pronouns,
    company: input.company,
    location: input.location,
    email: input.email,
    avatarImage: input.avatarImage,
    affiliation: input.affiliation,
    githubRepoUrl: input.githubRepoUrl
  };
}

function validateSeoDefaults(value: unknown): SeoDefaults {
  const input = assertWith(value, "Invalid SEO config", isObject);

  if (
    !isString(input.defaultTitle) ||
    !isString(input.defaultDescription) ||
    !isString(input.defaultOgImage) ||
    !isString(input.siteUrl) ||
    !isOptionalString(input.twitterHandle)
  ) {
    throw new Error("Invalid seo config frontmatter shape.");
  }

  return {
    defaultTitle: input.defaultTitle,
    defaultDescription: input.defaultDescription,
    defaultOgImage: input.defaultOgImage,
    siteUrl: input.siteUrl,
    twitterHandle: input.twitterHandle
  };
}

function validateResumeMetadata(value: unknown): ResumeMetadata {
  const input = assertWith(value, "Invalid resume metadata", isObject);

  const displayAs = input.displayAs;
  const displayAsIsValid =
    displayAs === undefined || displayAs === "mdx" || displayAs === "external";

  if (
    !isString(input.title) ||
    !isString(input.pdfPath) ||
    !isOptionalString(input.lastUpdated) ||
    !displayAsIsValid
  ) {
    throw new Error("Invalid resume metadata frontmatter shape.");
  }

  return {
    title: input.title,
    pdfPath: input.pdfPath,
    lastUpdated: input.lastUpdated,
    displayAs: input.displayAs as ResumeMetadata["displayAs"]
  };
}

function validateBlogFrontmatter(value: unknown): BlogFrontmatter {
  const input = assertWith(value, "Invalid blog post", isObject);

  if (
    !isString(input.title) ||
    !isOptionalString(input.description) ||
    !isString(input.slug) ||
    !isString(input.date) ||
    !isOptionalString(input.readingTime) ||
    (input.tags !== undefined && !isStringArray(input.tags)) ||
    !isOptionalString(input.canonicalUrl) ||
    !isOptionalString(input.ogImage)
  ) {
    throw new Error(`Invalid blog frontmatter in ${String(input.slug ?? "unknown")}`);
  }

  return {
    title: input.title,
    description: input.description,
    slug: input.slug,
    date: input.date,
    readingTime: input.readingTime,
    tags: input.tags,
    canonicalUrl: input.canonicalUrl,
    ogImage: input.ogImage
  };
}

function validateProjectFrontmatter(value: unknown): ProjectFrontmatter {
  const input = assertWith(value, "Invalid project", isObject);
  const status = input.status;

  if (
    !isString(input.title) ||
    !isOptionalString(input.description) ||
    !isString(input.slug) ||
    !isString(input.date) ||
    (input.featured !== undefined && typeof input.featured !== "boolean") ||
    (status !== undefined && status !== "active" && status !== "archived") ||
    (input.stack !== undefined && !isStringArray(input.stack)) ||
    !isOptionalString(input.image)
  ) {
    throw new Error(`Invalid project frontmatter in ${String(input.slug ?? "unknown")}`);
  }

  if (input.links !== undefined) {
    if (!isObject(input.links)) {
      throw new Error(`Invalid project links in ${input.slug}`);
    }

    if (!isOptionalString(input.links.repo) || !isOptionalString(input.links.demo)) {
      throw new Error(`Invalid project links in ${input.slug}`);
    }
  }

  return {
    title: input.title,
    description: input.description,
    slug: input.slug,
    date: input.date,
    featured: input.featured,
    status: input.status as ProjectFrontmatter["status"],
    stack: input.stack,
    links: input.links as ProjectFrontmatter["links"],
    image: input.image
  };
}

function validatePageFrontmatter(value: unknown): PageFrontmatter {
  const input = assertWith(value, "Invalid page frontmatter", isObject);

  if (!isString(input.title) || !isOptionalString(input.description)) {
    throw new Error("Invalid page frontmatter shape.");
  }

  return {
    title: input.title,
    description: input.description
  };
}

function toDateValue(date: string): number {
  const parsed = new Date(date).getTime();

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

export function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function getSiteConfig(): SiteConfig {
  const filePath = `${getContentDir("_config")}/site.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return validateSiteConfig(doc.frontmatter);
}

export function getSiteProfile(): SiteProfile {
  const filePath = `${getContentDir("_config")}/site.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return {
    config: validateSiteConfig(doc.frontmatter),
    summary: doc.content.trim()
  };
}

export function getNavigationConfig(): NavItem[] {
  const filePath = `${getContentDir("_config")}/navigation.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  const items = doc.frontmatter.items;

  if (!isNavItemArray(items)) {
    throw new Error("Invalid navigation config frontmatter.");
  }

  return items;
}

export function getSocialConfig(): SocialProfile[] {
  const filePath = `${getContentDir("_config")}/social.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  const profiles = doc.frontmatter.profiles;

  if (!isSocialProfileArray(profiles)) {
    throw new Error("Invalid social config frontmatter.");
  }

  return profiles;
}

export function getSeoDefaults(): SeoDefaults {
  const filePath = `${getContentDir("_config")}/seo.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return validateSeoDefaults(doc.frontmatter);
}

export function getPageDoc(slug: string): ContentDoc<PageFrontmatter> {
  const filePath = `${getContentDir("pages")}/${slug}.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return {
    frontmatter: validatePageFrontmatter(doc.frontmatter),
    content: doc.content
  };
}

export function getResumeMetadata(): ResumeMetadata {
  const filePath = `${getContentDir("resume")}/resume.metadata.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return validateResumeMetadata(doc.frontmatter);
}

export function getResumeDoc(): ContentDoc<PageFrontmatter> {
  const filePath = `${getContentDir("resume")}/resume.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return {
    frontmatter: validatePageFrontmatter(doc.frontmatter),
    content: doc.content
  };
}

export function getBlogSlugs(): string[] {
  return listMdxSlugs(getContentDir("blog"));
}

export function getProjectSlugs(): string[] {
  return listMdxSlugs(getContentDir("projects"));
}

export function getBlogPostBySlug(slug: string): ContentDoc<BlogFrontmatter> {
  const filePath = `${getContentDir("blog")}/${slug}.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return {
    frontmatter: validateBlogFrontmatter(doc.frontmatter),
    content: doc.content
  };
}

export function getProjectBySlug(slug: string): ContentDoc<ProjectFrontmatter> {
  const filePath = `${getContentDir("projects")}/${slug}.mdx`;
  const doc = loadMdxFile<Record<string, unknown>>(filePath);

  return {
    frontmatter: validateProjectFrontmatter(doc.frontmatter),
    content: doc.content
  };
}

export function getAllBlogPosts(): Array<ContentDoc<BlogFrontmatter>> {
  return getBlogSlugs()
    .map((slug) => getBlogPostBySlug(slug))
    .sort((left, right) => toDateValue(right.frontmatter.date) - toDateValue(left.frontmatter.date));
}

export function getAllProjects(): Array<ContentDoc<ProjectFrontmatter>> {
  return getProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .sort((left, right) => {
      const featuredDelta = Number(Boolean(right.frontmatter.featured)) - Number(Boolean(left.frontmatter.featured));

      if (featuredDelta !== 0) {
        return featuredDelta;
      }

      return toDateValue(right.frontmatter.date) - toDateValue(left.frontmatter.date);
    });
}
