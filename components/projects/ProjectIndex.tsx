import Link from "next/link";
import { Project } from "@/lib/types";

interface ProjectIndexProps {
  projects: Project[];
}

export function ProjectIndex({ projects }: ProjectIndexProps) {
  return (
    <ul className="border-t border-border">
      {projects.map((project) => (
        <li key={project.slug} className="border-b border-border">
          <Link
            href={`/work/${project.slug}`}
            data-cursor-label="VIEW PROJECT →"
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-opacity duration-300 hover:opacity-60 tablet:grid-cols-[3rem_1fr_1fr_4rem] tablet:gap-8"
          >
            <span className="font-body text-[10px] tracking-[0.25em] text-muted">
              {project.number}
            </span>
            <span className="font-display text-2xl uppercase tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-2 tablet:text-4xl">
              {project.title}
            </span>
            <span className="hidden font-body text-[10px] uppercase tracking-[0.2em] text-muted tablet:block">
              {project.category}
            </span>
            <span className="font-body text-[10px] tracking-[0.2em] text-muted">
              {project.year}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
