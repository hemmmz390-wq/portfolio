"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-14 tablet:grid-cols-2 tablet:gap-x-10 tablet:gap-y-24">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className={index % 2 === 1 ? "tablet:mt-28" : ""}
        >
          <ProjectCard project={project} priority={index === 0} />
        </motion.div>
      ))}
    </div>
  );
}
