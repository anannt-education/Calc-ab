import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          `${BASE_PATH}$`,
          `${BASE_PATH}/`,
          `${BASE_PATH}/lesson/u1-limit-vs-value`,
          `${BASE_PATH}/lesson/u6-ftc`,
          `${BASE_PATH}/exam/2027`,
          "/lesson/u1-limit-vs-value",
          "/lesson/u6-ftc",
          "/exam/2027",
        ],
        disallow: [
          "/mock",
          "/mock/",
          "/api",
          "/api/",
          "/keys",
          "/keys/",
          `${BASE_PATH}/mock`,
          `${BASE_PATH}/api`,
          `${BASE_PATH}/keys`,
        ],
      },
    ],
    sitemap: `${SITE_URL}${BASE_PATH}/sitemap.xml`,
    host: SITE_URL,
  };
}
