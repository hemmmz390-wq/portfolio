import type { Metadata } from "next";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { PageTransition } from "@/components/layout/PageTransition";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects in web development, photography, and content creation.",
};

export default function WorkPage() {
  if (projects.length === 0) {
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
        <ProjectIndex projects={projects} />

        <section className="mt-28">
          <SectionHeading eyebrow="(02) — Overview" title="In Detail" className="mb-14" />
          <ProjectGrid projects={projects} />
        </section>
      </main>
    </PageTransition>
  );
}
