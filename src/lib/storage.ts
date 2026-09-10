import type { AnalyticsEvent, OnboardingProfile, StudentState } from "./types";
import { COURSE, POLICY_VERSION } from "./exam-config";

export const STORAGE_KEY = "anannt-ab-student-v1";
export const DEMO_STUDENT_NAME = "Asha K.";

export function blankState(): StudentState {
  return {
    version: 1,
    profile: null,
    lessonProgress: {},
    attempts: [],
    mastery: {},
    mistakes: [],
    frqSubmissions: [],
    mockSittings: [],
    events: [],
    askLog: [],
    reportedIssues: [],
    demoClockOffsetDays: 0,
    currentContext: { assessmentMode: "learning" },
  };
}

export function loadState(): StudentState {
  if (typeof window === "undefined") return blankState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return blankState();
    const parsed = JSON.parse(raw) as StudentState;
    if (parsed.version !== 1) return blankState();
    return { ...blankState(), ...parsed };
  } catch {
    return blankState();
  }
}

export function saveState(state: StudentState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function nowISO(state?: StudentState) {
  const offset = (state?.demoClockOffsetDays ?? 0) * 86400000;
  return new Date(Date.now() + offset).toISOString();
}

export function makeEvent(
  name: AnalyticsEvent["name"],
  payload: AnalyticsEvent["payload"]
): AnalyticsEvent {
  return {
    id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    at: new Date().toISOString(),
    courseVersionId: COURSE.id,
    policyVersion: POLICY_VERSION,
    payload,
  };
}

export const SCHOOL_TOPICS = [
  { id: "foundation", label: "Still on algebra / precalculus" },
  { id: "u1", label: "Limits and continuity (school)" },
  { id: "u2", label: "Definition of the derivative" },
  { id: "u3", label: "Chain rule / implicit" },
  { id: "u4", label: "Related rates / motion" },
  { id: "u5", label: "Curve sketching / optimisation" },
  { id: "u6", label: "Integrals / FTC" },
  { id: "u7", label: "Differential equations" },
  { id: "u8", label: "Area and volume" },
  { id: "review", label: "School course finished — AP review" },
];

export function defaultProfile(partial?: Partial<OnboardingProfile>): OnboardingProfile {
  return {
    displayName: DEMO_STUDENT_NAME,
    targetExamYear: 2027,
    schoolTopic: "u1",
    priorExposure: "precalculus",
    weeklyMinutes: 180,
    calculatorRoute: "desmos-bluebook",
    apExamDate: "2027-05-04",
    timezone: "Asia/Kolkata",
    skippedOptional: false,
    diagnosticCompleted: false,
    ...partial,
  };
}
