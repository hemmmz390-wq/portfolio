import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label="VIEW PROJECT →"
      className="group block"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden border border-border">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            data-testid="project-placeholder"
            className="flex h-full w-full flex-col justify-between bg-linear-to-br from-[#0b0b0b] to-[#161616] p-6 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          >
            <span className="font-display text-7xl leading-none text-foreground/15">
              {project.number}
            </span>
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
              {project.category}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-border pt-4">
        <div>
          <p className="font-body text-[10px] tracking-[0.25em] text-muted">{project.number}</p>
          <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1">
            {project.title}
          </h3>
          <p className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-muted">
            {project.category}
          </p>
        </div>
        <span className="font-body text-[10px] tracking-[0.2em] text-muted">{project.year}</span>
      </div>
    </Link>
  );
}
