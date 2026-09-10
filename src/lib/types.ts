export type ApprovalState =
  | "draft"
  | "in_review"
  | "approved"
  | "published"
  | "retired";

export type AbBcScope = "AB" | "BC-optional";

export type LessonCompletion =
  | "not_opened"
  | "opened"
  | "studied"
  | "practised"
  | "independently_demonstrated"
  | "retained";

export type MasteryState =
  | "unknown"
  | "learning"
  | "developing"
  | "independently_demonstrated"
  | "retained"
  | "review_due";

export type EvidenceDimension =
  | "procedure"
  | "representation"
  | "justification"
  | "communication";

export type ErrorClass =
  | "concept"
  | "method"
  | "algebra"
  | "notation"
  | "interpretation"
  | "calculator"
  | "timing"
  | "incomplete_justification";

export type CalculatorPolicy = "none" | "required" | "optional";

export type RepresentationTag =
  | "graph"
  | "table"
  | "analytic"
  | "verbal"
  | "numeric"
  | "mixed";

export type ItemType =
  | "mcq"
  | "short"
  | "numeric"
  | "explain"
  | "predict"
  | "frq";

export type Confidence = "low" | "medium" | "high";

export type FeedbackLevel = "self-review" | "provisional" | "faculty-reviewed";

export type AnalyticsEventName =
  | "diagnostic_start"
  | "diagnostic_completed"
  | "lesson2_complete"
  | "otp_verified"
  | "report_unlock"
  | "wa_click"
  | "demo_book"
  | "lesson_check_submitted"
  | "hint_used"
  | "independent_check_passed"
  | "review_due"
  | "review_completed"
  | "mock_submitted"
  | "grade_reviewed"
  | "issue_reported";

export interface SourceRecord {
  title: string;
  url: string;
  retrieved: string;
  notes: string;
}

export interface ApprovalRecord {
  authorId: string;
  authorName: string;
  reviewerId?: string;
  reviewerName?: string;
  approvedAt?: string;
  state: ApprovalState;
  cannotSelfPublish: true;
}

export interface CourseVersion {
  id: string;
  subject: "AP Calculus AB";
  frameworkYear: 2027;
  effectiveDate: string;
  sources: SourceRecord[];
  approval: ApprovalRecord;
  disclaimer: string;
}

export interface EvidencePolicy {
  minIndependentAttempts: number;
  minSessions: number;
  minFamilies: number;
  recentAccuracy: number;
  requireTransfer: boolean;
  delayedDays: number;
  notes: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  unitId: string;
  cedTopic: string;
  cedObjective: string;
  cedEK: string;
  prerequisites: string[];
  abBcScope: AbBcScope;
  evidencePolicy: EvidencePolicy;
  remediationLessonId?: string;
}

export interface Unit {
  id: string;
  number: number | "F";
  title: string;
  officialLabel: string;
  mcqWeight: string;
  overview: string;
  signatureActivity: string;
  lessonIds: string[];
  skillIds: string[];
  isFoundation?: boolean;
}

export interface WorkedExample {
  prompt: string;
  reasoning: string[];
  conclusion: string;
}

export interface HintStep {
  level: 1 | 2 | 3 | 4;
  label: string;
  text: string;
}

export interface LessonVersion {
  id: string;
  title: string;
  unitId: string;
  skillIds: string[];
  objective: string;
  prerequisites: string[];
  estimatedMinutes: number;
  conceptLens: string;
  workedExample: WorkedExample;
  nonExample: string;
  errorClinic: string;
  methodChoice?: string;
  activity: {
    id: string;
    title: string;
    kind: "limit-point" | "ftc-accumulation" | "secant" | "chain-annotate" | "related-rates" | "f-from-fp" | "slope-field" | "slice";
    prompt: string;
  };
  hints: HintStep[];
  checkItemIds: string[];
  independentItemIds: string[];
  exitItemIds: string[];
  status: ApprovalState;
  approval: ApprovalRecord;
  accessibilityStatus: string;
  videoOptional: false;
}

export interface Choice {
  id: string;
  text: string;
}

export interface ItemPublic {
  id: string;
  familyId: string;
  skillId: string;
  lessonId?: string;
  stem: string;
  type: ItemType;
  choices?: Choice[];
  calculator: CalculatorPolicy;
  representation: RepresentationTag;
  difficulty: 1 | 2 | 3 | 4 | 5;
  unitId: string;
  protectedMock: boolean;
  allowNotLearned: boolean;
  status: ApprovalState;
  authorId: string;
  reviewerId?: string;
  rights: string;
  pool: "lesson" | "independent" | "diagnostic" | "review" | "mock-drill" | "mock-full" | "transfer";
}

export interface ResponseRule {
  kind: "choice" | "numeric" | "short" | "explain" | "predict";
  correctChoiceId?: string;
  numeric?: { value: number; tolerance: number };
  shortAccept?: string[];
  explanation: string;
  distractorNotes?: Record<string, string>;
  errorClassByChoice?: Record<string, ErrorClass>;
  signMisconceptionChoice?: string;
  missingChainChoice?: string;
}

export interface RubricPoint {
  id: string;
  part: string;
  points: number;
  description: string;
  dependsOn?: string[];
}

export interface FrqTask {
  id: string;
  title: string;
  calculator: CalculatorPolicy;
  stem: string;
  parts: { id: string; label: string; prompt: string }[];
  rubric: RubricPoint[];
  modelSolution: string;
  commonNonCredit: string[];
  status: ApprovalState;
  skillIds: string[];
  totalPoints: number;
}

export interface ExamPartConfig {
  id: "IA" | "IB" | "IIA" | "IIB";
  label: string;
  section: "I" | "II";
  kind: "mcq" | "frq";
  questions: number;
  minutes: number;
  calculator: "not_permitted" | "required";
}

export interface AssessmentBlueprint {
  id: string;
  courseVersionId: string;
  effectiveYear: 2027;
  parts: ExamPartConfig[];
  mcqTotal: 42;
  frqTotal: 6;
  workingMinutes: 190;
  notes: string;
}

export interface Attempt {
  id: string;
  itemId: string;
  itemFamilyId: string;
  skillId: string;
  submittedAt: string;
  answer: string;
  correct: boolean | null;
  assisted: boolean;
  hintLevel: 0 | 1 | 2 | 3 | 4;
  confidence: Confidence;
  calculatorUsed: boolean;
  scratchwork?: string;
  errorClass?: ErrorClass;
  notLearned?: boolean;
  context: "diagnostic" | "lesson" | "independent" | "practice" | "review" | "mock";
  mockSittingId?: string;
  sessionId: string;
  policyVersion: string;
  feedback?: string;
}

export interface MasteryEvidence {
  skillId: string;
  state: MasteryState;
  dimensionCounts: Record<EvidenceDimension, number>;
  independentCorrect: number;
  independentTotal: number;
  families: string[];
  sessions: string[];
  lastIndependentAt?: string;
  lastReviewAt?: string;
  delayedPassed?: boolean;
  reason: string;
  policyVersion: string;
  history: { at: string; state: MasteryState; note: string }[];
}

export interface LessonProgress {
  lessonId: string;
  completion: LessonCompletion;
  openedAt?: string;
  studiedAt?: string;
  practisedAt?: string;
  independentAt?: string;
  retainedAt?: string;
  lastSection?: string;
}

export interface MistakeEntry {
  id: string;
  attemptId: string;
  itemId: string;
  skillId: string;
  errorClass: ErrorClass;
  explanation: string;
  correction: string;
  retryAfter: string;
  resolved: boolean;
}

export interface PageMap {
  pageIndex: number;
  partId: string;
}

export interface FrqSubmission {
  id: string;
  frqId: string;
  studentLabel: string;
  uploadedAt: string;
  pages: { id: string; label: string; kind: "simulated" | "faculty-demo"; svg?: string; note?: string }[];
  pageMap: PageMap[];
  feedbackLevel: FeedbackLevel;
  awarded: Record<string, boolean>;
  reviewerName?: string;
  reviewerNotes?: string;
  appealHistory: { at: string; note: string; previous: Record<string, boolean> }[];
  provisionalScore?: number;
}

export interface MockSitting {
  id: string;
  mode: "short-drill" | "full-2027";
  effectiveYear: 2027;
  startedAt: string;
  status: "not_started" | "in_progress" | "interrupted" | "submitted";
  currentPart: ExamPartConfig["id"];
  partStartedAt: Record<string, string>;
  partEndsAt: Record<string, string>;
  acknowledged: Record<string, string>;
  submittedAt?: string;
  mcqCorrect?: number;
  mcqTotal?: number;
  frqPoints?: number;
  frqAvailable?: number;
  composite?: number;
  selfAdministered: true;
}

export interface OnboardingProfile {
  displayName: string;
  targetExamYear: 2027;
  schoolTopic: string;
  priorExposure: "none" | "precalculus" | "limits-only" | "full-ab-school" | "repeat";
  weeklyMinutes: number;
  calculatorRoute: "desmos-bluebook" | "handheld" | "both";
  targetScore?: string;
  schoolExamDate?: string;
  apExamDate: string;
  timezone: string;
  skippedOptional: boolean;
  diagnosticCompleted: boolean;
  diagnosticStartedAt?: string;
}

export interface StudyPlanTask {
  id: string;
  kind: "lesson" | "review" | "independent" | "diagnostic" | "practice" | "frq" | "mock";
  title: string;
  reason: string;
  href: string;
  minutes: number;
  skillId?: string;
  lessonId?: string;
}

export interface StudyPlan {
  generatedAt: string;
  policyVersion: string;
  next: StudyPlanTask;
  dueReview: StudyPlanTask[];
  nearestMilestone: { title: string; detail: string };
  mix: { current: number; review: number; transfer: number };
}

export interface AnalyticsEvent {
  id: string;
  name: AnalyticsEventName;
  at: string;
  courseVersionId: string;
  policyVersion: string;
  payload: Record<string, string | number | boolean | null>;
}

export interface StudentState {
  version: 1;
  profile: OnboardingProfile | null;
  lessonProgress: Record<string, LessonProgress>;
  attempts: Attempt[];
  mastery: Record<string, MasteryEvidence>;
  mistakes: MistakeEntry[];
  frqSubmissions: FrqSubmission[];
  mockSittings: MockSitting[];
  events: AnalyticsEvent[];
  askLog: { at: string; lessonId?: string; itemId?: string; level: number; text: string }[];
  reportedIssues: { id: string; itemId: string; note: string; at: string }[];
  demoClockOffsetDays: number;
  currentContext: {
    lessonId?: string;
    itemId?: string;
    mockSittingId?: string;
    assessmentMode: "learning" | "mock";
  };
}
