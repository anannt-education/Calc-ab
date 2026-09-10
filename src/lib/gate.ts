/** Study-island gate. Field names match study.anannt.ae/start — do not invent a second schema. */

export const SUBJECT_SLUG = "calculus-ab";
export const STUDY_ORIGIN = "https://study.anannt.ae";
export const BASE_PATH = "/calculus-ab";

/** Cookie the study OTP sets on study.anannt.ae. Same-origin when this app is mounted there. */
export const SESSION_COOKIE = "anannt_study_session";

export const PUBLIC_LESSON_1 = "u1-limit-vs-value";
export const PUBLIC_LESSON_2 = "u6-ftc";

export const PUBLIC_LESSON_IDS = [PUBLIC_LESSON_1, PUBLIC_LESSON_2] as const;

export type PublicLessonId = (typeof PUBLIC_LESSON_IDS)[number];

export function isPublicLessonId(id: string): id is PublicLessonId {
  return (PUBLIC_LESSON_IDS as readonly string[]).includes(id);
}

export function unitFromLessonId(id: string): string {
  if (id.startsWith("f-")) return "foundation";
  const prefix = id.split("-")[0];
  return prefix || SUBJECT_SLUG;
}

export function unitFromPathname(pathname: string): string {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/lesson/")) {
    const id = path.slice("/lesson/".length).split("/")[0] ?? "";
    return unitFromLessonId(id);
  }
  if (path.startsWith("/practice")) return "practice";
  if (path.startsWith("/frq")) return "frq";
  if (path.startsWith("/mock")) return "mock";
  if (path.startsWith("/mentor")) return "mentor";
  if (path.startsWith("/progress")) return "progress";
  if (path.startsWith("/onboarding")) return "diagnostic";
  if (path.startsWith("/exam")) return "exam";
  return "u1";
}

/** `/start?subject=calculus-ab&unit=` — unit may be empty. */
export function studyGateUrl(unit = ""): string {
  const url = new URL("/start", STUDY_ORIGIN);
  url.searchParams.set("subject", SUBJECT_SLUG);
  url.searchParams.set("unit", unit);
  return url.toString();
}

export function whatsappHelpUrl(sku: string): string {
  const text = `Hi Anannt Burjuman — I started ${SUBJECT_SLUG} on study.anannt.ae and want help with ${sku}`;
  return `https://wa.me/971585853551?text=${encodeURIComponent(text)}`;
}

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
