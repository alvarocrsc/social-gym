import createBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No includeSubDomains until every Hostinger-side subdomain is confirmed
  // HTTPS-only.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/*
 * Retired URLs, kept pointing somewhere useful.
 *
 * Paths from the old socialgymfit.com WordPress site, plus disciplines the club
 * has stopped running — those were live and in the sitemap, so a bare 404 would
 * strand anyone who bookmarked or linked them.
 *
 * Old WordPress paths:
 *
 * They live here, on the current domain, rather than on the old one, so they
 * work however a visitor arrives: Netlify's alias redirect preserves the path,
 * and these finish the journey. That also means they keep working if the old
 * domain is ever dropped and someone follows a printed link.
 *
 * `/politica-de-privacidad` is confirmed — it is the page the client pointed at
 * when the legal pages were written. The rest are the slugs a Spanish WordPress
 * gym site conventionally uses; one that never existed simply never fires.
 * Add to this list once `site:socialgymfit.com` gives the real set.
 */
const legacyPaths: Array<{ from: string; to: string }> = [
  { from: "/politica-de-privacidad", to: "/privacidad" },
  { from: "/politica-de-cookies", to: "/cookies" },
  { from: "/tarifas", to: "/membresias" },
  { from: "/precios", to: "/membresias" },
  { from: "/clases", to: "/disciplinas" },
  { from: "/actividades", to: "/disciplinas" },
  { from: "/quienes-somos", to: "/contacto" },
  // Retired 2026-09-21, when it left the timetable.
  { from: "/disciplinas/defensa-personal", to: "/disciplinas" },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers() {
    return Promise.resolve([{ source: "/:path*", headers: securityHeaders }]);
  },
  redirects() {
    return Promise.resolve(
      legacyPaths.map(({ from, to }) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
    );
  },
};

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
