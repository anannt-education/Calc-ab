import { BASE_PATH, SITE_URL, SUBJECT_SLUG } from "./site";

export const LESSON_1_ID = "u1-limit-vs-value";
export const LESSON_2_ID = "u6-ftc";
export const PUBLIC_LESSON_IDS = [LESSON_1_ID, LESSON_2_ID] as const;
export type PublicLessonId = (typeof PUBLIC_LESSON_IDS)[number];

/** Wave D featured gated pair. Not a third public lesson. Not a published Units 3–8 course. */
export const LESSON_3_ID = "u3-chain";
export const LESSON_4_ID = "u4-related-rates";
export const GATED_LESSON_IDS = [LESSON_3_ID, LESSON_4_ID] as const;
export type GatedLessonId = (typeof GATED_LESSON_IDS)[number];

export const GATED_LESSON_META = [
  {
    id: LESSON_3_ID,
    unit: "u3",
    kicker: "Lesson 3 · after a short form",
    title: "Chain rule",
    blurb:
      "Annotate the inner function, differentiate the outer, then multiply by the inner derivative. The extra factor is the next sentence after accumulation with a nested limit.",
  },
  {
    id: LESSON_4_ID,
    unit: "u4",
    kicker: "Lesson 4 · after a short form",
    title: "Related rates",
    blurb:
      "Write the relating equation, differentiate with respect to time, then substitute. Chain rule in a situation — handwriting for a marked mock.",
  },
] as const;

export const GATED_HONESTY =
  "Two public lessons. A third and fourth wait behind a short form. The eight-unit map is still being written.";

/** Cookie study sets on study.anannt.ae after OTP verify. Subject apps only check it. */
export const SESSION_COOKIE = "anannt_study_session";

/**
 * Gate fields — copied from the study /start contract. Do not redefine.
 * This app does not own the gate form UI; after two lessons we send students to study /start.
 *
 * - first name
 * - email (OTP stub; any 6-digit code in dev)
 * - parent WhatsApp REQUIRED
 * - role: parent | student
 * - age band: under 13 | 13–17 | 18+
 * - sitting: May 2027
 * - school type: American/AP | IB | A-Level | CBSE/Indian | Other
 * - intent chip: doubts | mocks | group | 1:1 | keep going alone
 * - consent
 * Under-13: parent completes. No self-serve student account.
 */
export const GATE_FIELDS = {
  firstName: "first name",
  email: "email",
  parentWhatsApp: "parent WhatsApp",
  role: ["parent", "student"] as const,
  ageBand: ["under 13", "13–17", "18+"] as const,
  sitting: "May 2027",
  schoolType: ["American/AP", "IB", "A-Level", "CBSE/Indian", "Other"] as const,
  intent: ["doubts", "mocks", "group", "1:1", "keep going alone"] as const,
  consent: true,
} as const;

export type GateIntent = (typeof GATE_FIELDS.intent)[number];

export function isPublicLessonId(id: string): id is PublicLessonId {
  return (PUBLIC_LESSON_IDS as readonly string[]).includes(id);
}

export function isGatedLessonId(id: string): id is GatedLessonId {
  return (GATED_LESSON_IDS as readonly string[]).includes(id);
}

export function gatedLessonPaths() {
  return GATED_LESSON_IDS.map((id) => `/lesson/${id}`);
}

const PUBLIC_EXACT = new Set([
  "/",
  "/exam/2027",
  "/faq",
  "/privacy",
  "/about",
  "/faculty",
  `/lesson/${LESSON_1_ID}`,
  `/lesson/${LESSON_2_ID}`,
  "/onboarding",
  "/course",
  "/course/u1",
  "/course/u6",
]);

export function normalizeAppPath(pathname: string) {
  let p = pathname || "/";
  if (p.startsWith(BASE_PATH)) {
    p = p.slice(BASE_PATH.length) || "/";
  }
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

export function isPublicPath(pathname: string) {
  const p = normalizeAppPath(pathname);
  if (PUBLIC_EXACT.has(p)) return true;
  if (p.startsWith("/api/")) return true;
  if (p === "/api") return true;
  if (p === "/robots.txt" || p === "/sitemap.xml") return true;
  if (p === "/opengraph-image" || p === "/twitter-image" || p === "/icon" || p === "/apple-icon") {
    return true;
  }
  return false;
}

export function unitFromPath(pathname: string): string | undefined {
  const p = normalizeAppPath(pathname);
  const lesson = p.match(/^\/lesson\/([^/]+)/);
  if (lesson?.[1]) {
    const id = lesson[1];
    if (id.startsWith("u") && id.includes("-")) return id.slice(0, id.indexOf("-"));
    if (id.startsWith("f-")) return "foundation";
  }
  const course = p.match(/^\/course\/([^/]+)/);
  if (course?.[1]) return course[1];
  if (p.startsWith("/frq")) return "frq";
  if (p.startsWith("/mock")) return "mock";
  if (p.startsWith("/practice")) return "practice";
  return undefined;
}

export function studyStartUrl(opts?: { unit?: string; intent?: string }) {
  const u = new URL(`${SITE_URL}/start`);
  u.searchParams.set("subject", SUBJECT_SLUG);
  if (opts?.unit) u.searchParams.set("unit", opts.unit);
  if (opts?.intent) u.searchParams.set("intent", opts.intent);
  return u.toString();
}

export function whatsappHelpUrl(sku: GateIntent | string) {
  const text = `Hi Anannt Burjuman — I started ${SUBJECT_SLUG} on study.anannt.ae and want help with ${sku}`;
  return `https://wa.me/971585853551?text=${encodeURIComponent(text)}`;
}

export function hasStudySessionCookie(cookieHeader: string | null | undefined) {
  if (!cookieHeader) return false;
  return cookieHeader.split(";").some((part) => {
    const [name, value] = part.trim().split("=");
    return name === SESSION_COOKIE && Boolean(value) && value !== "0";
  });
}
