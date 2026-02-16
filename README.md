# Markdown-Driven Next.js Portfolio

A content-first portfolio inspired by tjdevworks.github.io, implemented with Next.js App Router, TypeScript, Tailwind, and MDX frontmatter.

## Features

- Fully markdown/MDX-driven content and config.
- Routes: `/`, `/about`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/resume`.
- Theme system: light, dark, automatic (`system`) with persistence via `localStorage` key `theme-mode`.
- Blog canonical link support for short internal posts linking to external originals.
- Resume page with one-click PDF download from `/assets/resume.pdf`.
- SEO metadata helpers + sitemap generation.
- GitHub Pages static export and Vercel compatibility.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is exported to `out/` (`next.config.js` uses `output: "export"`).

## Deployment

### GitHub Pages

- Keep `output: "export"` and `images.unoptimized: true`.
- Set repository variable `BASE_PATH` to `/<repo-name>` for repo-pages style deployment.
- Workflow file: `/Users/summit/Documents/tjdevworks_resume/.github/workflows/deploy.yml`.

### Vercel

- Import the repository directly.
- Leave `BASE_PATH` unset unless deploying under a subpath.

## Content Editing

- Site config: `/Users/summit/Documents/tjdevworks_resume/content/_config/site.mdx`
- Navigation: `/Users/summit/Documents/tjdevworks_resume/content/_config/navigation.mdx`
- Social links: `/Users/summit/Documents/tjdevworks_resume/content/_config/social.mdx`
- SEO defaults: `/Users/summit/Documents/tjdevworks_resume/content/_config/seo.mdx`
- Pages: `/Users/summit/Documents/tjdevworks_resume/content/pages/*.mdx`
- Blog posts: `/Users/summit/Documents/tjdevworks_resume/content/blog/*.mdx`
- Projects: `/Users/summit/Documents/tjdevworks_resume/content/projects/*.mdx`
- Resume: `/Users/summit/Documents/tjdevworks_resume/content/resume/*.mdx`

## Optional Resume PDF Automation

Skeleton script:

```bash
npm run generate:resume-pdf
```

Script location: `/Users/summit/Documents/tjdevworks_resume/scripts/generate-resume-pdf.ts`.
