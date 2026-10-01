function withProtocol(host: string | undefined): string | undefined {
  return host ? `https://${host}` : undefined;
}

/**
 * Canonical origin for metadata, sitemap.xml and robots.txt. An explicit
 * NEXT_PUBLIC_SITE_URL wins; otherwise on Vercel it uses the project's
 * production domain (set on every deployment, preview included) or the
 * deployment's own URL, so a live build never advertises localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  withProtocol(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  withProtocol(process.env.VERCEL_URL) ??
  "http://localhost:3000";
