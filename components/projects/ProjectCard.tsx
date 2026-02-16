import type { ProjectFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/content";

type ProjectCardProps = {
  project: ProjectFrontmatter;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border/40 bg-card p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-muted">
        {project.featured ? "Featured" : "Project"} · {formatDate(project.date)}
      </p>
      <h3 className="mt-2 text-xl font-semibold">
        <a className="hover:text-accent" href={`/projects/${project.slug}`}>
          {project.title}
        </a>
      </h3>
      {project.description ? <p className="mt-2 text-sm text-muted">{project.description}</p> : null}

      {project.stack && project.stack.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li className="rounded-full border border-border/60 px-2.5 py-1 text-xs" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {(project.links?.repo || project.links?.demo) ? (
        <div className="mt-4 flex gap-3 text-sm">
          {project.links?.repo ? (
            <a className="underline underline-offset-4" href={project.links.repo} rel="noreferrer" target="_blank">
              Repo
            </a>
          ) : null}
          {project.links?.demo ? (
            <a className="underline underline-offset-4" href={project.links.demo} rel="noreferrer" target="_blank">
              Demo
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
