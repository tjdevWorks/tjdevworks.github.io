import { ProjectList } from "@/components/projects/ProjectList";
import { MdxContent } from "@/components/content/MdxContent";
import { renderMdx } from "@/lib/mdx";
import { getAllProjects, getPageDoc } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const doc = getPageDoc("projects");

  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    canonicalPath: "/projects"
  });
}

export default async function ProjectsPage() {
  const pageDoc = getPageDoc("projects");
  const content = await renderMdx(pageDoc.content);
  const projects = getAllProjects().map((entry) => entry.frontmatter);

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-border/35 bg-card/70 p-6 md:p-8">
        <h1 className="font-serif text-4xl font-semibold">{pageDoc.frontmatter.title}</h1>
        <div className="mt-4">
          <MdxContent>{content}</MdxContent>
        </div>
      </header>
      <ProjectList projects={projects} />
    </section>
  );
}
