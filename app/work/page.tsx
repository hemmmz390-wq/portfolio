import type { Metadata } from "next";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectIndexGroups } from "@/components/projects/ProjectIndexGroups";
import { PageTransition } from "@/components/layout/PageTransition";
import { getProjectGroups } from "@/lib/content/projects";
import { photographs } from "@/lib/content/photography";
import { PhotoGallery } from "@/components/photography/PhotoGallery";

export const metadata: Metadata = {
  title: "Work",
  description: "Web development, content creation, and photography.",
};

export default function WorkPage() {
  const groups = getProjectGroups();

  if (groups.length === 0) {
    return (
      <PageTransition>
        <main className="px-6 pb-28 pt-36 tablet:px-10 tablet:pt-48">
          <SectionHeading eyebrow="(01) — Index" title="All Work" className="mb-16" />
          <p className="font-display text-3xl uppercase text-muted">Work coming soon.</p>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="px-6 pb-28 pt-36 tablet:px-10 tablet:pt-48">
        <SectionHeading eyebrow="(01) — Index" title="All Work" className="mb-16" />
        <ProjectIndexGroups groups={groups} />

        {groups.map((group, index) => (
          <section key={group.id} id={group.id} className="mt-28 scroll-mt-28">
            <SectionHeading
              eyebrow={`(${String(index + 2).padStart(2, "0")}) — ${group.description}`}
              title={group.label}
              className="mb-14"
            />
            <ProjectGrid projects={group.projects} />
          </section>
        ))}

        {photographs.length > 0 && (
          <section id="photography" className="mt-28 scroll-mt-28">
            <SectionHeading
              eyebrow={`(${String(groups.length + 2).padStart(2, "0")}) — Selected Frames`}
              title="Photography"
              className="mb-14"
            />
            <PhotoGallery photographs={photographs} />
          </section>
        )}
      </main>
    </PageTransition>
  );
}
