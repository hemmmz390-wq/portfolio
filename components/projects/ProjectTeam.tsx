import Image from "next/image";
import { TeamMember } from "@/lib/types";

interface ProjectTeamProps {
  members: TeamMember[];
}

export function ProjectTeam({ members }: ProjectTeamProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-12 tablet:grid-cols-4 tablet:gap-x-8">
      {members.map((member) => (
        <li key={member.name}>
          {/* The portraits are cut-outs, so a soft glow gives each one a ground
              to stand on instead of floating on the bare page. */}
          <div className="relative aspect-2/3 w-full overflow-hidden border-b border-border bg-[radial-gradient(ellipse_at_50%_62%,rgba(255,255,255,0.08),transparent_70%)]">
            <Image
              src={member.image}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain object-bottom"
            />
          </div>
          <p className="mt-4 font-display text-xl uppercase tracking-tight text-foreground tablet:text-2xl">
            {member.name}
          </p>
          <p className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-muted">
            {member.role}
          </p>
        </li>
      ))}
    </ul>
  );
}
