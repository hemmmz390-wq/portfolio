import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { Marquee } from "@/components/marquee/Marquee";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteSettings } from "@/lib/content/site";
import { projects } from "@/lib/content/projects";
import { capabilities } from "@/lib/content/capabilities";
import { processSteps } from "@/lib/content/process";

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <PageTransition>
      <main>
        <Hero
          headline={siteSettings.heroHeadline}
          subheadline={siteSettings.heroSubheadline}
          imageSrc="/images/hero.webp"
          imageAlt={`${siteSettings.name} portrait`}
          role={siteSettings.role}
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

        <section className="px-6 py-20 tablet:px-10">
          <div className="mb-14 flex items-end justify-between gap-6">
            <SectionHeading eyebrow="(03) — Selected Work" title="Projects" />
            <Link
              href="/work"
              className="hidden shrink-0 border-b border-border pb-1 font-body text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-foreground hover:text-foreground tablet:block"
            >
              View All →
            </Link>
          </div>
          {featuredProjects.length > 0 ? (
            <ProjectGrid projects={featuredProjects} />
          ) : (
            <p className="font-display text-2xl uppercase text-muted">Work coming soon.</p>
          )}
        </section>

        <section className="px-6 py-28 tablet:px-10">
          <SectionHeading eyebrow="(04) — Index" title="All Work" className="mb-12" />
          <ProjectIndex projects={projects} />
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
            eyebrow="(06) — Method"
            title="Inside The Creative Process"
            className="mb-16"
          />
          <ProcessSection steps={processSteps} />
        </section>

        <section className="px-6 py-28 tablet:px-10">
          <SectionHeading eyebrow="(07) — What I Do" title="Capabilities" className="mb-14" />
          <Capabilities capabilities={capabilities} />
        </section>

        <section className="px-6 py-28 tablet:px-10 tablet:py-40">
          <p className="mb-8 font-body text-[10px] uppercase tracking-[0.3em] text-muted">
            (08) — Contact
          </p>
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight text-foreground tablet:text-8xl">
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
