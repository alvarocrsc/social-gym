import type { Metadata } from "next";
import {
  Archivo,
  Archivo_Black,
  Geist,
  JetBrains_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
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
  preload: false,
});

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

const satoshi = localFont({
  src: "../../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata(pageSeo["/"]);

export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Layout");

  return (
    <html
      lang={locale}
      // globals.css sets `scroll-behavior: smooth`; without this Next warns and
      // route transitions inherit the smooth scroll instead of jumping.
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${archivoBlack.variable} ${jetBrainsMono.variable} ${geist.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <a
            href="#contenido"
            className="sr-only rounded-sm bg-accent px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
          >
            {t("skipToContent")}
          </a>

          <SmoothScroll />

          <SiteHeader />

          {/* Clears the fixed bar. The hero opts out with a negative margin,
              because it is designed to run full-bleed underneath it. */}
          <main id="contenido" className="flex-1 pt-[var(--header-height)]">
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
