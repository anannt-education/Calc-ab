import { BASE_PATH, SITE_URL, buildMetadata } from "./site";
import { LESSON_1_ID, LESSON_2_ID } from "./gate";

/** Unique 150–160 character descriptions for public URLs. */
export const PUBLIC_DESCRIPTIONS = {
  home: "Two free Calculus AB lessons: why a limit is not a function value, then FTC accumulation. No account. Anannt Education, Burjuman, Dubai. May 2027 sitting.",
  lesson1:
    "A limit is nearby behaviour, not the filled-in point. First public Calculus AB lesson from Anannt Education in Dubai. No account. For the May 2027 sitting.",
  lesson2:
    "See signed accumulation and why A(x) can fall when f is negative. Second public Calculus AB lesson on the FTC. Anannt Education, Dubai. No account needed.",
  exam: "May 2027 Calculus AB format: 42 multiple-choice, six free-response, four parts, calculator rules. Anannt commentary from Dubai — not a College Board page.",
  faq: "Honest Calculus AB answers: no score predictions, two public lessons, self-administered mocks, May 2027 format. Written by Anannt Education in Dubai, UAE.",
  privacy:
    "Anannt Calculus AB privacy note: progress stays in your browser. No account wall on the two public lessons. Office 105, Burjuman Metro Exit 2, Dubai, UAE.",
  about:
    "How Anannt Education teaches Calculus AB: one idea, a short check, then what to do next. Self-study supplement for May 2027. Desk in Burjuman, Dubai, UAE.",
  faculty:
    "Who writes Anannt Calculus AB lessons and how two-person faculty review works. Independent of College Board. Self-study studio in Burjuman, Dubai, UAE.",
  course:
    "Two public Calculus AB lessons are open. The eight-unit map is still being written. Anannt Education, Dubai. No account needed for lessons one and two.",
  onboarding:
    "Start a short Calculus AB placement check. It chooses where to begin; it does not certify the course. After you submit, we ask a parent WhatsApp in Dubai.",
  unit1:
    "Unit 1 limits: the public lesson on limit versus function value is open. Later continuity work waits until after two lessons. Anannt Education, Dubai.",
  unit6:
    "Unit 6 accumulation: the public FTC lesson is open without an account. Later integral work waits until after two lessons. Anannt Education, Dubai, UAE.",
} as const;

export const PUBLIC_SITEMAP_PATHS = [
  "/",
  "/exam/2027",
  `/lesson/${LESSON_1_ID}`,
  `/lesson/${LESSON_2_ID}`,
  "/faq",
  "/privacy",
  "/about",
  "/faculty",
  "/course",
  "/onboarding",
  "/course/u1",
  "/course/u6",
] as const;

export function publicSitemapUrls() {
  const now = new Date();
  return PUBLIC_SITEMAP_PATHS.map((path, i) => ({
    url: path === "/" ? `${SITE_URL}${BASE_PATH}` : `${SITE_URL}${BASE_PATH}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: i === 0 ? 1 : path.startsWith("/lesson") ? 0.9 : 0.7,
  }));
}

export function gatedMetadata(title: string, description: string, path: string) {
  return buildMetadata({ title, description, path, noIndex: true });
}
