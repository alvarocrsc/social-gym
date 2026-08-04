import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware navigation helpers.
 *
 * Use these for every internal route instead of `next/link` and
 * `next/navigation`, so localized pathnames resolve and the locale prefix is
 * applied correctly. `href` is typed against the `pathnames` map, so an unknown
 * route is a compile error.
 */
export const {
  Link,
  redirect,
  permanentRedirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
