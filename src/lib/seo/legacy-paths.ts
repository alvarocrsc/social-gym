/**
 * Paths that used to serve something and now live elsewhere.
 *
 * Applied in `proxy.ts` rather than through `redirects()` in `next.config.ts`.
 * Locally Next runs config redirects before middleware, so either works; on
 * Netlify the proxy is an edge function that runs first, and next-intl answers
 * 404 for a path it cannot map before the redirect ever gets a turn..
 */
export const legacyPaths: Readonly<Record<string, string>> = {
  "/politica-de-privacidad": "/privacidad",
  "/politica-de-cookies": "/cookies",
  "/tarifas": "/membresias",
  "/precios": "/membresias",
  "/clases": "/disciplinas",
  "/actividades": "/disciplinas",
  "/quienes-somos": "/contacto",
  "/disciplinas/defensa-personal": "/disciplinas",
};

/**
 * The gym's previous domain. Any request that reaches it moves to the same
 * page on the current one.
 */
export const legacyHosts: ReadonlySet<string> = new Set([
  "socialgymfit.com",
  "www.socialgymfit.com",
]);

/** Looks a pathname up, ignoring a trailing slash. */
export function legacyDestination(pathname: string): string | undefined {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return legacyPaths[clean];
}
