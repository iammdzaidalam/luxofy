import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectSlugs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/register`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...projectSlugs.map((slug) => ({
      url: `${site.url}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
