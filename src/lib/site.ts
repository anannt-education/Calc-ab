import type { Metadata } from "next";

/** Canonical host for metadataBase, sitemap, OG, and JSON-LD. Not a subject subdomain. */
export const SITE_URL = "https://study.anannt.ae";
export const BASE_PATH = "/calculus-ab";
export const SITE_NAME = "Anannt Education";
export const COURSE_NAME = "Calculus AB";
export const TITLE_SUFFIX = "Anannt Study";
export const SUBJECT_SLUG = "calculus-ab";

export const NAP_LINE =
  "Anannt Education · Office 105, Bank Street Building, Burjuman Metro Exit 2, Dubai · +971 58585 3551 · wecare@anannt.ae";

export const COLLEGE_BOARD_LINE =
  "AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this website.";

export const STUDIO_LINE =
  "This studio is a self-study supplement. It does not predict an official AP score and is not Bluebook or AP Classroom.";

export const TRUST_LINE = COLLEGE_BOARD_LINE;

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/" || p === "") return `${SITE_URL}${BASE_PATH}`;
  if (p.startsWith(BASE_PATH)) return `${SITE_URL}${p}`;
  return `${SITE_URL}${BASE_PATH}${p}`;
}

/** Prefix browser fetch paths so they stay under basePath. */
export function withBasePath(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.startsWith(BASE_PATH)) return p;
  return `${BASE_PATH}${p}`;
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
    "AP Calculus AB 2027",
    "Anannt Education",
    "limits",
    "Fundamental Theorem of Calculus",
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
