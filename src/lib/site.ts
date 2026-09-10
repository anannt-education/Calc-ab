import type { Metadata } from "next";
import { BASE_PATH, PUBLIC_LESSON_1, PUBLIC_LESSON_2 } from "./gate";

/** Canonical origin for metadataBase, OG, sitemap, and JSON-LD. Paths add basePath. */
export const SITE_URL = "https://study.anannt.ae";
export const SITE_NAME = "Anannt Education";
export const COURSE_NAME = "Calculus AB self-study";
export const TITLE_SUFFIX = "Anannt Education";

export { BASE_PATH };

export const FOOTER_TRADEMARK =
  "AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this website.";

export const FOOTER_SUPPLEMENT =
  "This studio is a self-study supplement. It does not predict an official AP score and is not Bluebook or AP Classroom.";

export const FOOTER_CONTACT =
  "Anannt Education · Office 105, Bank Street Building, Burjuman Metro Exit 2, Dubai · +971 58585 3551 · wecare@anannt.ae";

export const TRUST_LINE = FOOTER_TRADEMARK;

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `${SITE_URL}${BASE_PATH}`;
  return `${SITE_URL}${BASE_PATH}${p}`;
}

/** Strip TeX delimiters so meta descriptions stay readable. */
export function plainText(input: string, max = 160) {
  const cleaned = input
    .replace(/\$\$([\s\S]+?)\$\$/g, " $1 ")
    .replace(/\$([^$]+)\$/g, " $1 ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}_^]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trim()}…`;
}

export function pageTitle(page: string) {
  const suffix = ` | ${TITLE_SUFFIX}`;
  const max = 60;
  if (page.length + suffix.length <= max) return `${page}${suffix}`;
  const budget = Math.max(12, max - suffix.length - 1);
  return `${page.slice(0, budget).trim()}…${suffix}`;
}

/** Unique public-page copy. Descriptions are 150–160 characters. */
export const PUBLIC_SEO = {
  home: {
    title: "Calculus AB self-study",
    description:
      "Study Calculus AB with Anannt on study.anannt.ae. Lesson 1 is why a limit is not a function value; lesson 2 is FTC accumulation. May 2027 planning, not a score.",
    path: "/",
  },
  exam: {
    title: "2027 Calculus AB exam guide",
    description:
      "Anannt’s May 2027 Calculus AB guide: 42 MCQ, six FRQ, four parts, calculator rules. Planning commentary — confirm the official counts with College Board.",
    path: "/exam/2027",
  },
  faq: {
    title: "Calculus AB FAQ",
    description:
      "Anannt Calculus AB FAQ: no score predictions, self-administered mocks, and finishing a lesson is not mastery. May 2027 planning only — never a verdict.",
    path: "/faq",
  },
  privacy: {
    title: "Privacy",
    description:
      "This Calculus AB studio stores progress in your browser. Lessons 1–2 and the diagnostic start need no account. Later work continues on study.anannt.ae.",
    path: "/privacy",
  },
  diagnostic: {
    title: "Calculus AB diagnostic",
    description:
      "Start the Calculus AB diagnostic with no account. Mark not-yet-learned when a topic is new. After you submit, continue on study.anannt.ae to save progress.",
    path: "/onboarding",
  },
  lesson1: {
    title: "Limit vs function value",
    description:
      "Why a limit is not a function value: nearby heights versus the filled point. Public Calculus AB lesson 1 from Anannt. May 2027 planning, not a predicted score.",
    path: `/lesson/${PUBLIC_LESSON_1}`,
  },
  lesson2: {
    title: "FTC accumulation",
    description:
      "FTC accumulation: signed area, why A falls when f is negative, and the chain factor when the upper limit is x². Public Calculus AB lesson 2 from Anannt, Dubai.",
    path: `/lesson/${PUBLIC_LESSON_2}`,
  },
} as const;

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = pageTitle(title);
  const kw = keywords ?? [
    "Calculus AB 2027",
    "Anannt Education",
    "limits",
    "Fundamental Theorem of Calculus",
    "self-study",
    "Dubai",
  ];
  return {
    title: { absolute: fullTitle },
    description,
    keywords: kw,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
