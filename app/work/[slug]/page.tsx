import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProjectTeam } from "@/components/projects/ProjectTeam";
import { projects, getProjectBySlug } from "@/lib/content/projects";
import { imageTreatmentClass } from "@/lib/imageTreatment";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectDetailPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((entry) => entry.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <PageTransition>
      <main className="px-6 pb-28 pt-36 tablet:px-10 tablet:pt-48">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
          Project {project.number}
        </p>
        <h1 className="mt-4 font-display text-6xl uppercase leading-[0.85] tracking-tight text-foreground tablet:text-8xl desktop:text-9xl">
          {project.title}
        </h1>

        <dl className="mt-14 grid grid-cols-2 gap-8 border-y border-border py-8 tablet:grid-cols-4">
          <div>
            <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">Role</dt>
            <dd className="mt-2 font-body text-sm leading-relaxed text-foreground">
              {project.role}
            </dd>
          </div>
          <div>
            <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">Year</dt>
            <dd className="mt-2 font-body text-sm text-foreground">{project.year}</dd>
          </div>
          <div>
            <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">Type</dt>
            <dd className="mt-2 font-body text-sm text-foreground">{project.category}</dd>
          </div>
          {project.liveUrl && (
            <div>
              <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
                Live
              </dt>
              <dd className="mt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="OPEN SITE →"
                  className="border-b border-border pb-0.5 font-body text-sm text-foreground transition-colors hover:border-foreground"
                >
                  {project.liveLabel ?? "Visit site"} →
                </a>
              </dd>
            </div>
          )}
        </dl>

        {project.heroImage ? (
          <div className="relative mt-16 aspect-video w-full overflow-hidden border border-border">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className={`object-cover object-top ${imageTreatmentClass(project.imageTreatment)}`}
            />
          </div>
        ) : (
          <div className="mt-16 flex aspect-video w-full flex-col justify-between border border-border bg-linear-to-br from-[#0d0d0d] via-[#141414] to-[#080808] p-8">
            <span className="font-display text-7xl leading-none text-foreground/25 tablet:text-9xl">
              {project.number}
            </span>
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
              {project.category}
            </span>
          </div>
        )}

        <section className="mt-20 grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] tablet:gap-16">
          <h2 className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">Overview</h2>
          <p className="max-w-2xl font-body text-base leading-relaxed text-foreground/90">
            {project.description}
          </p>
        </section>

        {project.gallery.length > 0 && (
          <section className="mt-24 grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] tablet:gap-16">
            <h2 className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">Gallery</h2>
            {/* Shown at each image's own shape, never cropped: screenshots lose
                their meaning if the edges are cut off. A lone image takes the
                full column; several pair up. */}
            <div
              className={`grid grid-cols-1 gap-8 ${project.gallery.length > 1 ? "tablet:grid-cols-2" : ""}`}
            >
              {project.gallery.map((image) => (
                <figure key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={
                      project.gallery.length > 1
                        ? "(max-width: 768px) 100vw, 35vw"
                        : "(max-width: 768px) 100vw, 70vw"
                    }
                    className={`h-auto w-full border border-border ${imageTreatmentClass(project.imageTreatment)}`}
                  />
                  {image.caption && (
                    <figcaption className="mt-3 font-body text-[10px] uppercase tracking-[0.2em] text-muted">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.team && project.team.length > 0 && (
          <section className="mt-24 grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] tablet:gap-16">
            <h2 className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
              The Team
            </h2>
            <ProjectTeam members={project.team} />
          </section>
        )}

        <nav className="mt-28 border-t border-border pt-8" aria-label="Next project">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
            Next Project
          </p>
          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor-label="VIEW PROJECT →"
            className="group mt-3 flex items-baseline gap-4 font-display text-4xl uppercase tracking-tight text-foreground tablet:text-7xl"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-3">
              {nextProject.title}
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </main>
    </PageTransition>
  );
}
