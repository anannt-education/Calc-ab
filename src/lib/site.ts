import type { Metadata } from "next";
import { BASE_PATH, STUDY_ORIGIN } from "./gate";

/** Canonical origin for metadataBase, Open Graph, and JSON-LD. Path prefix is BASE_PATH. */
export const SITE_ORIGIN = STUDY_ORIGIN;
export const SITE_URL = `${STUDY_ORIGIN}${BASE_PATH}`;
export const SITE_NAME = "Anannt Education";
export const COURSE_NAME = "Calculus AB · Anannt Study";
export const TITLE_SUFFIX = "Anannt Study";

export const TRUST_LINE =
  "Anannt Education — independent Calculus AB preparation. Not affiliated with or endorsed by College Board.";

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return SITE_URL;
  return `${SITE_URL}${p}`;
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
    "Anannt Study",
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

/** Unique 150–160 character descriptions for public URLs. */
export const PUBLIC_DESCRIPTIONS = {
  home: "Two open Calculus AB lessons for May 2027: why a limit is not a function value, then FTC accumulation. No account. A Burjuman desk if you get stuck later.",
  lesson1:
    "Why a limit is not the filled-in function value. Public Calculus AB lesson one with a graph lab and an independent check. No account is required today.",
  lesson2:
    "Signed accumulation and the Fundamental Theorem: why area and a running integral differ. Public Calculus AB lesson two, open with no account required.",
  exam: "May 2027 AP Calculus AB sitting in planning language: 42 multiple-choice, six free-response, four parts, and calculator rules. Not a score predictor here.",
  faq: "Honest Calculus AB answers from Anannt Study: two open lessons, no score predictions, the May 2027 format, and when a Burjuman mentor is actually useful.",
  privacy:
    "How this Calculus AB studio stores progress in your browser, keeps marking keys on the server, and sends you to the study gate for a parent WhatsApp note.",
  about:
    "How Anannt teaches Calculus AB: one idea, a short check, and what to do next. Two lessons are public. The rest of the unit map is still being written.",
  faculty:
    "Named Anannt reviewers for Calculus AB lessons and a two-person approval rule. Independent of College Board, with no claim of official exam affiliation.",
  onboarding:
    "A short Calculus AB placement check for May 2027. Mark what you have not learned yet. No account. After you submit, we send you to the study desk gate.",
} as const;
