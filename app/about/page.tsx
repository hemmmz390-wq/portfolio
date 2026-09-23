import Image from "next/image";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteSettings } from "@/lib/content/site";
import { capabilities } from "@/lib/content/capabilities";

export const metadata: Metadata = {
  title: "About",
  description: siteSettings.introParagraph,
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="px-6 pb-28 pt-36 tablet:px-10 tablet:pt-48">
        <SectionHeading eyebrow="(01) — About" title="Who I Am" className="mb-16" />

        <div className="grid grid-cols-1 gap-12 tablet:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] tablet:gap-16">
          <div className="relative aspect-3/4 w-full overflow-hidden border border-border">
            <Image
              src="/images/hero.webp"
              alt={`${siteSettings.name} portrait`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-[center_15%] grayscale contrast-[1.25] brightness-90"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-display text-2xl uppercase leading-[1.15] tracking-tight text-foreground tablet:text-4xl">
              {siteSettings.introParagraph}
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
                  Role
                </dt>
                <dd className="mt-2 font-body text-sm text-foreground">{siteSettings.role}</dd>
              </div>
              <div>
                <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
                  Contact
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="border-b border-border pb-0.5 font-body text-sm text-foreground transition-colors hover:border-foreground"
                  >
                    {siteSettings.email}
                  </a>
                </dd>
              </div>
            </dl>

            <ul className="mt-8 flex flex-wrap gap-5">
              {siteSettings.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[10px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-foreground"
                  >
                    {social.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-28 tablet:mt-40">
          <SectionHeading eyebrow="(02) — What I Do" title="Capabilities & Tools" className="mb-14" />
          <Capabilities capabilities={capabilities} />
        </section>
      </main>
    </PageTransition>
  );
}
