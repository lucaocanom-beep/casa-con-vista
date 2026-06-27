import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// robots.txt — servito a /robots.txt. Indicizzazione aperta + link alla sitemap.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/guida", "/guida-casa-con-vista-porto-recanati.html"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
