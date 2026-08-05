import type { Metadata } from "next";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { pageSeo } from "@/content/seo";
import { routing } from "@/i18n/routing";
import { buildRootGraph } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Archivo Black is a separate family from Archivo, not a weight of it. It is
// static and 400 is its only weight — omitting `weight` is a type error.
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Site-wide defaults. Every route overrides title, description and canonical. */
export const metadata: Metadata = buildMetadata(pageSeo["/"]);

/** Pre-renders both locales at build time — the site is fully static. */
export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Root layout. `[locale]` is the only top-level segment, so this is the
 * document shell for every page.
 */
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // The segment is a catch-all, so an unknown value can land here.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts this route into static rendering; without it the whole tree turns
  // dynamic as soon as a translation is read.
  setRequestLocale(locale);

  const t = await getTranslations("Layout");

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${archivoBlack.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          {/* Same-page fragment, so a real anchor is correct here, not Link. */}
          <a
            href="#contenido"
            className="sr-only rounded-sm bg-accent px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
          >
            {t("skipToContent")}
          </a>

          {/* TODO: SiteHeader — stub until the layout components stage. */}
          <header />

          <main id="contenido" className="flex-1">
            {children}
          </main>

          {/* TODO: SiteFooter — stub until the layout components stage. */}
          <footer />
        </NextIntlClientProvider>

        <JsonLd data={buildRootGraph()} />
      </body>
    </html>
  );
}
