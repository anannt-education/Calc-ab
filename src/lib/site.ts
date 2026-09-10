import type { Metadata } from "next";

/** Canonical site origin used by metadataBase, sitemap, and JSON-LD. */
export const SITE_URL = "https://apcalc.anannt.education";
export const SITE_NAME = "Anannt Education";
export const COURSE_NAME = "Anannt AP Calculus AB";
export const TITLE_SUFFIX = "Anannt AP Calculus AB";

export const TRUST_LINE =
  "Anannt Education — independent AP Calculus AB preparation. Not affiliated with or endorsed by College Board.";

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
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
    "FRQ practice",
    "AP Calculus diagnostic",
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
