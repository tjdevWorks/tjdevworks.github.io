import type { ProjectFrontmatter } from "@/lib/content";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ResponsiveGrid } from "@/components/sections/ResponsiveGrid";

type ProjectListProps = {
  projects: ProjectFrontmatter[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </ResponsiveGrid>
  );
}
