import type { Metadata } from "next";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PageTransition } from "@/components/layout/PageTransition";
import { processSteps } from "@/lib/content/process";

export const metadata: Metadata = {
  title: "Process",
  description: "How a project moves from discovery through to launch.",
};

export default function ProcessPage() {
  return (
    <PageTransition>
      <main className="px-6 pb-28 pt-36 tablet:px-10 tablet:pt-48">
        <SectionHeading
          eyebrow="(01) — Method"
          title="Inside The Creative Process"
          className="mb-8"
        />
        <p className="mb-20 max-w-lg font-body text-sm leading-relaxed text-muted">
          Six steps that every project moves through, whether it&rsquo;s a web app, a photo set, or
          a video edit.
        </p>
        <ProcessSection steps={processSteps} />
      </main>
    </PageTransition>
  );
}
