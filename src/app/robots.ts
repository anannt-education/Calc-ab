import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_URL } from "@/lib/site";
import { GATED_LESSON_IDS, LESSON_1_ID, LESSON_2_ID } from "@/lib/gate";

const publicLessons = [LESSON_1_ID, LESSON_2_ID];
const gatedLessonDisallow = GATED_LESSON_IDS.flatMap((id) => [
  `/lesson/${id}`,
  `/lesson/${id}/`,
  `${BASE_PATH}/lesson/${id}`,
  `${BASE_PATH}/lesson/${id}/`,
]);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          `${BASE_PATH}$`,
          `${BASE_PATH}/`,
          ...publicLessons.flatMap((id) => [`${BASE_PATH}/lesson/${id}`, `/lesson/${id}`]),
          `${BASE_PATH}/exam/2027`,
          "/exam/2027",
        ],
        disallow: [
          ...gatedLessonDisallow,
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
