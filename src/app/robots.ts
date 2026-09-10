import type { MetadataRoute } from "next";
import { BASE_PATH, PUBLIC_LESSON_1, PUBLIC_LESSON_2 } from "@/lib/gate";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          BASE_PATH,
          `${BASE_PATH}/lesson/${PUBLIC_LESSON_1}`,
          `${BASE_PATH}/lesson/${PUBLIC_LESSON_2}`,
          `${BASE_PATH}/exam/2027`,
          `${BASE_PATH}/faq`,
          `${BASE_PATH}/privacy`,
        ],
        disallow: [`${BASE_PATH}/mock`, `${BASE_PATH}/api`, `${BASE_PATH}/keys`],
      },
    ],
    sitemap: `${SITE_URL}${BASE_PATH}/sitemap.xml`,
    host: SITE_URL,
  };
}
