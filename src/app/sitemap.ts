import type { MetadataRoute } from "next";
import { PUBLIC_LESSON_1, PUBLIC_LESSON_2 } from "@/lib/gate";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl(`/lesson/${PUBLIC_LESSON_1}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(`/lesson/${PUBLIC_LESSON_2}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
