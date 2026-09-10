import type { Metadata } from "next";
import { BASE_PATH, SITE_ORIGIN } from "./gate";

/** Canonical origin for metadataBase, OG, and JSON-LD. Paths add `/calculus-ab`. */
export const SITE_URL = SITE_ORIGIN;
export const SITE_NAME = "Anannt Education";
export const COURSE_NAME = "Calculus AB";
export const TITLE_SUFFIX = "Calculus AB · Anannt Study";

export const FOOTER_TRADEMARK =
  "AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this website.";

export const FOOTER_STUDIO =
  "This studio is a self-study supplement. It does not predict an official AP score and is not Bluebook or AP Classroom.";

export const FOOTER_NAP =
  "Anannt Education · Office 105, Bank Street Building, Burjuman Metro Exit 2, Dubai · +971 58585 3551 · wecare@anannt.ae";

export const TRUST_LINE = `${FOOTER_TRADEMARK} ${FOOTER_STUDIO}`;

export const SITEMAP_PATHS = [
  "/",
  "/lesson/u1-limit-vs-value",
  "/lesson/u6-ftc",
  "/exam/2027",
  "/faq",
  "/privacy",
] as const;

export const PUBLIC_META = {
  home: {
    title: "Calculus AB self-prep",
    description:
      "Two public Calculus AB lessons: why a limit is not a function value, then FTC accumulation. No account. Self-prep for the May 2027 sitting from Burjuman.",
    path: "/",
  },
  lesson1: {
    title: "Limit vs function value",
    description:
      "A limit is nearby behaviour, not the filled point. First public Calculus AB lesson: graph, worked example, and an independent check. No account needed.",
    path: "/lesson/u1-limit-vs-value",
  },
  lesson2: {
    title: "FTC accumulation",
    description:
      "Accumulation as a running total, then the Fundamental Theorem. Second public Calculus AB lesson: predict the sign, then an independent check. No account.",
    path: "/lesson/u6-ftc",
  },
  exam: {
    title: "2027 Calculus AB exam guide",
    description:
      "May 2027 Calculus AB as we rehearse it: 42 multiple-choice, six free-response, four calculator parts. Faculty commentary — not a College Board document.",
    path: "/exam/2027",
  },
  faq: {
    title: "Calculus AB FAQ",
    description:
      "Honest Calculus AB answers: no score predictions, two public lessons without an account, and why opening a page is not the same as independent work yet.",
    path: "/faq",
  },
  privacy: {
    title: "Privacy · Calculus AB",
    description:
      "What this Calculus AB studio stores in your browser, what stays on the server, and how to reach Anannt in Burjuman. Two public lessons need no account.",
    path: "/privacy",
  },
  about: {
    title: "How this Calculus AB studio teaches",
    description:
      "How this Calculus AB studio teaches: one idea, a short check, then what to do next. A self-study supplement from Anannt in Burjuman, not a score predictor.",
    path: "/about",
  },
  faculty: {
    title: "Calculus AB faculty",
    description:
      "Who writes and reviews these Calculus AB lessons, and the two-person rule before a page reaches a student. Independent of the College Board, in Dubai.",
    path: "/faculty",
  },
  onboarding: {
    title: "Calculus AB placement",
    description:
      "A short Calculus AB placement set. Mark what you have not learned yet. Starting the diagnostic needs no account; submitting it opens the study gate here.",
    path: "/onboarding",
  },
  course: {
    title: "Calculus AB lessons that are open",
    description:
      "Two public Calculus AB lessons are open. The eight-unit map is still being written. Start with limit versus function value, then FTC accumulation here.",
    path: "/course",
  },
} as const;

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `${SITE_ORIGIN}${BASE_PATH}`;
  if (p.startsWith(BASE_PATH)) return `${SITE_ORIGIN}${p}`;
  return `${SITE_ORIGIN}${BASE_PATH}${p}`;
}

/** Strip TeX delimiters so meta descriptions stay readable. */
export function plainText(input: string, max = 155) {
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
  const max = 70;
  if (page.length + suffix.length <= max) return `${page}${suffix}`;
  const budget = Math.max(12, max - suffix.length - 1);
  return `${page.slice(0, budget).trim()}…${suffix}`;
}

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
    "self-prep",
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
