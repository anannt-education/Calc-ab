/** Shared gate contract with study.anannt.ae. Do not build the /start form here. */

export const STUDY_ORIGIN = "https://study.anannt.ae";
export const BASE_PATH = "/calculus-ab";
export const SUBJECT_SLUG = "calculus-ab";

export const PUBLIC_LESSON_IDS = ["u1-limit-vs-value", "u6-ftc"] as const;
export type PublicLessonId = (typeof PUBLIC_LESSON_IDS)[number];

export const PUBLIC_LESSON_META: Record<
  PublicLessonId,
  { unit: string; title: string; href: string }
> = {
  "u1-limit-vs-value": {
    unit: "u1",
    title: "Limit vs function value",
    href: "/lesson/u1-limit-vs-value",
  },
  "u6-ftc": {
    unit: "u6",
    title: "FTC accumulation",
    href: "/lesson/u6-ftc",
  },
};

/** Units that contain a public lesson. Other units stay unpublished without a session. */
export const PUBLIC_UNIT_IDS = ["u1", "u6"] as const;

/**
 * Cookie the study /start gate should set on study.anannt.ae after verify.
 * Either name unlocks mocks, FRQ, and remaining units.
 */
export const SESSION_COOKIE_NAMES = ["anannt_study_session", "anannt_session"] as const;

export function isPublicLessonId(id: string): id is PublicLessonId {
  return (PUBLIC_LESSON_IDS as readonly string[]).includes(id);
}

export function isPublicUnitId(id: string): boolean {
  return (PUBLIC_UNIT_IDS as readonly string[]).includes(id);
}

export function studyStartUrl(opts?: { unit?: string; intent?: string }): string {
  const params = new URLSearchParams({ subject: SUBJECT_SLUG });
  if (opts?.unit) params.set("unit", opts.unit);
  if (opts?.intent) params.set("intent", opts.intent);
  return `${STUDY_ORIGIN}/start?${params.toString()}`;
}

export function unitFromPathname(pathname: string): string | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  const lesson = path.match(/^\/lesson\/([^/]+)$/);
  if (lesson) {
    const id = lesson[1];
    if (id.startsWith("u") && id.includes("-")) return id.slice(0, id.indexOf("-"));
    if (id.startsWith("f-")) return "foundation";
    return id;
  }
  const course = path.match(/^\/course\/([^/]+)$/);
  if (course) return course[1];
  return undefined;
}

export function hasSessionCookieValue(
  getCookie: (name: string) => string | undefined | null
): boolean {
  return SESSION_COOKIE_NAMES.some((name) => {
    const v = getCookie(name);
    return Boolean(v && v.length > 0);
  });
}

/** Paths that stay public without an account. Everything else is session-gated. */
export function isPublicPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return true;
  if (
    path === "/exam/2027" ||
    path === "/faq" ||
    path === "/privacy" ||
    path === "/about" ||
    path === "/faculty" ||
    path === "/onboarding" ||
    path === "/course"
  ) {
    return true;
  }
  const lesson = path.match(/^\/lesson\/([^/]+)$/);
  if (lesson) return isPublicLessonId(lesson[1]);
  return false;
}
