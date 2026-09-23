import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">Error 404</p>
      <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight text-foreground tablet:text-8xl">
        Page Not Found
      </h1>
      <Link
        href="/"
        className="mt-10 border-b border-border pb-1 font-body text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-foreground"
      >
        Back Home →
      </Link>
    </main>
  );
}
