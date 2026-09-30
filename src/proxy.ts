import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { legacyDestination, legacyHosts } from "@/lib/seo/legacy-paths";

/**
 * Locale negotiation and rewriting of localized pathnames.
 *
 * Next 16 deprecated the `middleware` file convention and renamed it to
 * `proxy` — see `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
 * Behaviour is unchanged; only the file and export names moved.
 */
const intl = createMiddleware(routing);

/**
 * Retired paths and the retired domain are answered here, before locale
 * negotiation. next-intl cannot map them to a route and would answer 404, and
 * on Netlify this runs at the edge ahead of anything `next.config.ts` declares.
 */
export default function proxy(request: NextRequest): NextResponse {
  const { hostname, pathname, search } = request.nextUrl;
  const destination = legacyDestination(pathname);
  if (legacyHosts.has(hostname) && site.url !== undefined) {
    const target = new URL(destination ?? pathname, site.url);
    target.search = search;
    return NextResponse.redirect(target, 308);
  }
  if (destination !== undefined) {
    return NextResponse.redirect(new URL(destination, request.url), 308);
  }
  return intl(request);
}

export const config = {
  /*
   * Match every pathname except:
   *   /api, /_next, /_vercel     framework and API internals
   *   /sitemap.xml, /robots.txt  generated at the app root, outside [locale]
   *   anything containing a dot  /favicon.ico, og images, everything in /public
   *
   * The dot rule already covers sitemap.xml and robots.txt. Both are named
   * explicitly so the intent survives any later edit to that rule — they must
   * stay reachable unprefixed.
   */
  matcher: ["/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)"],
};
