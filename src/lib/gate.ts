/** Gate lives on the study shell. Copy field names from study — do not invent a second form. */

export const SITE_ORIGIN = "https://study.anannt.ae";
export const BASE_PATH = "/calculus-ab";
export const SUBJECT_SLUG = "calculus-ab";

export const LESSON_1_ID = "u1-limit-vs-value";
export const LESSON_2_ID = "u6-ftc";
export const PUBLIC_LESSON_IDS = [LESSON_1_ID, LESSON_2_ID] as const;

export type PublicLessonId = (typeof PUBLIC_LESSON_IDS)[number];

export function isPublicLessonId(id: string): boolean {
  return (PUBLIC_LESSON_IDS as readonly string[]).includes(id);
}

/**
 * Session cookie names the study `/start` gate may set on study.anannt.ae.
 * Path=/ so this mount can read them. Do not mint a second login here.
 */
export const SESSION_COOKIE_NAMES = [
  "anannt_study_session",
  "anannt_session",
  "study_otp_verified",
] as const;

/**
 * Field names on study `/start` (source: study catalog / CURSOR_EXECUTE).
 * This repo only redirects with `subject` + `unit`.
 */
export const GATE_FIELDS = {
  firstName: "firstName",
  email: "email",
  parentWhatsApp: "parentWhatsApp",
  role: "role",
  ageBand: "ageBand",
  sitting: "sitting",
  schoolType: "schoolType",
  intent: "intent",
  consent: "consent",
} as const;

export const GATE_ROLE = ["parent", "student"] as const;
export const GATE_AGE_BAND = ["under 13", "13–17", "18+"] as const;
export const GATE_SCHOOL_TYPE = ["American/AP", "IB", "A-Level", "CBSE/Indian", "Other"] as const;
export const GATE_INTENT = ["doubts", "mocks", "group", "1:1", "keep going alone"] as const;
export const GATE_SITTING = "May 2027";

export function stripBasePath(pathname: string): string {
  if (pathname === BASE_PATH) return "/";
  if (pathname.startsWith(`${BASE_PATH}/`)) {
    const rest = pathname.slice(BASE_PATH.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

export function appPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === BASE_PATH || p.startsWith(`${BASE_PATH}/`)) return p;
  return `${BASE_PATH}${p}`;
}

export function gateStartUrl(unit = ""): string {
  const u = new URL("/start", SITE_ORIGIN);
  u.searchParams.set("subject", SUBJECT_SLUG);
  u.searchParams.set("unit", unit);
  return u.toString();
}

export function whatsappHelpUrl(sku: string): string {
  const text = `Hi Anannt Burjuman — I started ${SUBJECT_SLUG} on study.anannt.ae and want help with ${sku}`;
  return `https://wa.me/971585853551?text=${encodeURIComponent(text)}`;
}

export function hasSessionCookie(getCookie: (name: string) => string | undefined): boolean {
  return SESSION_COOKIE_NAMES.some((name) => {
    const value = getCookie(name);
    return Boolean(value && value !== "0" && value !== "false");
  });
}

export function unitFromPath(pathname: string): string {
  const path = stripBasePath(pathname);
  const lessonMatch = path.match(/^\/lesson\/([^/]+)/);
  if (lessonMatch) {
    const id = lessonMatch[1];
    if (id.startsWith("u") && id.includes("-")) return id.split("-")[0];
    if (id.startsWith("f-")) return "foundation";
    return id;
  }
  if (path.startsWith("/course/")) return path.split("/")[2] ?? "";
  if (path.startsWith("/practice")) return "practice";
  if (path.startsWith("/frq")) return "frq";
  if (path.startsWith("/mock")) return "mock";
  if (path.startsWith("/onboarding")) return "diagnostic";
  if (path.startsWith("/home")) return "home";
  return "";
}

const PUBLIC_EXACT = new Set([
  "/",
  "/exam/2027",
  "/faq",
  "/privacy",
  "/about",
  "/faculty",
  "/onboarding",
  "/course",
  `/lesson/${LESSON_1_ID}`,
  `/lesson/${LESSON_2_ID}`,
]);

export function isPublicPath(pathname: string): boolean {
  const raw = stripBasePath(pathname).replace(/\/+$/, "") || "/";
  if (PUBLIC_EXACT.has(raw)) return true;
  if (raw.startsWith("/api/")) return true;
  if (raw.startsWith("/_next")) return true;
  if (raw.startsWith("/opengraph-image")) return true;
  if (raw.startsWith("/twitter-image")) return true;
  if (raw.startsWith("/apple-icon")) return true;
  if (raw === "/robots.txt" || raw === "/sitemap.xml") return true;
  if (/\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/i.test(raw)) return true;
  return false;
}

export function goToGate(unit = ""): void {
  if (typeof window === "undefined") return;
  window.location.assign(gateStartUrl(unit));
}
