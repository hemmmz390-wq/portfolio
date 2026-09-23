import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteSettings } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a project, idea, or collaboration in mind? Let's talk.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="px-6 pb-28 pt-36 tablet:px-10 tablet:pt-48">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
          (01) — Contact
        </p>
        <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight text-foreground tablet:text-8xl">
          Let&rsquo;s create
          <br />
          something
          <br />
          meaningful.
        </h1>

        <div className="mt-12 flex flex-col gap-4 border-y border-border py-8 tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="max-w-sm font-body text-sm leading-relaxed text-muted">
            Have a project, idea, or collaboration in mind? Let&rsquo;s talk.
          </p>
          <a
            href={`mailto:${siteSettings.email}`}
            className="font-body text-sm text-foreground underline-offset-4 hover:underline"
          >
            {siteSettings.email}
          </a>
        </div>

        <div className="mt-16">
          <ContactForm />
        </div>
      </main>
    </PageTransition>
  );
}
