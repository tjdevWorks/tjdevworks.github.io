import { getSeoDefaults } from "@/lib/content";

function normalizePath(pathname: string): string {
  if (!pathname.startsWith("/")) {
    return `/${pathname}`;
  }

  return pathname;
}

export function absoluteUrl(pathname = "/"): string {
  const seo = getSeoDefaults();
  const normalizedPath = normalizePath(pathname);
  const base = seo.siteUrl.replace(/\/$/, "");

  if (!base) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
}
