import type { AssessmentBlueprint, CourseVersion, ExamPartConfig } from "./types";

export const POLICY_VERSION = "anannt-ab-pilot-2027.1";
export const COURSE_VERSION_ID = "ab-2027-v1";

export const EXAM_PARTS: ExamPartConfig[] = [
  {
    id: "IA",
    label: "Section I, Part A",
    section: "I",
    kind: "mcq",
    questions: 29,
    minutes: 62,
    calculator: "not_permitted",
  },
  {
    id: "IB",
    label: "Section I, Part B",
    section: "I",
    kind: "mcq",
    questions: 13,
    minutes: 38,
    calculator: "required",
  },
  {
    id: "IIA",
    label: "Section II, Part A",
    section: "II",
    kind: "frq",
    questions: 2,
    minutes: 30,
    calculator: "required",
  },
  {
    id: "IIB",
    label: "Section II, Part B",
    section: "II",
    kind: "frq",
    questions: 4,
    minutes: 60,
    calculator: "not_permitted",
  },
];

export const EXAM_BLUEPRINT: AssessmentBlueprint = {
  id: "ab-2027-hybrid-digital",
  courseVersionId: COURSE_VERSION_ID,
  effectiveYear: 2027,
  parts: EXAM_PARTS,
  mcqTotal: 42,
  frqTotal: 6,
  workingMinutes: 190,
  notes:
    "May 2027 hybrid digital AP Calculus AB. Do not reuse a 2026 45-question template. Anannt practice composite is 50 × MCQ_correct/42 + 50 × FRQ_points/FRQ_available. This is not an AP score.",
};

export const COURSE: CourseVersion = {
  id: COURSE_VERSION_ID,
  subject: "AP Calculus AB",
  frameworkYear: 2027,
  effectiveDate: "2026-09-10",
  sources: [
    {
      title: "AP Calculus AB exam specification (College Board)",
      url: "https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam",
      retrieved: "2026-09-10",
      notes: "Hybrid digital: 42 MCQ in 100 min + 6 FRQ in 90 min.",
    },
    {
      title: "AP Calculus AB/BC CED clarifications (Fall 2026)",
      url: "https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-bc-course-and-exam-description-clarifications.pdf",
      retrieved: "2026-09-10",
      notes: "MCQ count/timing and extrema/DE clarifications.",
    },
    {
      title: "AP Calculus AB course framework",
      url: "https://apcentral.collegeboard.org/courses/ap-calculus-ab",
      retrieved: "2026-09-10",
      notes: "Current unit MCQ weights used in the course map.",
    },
  ],
  approval: {
    authorId: "author-anannt-calc",
    authorName: "Meera Krishnan",
    reviewerId: "approver-anannt-academic",
    reviewerName: "Arjun Deshpande",
    approvedAt: "2026-09-10",
    state: "published",
    cannotSelfPublish: true,
  },
  disclaimer:
    "Anannt Education is not affiliated with or endorsed by College Board. Practice composites are internal percentages, not official AP scores or predictions.",
};

export const DEFAULT_EVIDENCE = {
  minIndependentAttempts: 2,
  minSessions: 1,
  minFamilies: 2,
  recentAccuracy: 0.8,
  requireTransfer: true,
  delayedDays: 7,
  notes:
    "Pilot rule: assisted attempts and same-item-family repeats cannot independently satisfy mastery. Short-skill slice for this product uses 2 independent families rather than the full 8-opportunity launch rule.",
};

export const SHORT_DRILL_COUNTS: Record<ExamPartConfig["id"], { questions: number; minutes: number }> =
  {
    IA: { questions: 4, minutes: 8 },
    IB: { questions: 2, minutes: 6 },
    IIA: { questions: 1, minutes: 12 },
    IIB: { questions: 1, minutes: 12 },
  };

export function practiceComposite(mcqCorrect: number, frqPoints: number, frqAvailable: number): number {
  const mcq = 50 * (mcqCorrect / 42);
  const frq = frqAvailable > 0 ? 50 * (frqPoints / frqAvailable) : 0;
  return Math.round((mcq + frq) * 10) / 10;
}
