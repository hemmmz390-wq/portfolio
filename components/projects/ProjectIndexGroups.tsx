import { ProjectGroup } from "@/lib/types";
import { ProjectIndex } from "@/components/projects/ProjectIndex";

interface ProjectIndexGroupsProps {
  groups: ProjectGroup[];
}

export function ProjectIndexGroups({ groups }: ProjectIndexGroupsProps) {
  return (
    <div className="flex flex-col gap-16">
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`index-${group.id}`}>
          <h3
            id={`index-${group.id}`}
            className="mb-4 font-body text-[10px] uppercase tracking-[0.3em] text-muted"
          >
            {group.label}
          </h3>
          <ProjectIndex projects={group.projects} />
        </section>
      ))}
    </div>
  );
}
