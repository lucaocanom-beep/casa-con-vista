import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { site } from "@/content/site";

// Sitemap servita a /sitemap.xml. Una entry per lingua con hreflang completo.

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${site.url}/${l}`])
  );

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "it" ? 1 : 0.9,
    alternates: { languages },
  }));
}
