import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { Marquee } from "@/components/marquee/Marquee";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectIndexGroups } from "@/components/projects/ProjectIndexGroups";
import { PhotographyShowcase } from "@/components/photography/PhotographyShowcase";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteSettings } from "@/lib/content/site";
import { projects, getProjectGroups } from "@/lib/content/projects";
import { capabilities } from "@/lib/content/capabilities";
import { processSteps } from "@/lib/content/process";
import { photographs } from "@/lib/content/photography";

function sectionNumber(value: number): string {
  return String(value).padStart(2, "0");
}

export default function HomePage() {
  const featuredGroups = getProjectGroups(projects.filter((project) => project.featured));
  const hasPhotographs = photographs.length > 0;

  // Work sections start at (03) and everything after follows on, so adding or
  // removing a kind of work never leaves a gap or a repeated number.
  const photographyNumber = 3 + featuredGroups.length;
  const indexNumber = photographyNumber + (hasPhotographs ? 1 : 0);

  return (
    <PageTransition>
      <main>
        <Hero
          displayName="ELBERT"
          signature="Alwi"
          cjkName="莊秉洋"
          role={siteSettings.role}
          subheadline={siteSettings.heroSubheadline}
          intro="Web developer, photographer, and content creator building clean digital products."
          imageSrc="/images/hero-arms-color.webp"
          imageAlt={`${siteSettings.name} portrait`}
        />

        <section className="px-6 py-28 tablet:px-10 tablet:py-40">
          <p className="mb-8 font-body text-[10px] uppercase tracking-[0.3em] text-muted">
            (02) — Introduction
          </p>
          <h2 className="max-w-4xl font-display text-3xl uppercase leading-[1.05] tracking-tight text-foreground tablet:text-5xl desktop:text-6xl">
            {siteSettings.introHeadline}
          </h2>
          <p className="mt-10 max-w-md font-body text-sm leading-relaxed text-muted tablet:ml-auto">
            {siteSettings.introParagraph}
          </p>
        </section>

        {featuredGroups.length === 0 && (
          <section className="px-6 py-20 tablet:px-10">
            <p className="font-display text-2xl uppercase text-muted">Work coming soon.</p>
          </section>
        )}

        {featuredGroups.map((group, index) => (
          <section key={group.id} className="px-6 py-20 tablet:px-10">
            <div className="mb-14 flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow={`(${sectionNumber(index + 3)}) — ${group.description}`}
                title={group.label}
              />
              <Link
                href={`/work#${group.id}`}
                className="hidden shrink-0 border-b border-border pb-1 font-body text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-foreground hover:text-foreground tablet:block"
              >
                View All →
              </Link>
            </div>
            <ProjectGrid projects={group.projects} />
          </section>
        ))}

        {hasPhotographs && (
          <section id="photography" className="px-6 py-20 tablet:px-10">
            <SectionHeading
              eyebrow={`(${sectionNumber(photographyNumber)}) — Selected Frames`}
              title="Photography"
              className="mb-14"
            />
            <PhotographyShowcase photographs={photographs} />
          </section>
        )}

        <section className="px-6 py-28 tablet:px-10">
          <SectionHeading
            eyebrow={`(${sectionNumber(indexNumber)}) — Index`}
            title="All Work"
            className="mb-12"
          />
          <ProjectIndexGroups groups={getProjectGroups()} />
        </section>

        <section className="py-10">
          <Marquee items={capabilities.map((capability) => capability.title)} direction="left" />
          <Marquee
            items={["Elbert Alwi", "Web Developer", "Photographer", "Content Creator"]}
            direction="right"
            speed={36}
          />
        </section>

        <section className="px-6 py-28 tablet:px-10">
          <SectionHeading
            eyebrow={`(${sectionNumber(indexNumber + 1)}) — Method`}
            title="Inside The Creative Process"
            className="mb-16"
          />
          <ProcessSection steps={processSteps} />
        </section>

        <section className="px-6 py-28 tablet:px-10">
          <SectionHeading eyebrow={`(${sectionNumber(indexNumber + 2)}) — What I Do`} title="Capabilities" className="mb-14" />
          <Capabilities capabilities={capabilities} />
        </section>

        <section className="px-6 py-28 tablet:px-10 tablet:py-40">
          <p className="mb-8 font-body text-[10px] uppercase tracking-[0.3em] text-muted">
            ({sectionNumber(indexNumber + 3)}) — Contact
          </p>
          <h2 className="font-display text-[clamp(2.25rem,14vw,3rem)] uppercase leading-[0.9] tracking-tight text-foreground tablet:text-8xl">
            Let&rsquo;s create
            <br />
            something
            <br />
            meaningful.
          </h2>
          <p className="mt-10 max-w-sm font-body text-sm leading-relaxed text-muted">
            Have a project, idea, or collaboration in mind? Let&rsquo;s talk.
          </p>
          <Link
            href="/contact"
            data-cursor-label="SAY HELLO"
            className="mt-10 inline-block border-b border-border pb-1 font-body text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground"
          >
            Start a Project →
          </Link>
        </section>
      </main>
    </PageTransition>
  );
}
