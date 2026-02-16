import { ResumeDownloadButton } from "@/components/resume/ResumeDownloadButton";
import { MdxContent } from "@/components/content/MdxContent";
import { renderMdx } from "@/lib/mdx";
import { getResumeDoc, getResumeMetadata } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const doc = getResumeDoc();

  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    canonicalPath: "/resume"
  });
}

export default async function ResumePage() {
  const meta = getResumeMetadata();
  const resume = getResumeDoc();
  const content = await renderMdx(resume.content);

  return (
    <article className="rounded-2xl border border-border/35 bg-card/70 p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-semibold">{meta.title}</h1>
          {meta.lastUpdated ? <p className="mt-2 text-sm text-muted">Last updated: {meta.lastUpdated}</p> : null}
        </div>
        <ResumeDownloadButton pdfPath={meta.pdfPath} />
      </div>

      <div className="mt-8">
        <MdxContent>{content}</MdxContent>
      </div>
    </article>
  );
}
