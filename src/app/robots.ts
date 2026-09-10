import type { MetadataRoute } from "next";
import { BASE_PATH, STUDY_ORIGIN } from "@/lib/gate";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const root = BASE_PATH;
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          root,
          `${root}/`,
          `${root}/lesson/u1-limit-vs-value`,
          `${root}/lesson/u6-ftc`,
          `${root}/exam/2027`,
          `${root}/faq`,
          `${root}/privacy`,
          `${root}/about`,
          `${root}/onboarding`,
        ],
        disallow: [
          `${root}/mock`,
          `${root}/api`,
          `${root}/practice`,
          `${root}/frq`,
          `${root}/cms`,
          `${root}/mentor`,
          `${root}/home`,
          `${root}/progress`,
          `${root}/ask`,
          `${root}/mistakes`,
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: STUDY_ORIGIN,
  };
}
