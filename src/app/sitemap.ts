import type { MetadataRoute } from "next";
import { PUBLIC_LESSON_META } from "@/lib/gate";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/exam/2027"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/onboarding"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  for (const lesson of Object.values(PUBLIC_LESSON_META)) {
    pages.push({
      url: absoluteUrl(lesson.href),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  return pages;
}
