import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * Locale negotiation and rewriting of localized pathnames.
 *
 * Next 16 deprecated the `middleware` file convention and renamed it to
 * `proxy` — see `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
 * Behaviour is unchanged; only the file and export names moved.
 */
const proxy = createMiddleware(routing);

export default proxy;

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
