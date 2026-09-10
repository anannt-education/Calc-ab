import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_ORIGIN } from "@/lib/gate";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          BASE_PATH,
          `${BASE_PATH}/lesson/u1-limit-vs-value`,
          `${BASE_PATH}/lesson/u6-ftc`,
          `${BASE_PATH}/exam/2027`,
          `${BASE_PATH}/faq`,
          `${BASE_PATH}/privacy`,
        ],
        disallow: [
          `${BASE_PATH}/mock`,
          `${BASE_PATH}/api`,
          `${BASE_PATH}/practice`,
          `${BASE_PATH}/frq`,
          `${BASE_PATH}/cms`,
          `${BASE_PATH}/mentor`,
          `${BASE_PATH}/home`,
          `${BASE_PATH}/progress`,
          `${BASE_PATH}/mistakes`,
          `${BASE_PATH}/ask`,
        ],
      },
    ],
    sitemap: `${SITE_ORIGIN}${BASE_PATH}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
