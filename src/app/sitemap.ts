import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date("2026-07-26"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
