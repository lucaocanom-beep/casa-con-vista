import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// robots.txt — servito a /robots.txt. Indicizzazione aperta + link alla sitemap.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
