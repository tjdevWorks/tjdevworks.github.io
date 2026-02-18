import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { AnalyticsPlaceholder } from "@/components/analytics/AnalyticsPlaceholder";
import { buildMetadata } from "@/lib/seo";
import { getNavigationConfig, getSiteConfig, getSocialConfig } from "@/lib/content";
import "@/styles/globals.css";

const themeInitScript = `
(function () {
  var key = "theme-mode";
  var mode = localStorage.getItem(key) || "dark";
  var resolved = mode;

  if (mode === "system") {
    resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.documentElement.setAttribute("data-theme", resolved);
})();
`;

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  const navItems = getNavigationConfig();
  const site = getSiteConfig();
  const socials = getSocialConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <SkipLink />
        <Header navItems={navItems} siteName={site.siteName} />
        <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-4 py-8 md:px-6 md:py-10" id="main-content">
          {children}
        </main>
        <Footer copyrightName={site.siteName} socials={socials} />
        <AnalyticsPlaceholder enabled measurementId="G-2ZD6LJBMN7" />
      </body>
    </html>
  );
}
