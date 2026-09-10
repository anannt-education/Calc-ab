import type {
  Attempt,
  EvidenceDimension,
  LessonCompletion,
  MasteryEvidence,
  MasteryState,
  StudentState,
} from "./types";
import { POLICY_VERSION } from "./exam-config";
import { SKILL_BY_ID } from "./content/skills";

const PILOT = {
  minIndependentAttempts: 2,
  minSessions: 1,
  minFamilies: 2,
  recentAccuracy: 0.8,
  delayedDays: 7,
};

export function emptyMastery(skillId: string): MasteryEvidence {
  return {
    skillId,
    state: "unknown",
    dimensionCounts: { procedure: 0, representation: 0, justification: 0, communication: 0 },
    independentCorrect: 0,
    independentTotal: 0,
    families: [],
    sessions: [],
    reason: "We have not seen independent work on this skill yet. That is a starting point, not a score of zero.",
    policyVersion: POLICY_VERSION,
    history: [],
  };
}

function dimensionFor(attempt: Attempt): EvidenceDimension {
  if (attempt.context === "independent") return "justification";
  if (attempt.itemId.includes("e1") || attempt.itemId.includes("explain")) return "communication";
  return "procedure";
}

function eligibleIndependent(attempt: Attempt, previous: Attempt[]): boolean {
  if (attempt.assisted) return false;
  if (attempt.hintLevel > 0) return false;
  if (attempt.notLearned) return false;
  if (attempt.context === "mock") return true;
  if (attempt.context !== "independent" && attempt.context !== "review") return false;
  if (attempt.confidence === "low" && attempt.correct) return false;
  const sameFamily = previous.filter(
    (p) => p.itemFamilyId === attempt.itemFamilyId && p.correct && !p.assisted
  );
  if (sameFamily.length > 0 && attempt.context !== "review") {
    // repeats of the same family do not add a new independent family
    return false;
  }
  return true;
}

export function applyAttempt(state: StudentState, attempt: Attempt): StudentState {
  const skill = SKILL_BY_ID[attempt.skillId];
  if (!skill) return state;
  const prev = state.mastery[skill.id] ?? emptyMastery(skill.id);
  const priorAttempts = state.attempts.filter((a) => a.skillId === skill.id);
  const independent = eligibleIndependent(attempt, priorAttempts);
  const families = new Set(prev.families);
  if (independent && attempt.correct) families.add(attempt.itemFamilyId);
  const sessions = new Set(prev.sessions);
  sessions.add(attempt.sessionId);

  const independentTotal = prev.independentTotal + (independent ? 1 : 0);
  const independentCorrect =
    prev.independentCorrect + (independent && attempt.correct ? 1 : 0);

  const dims = { ...prev.dimensionCounts };
  const dim = dimensionFor(attempt);
  if (attempt.correct) dims[dim] += 1;

  let stateName: MasteryState = prev.state;
  let reason = prev.reason;

  if (attempt.notLearned) {
    stateName = prev.state === "unknown" ? "unknown" : prev.state;
    reason = "Unseen topic recorded as not-yet-learned — a placement fact, not a careless error.";
  } else if (independentTotal === 0 && (attempt.correct || attempt.context === "lesson")) {
    stateName = "learning";
    reason = attempt.assisted
      ? "Assisted success counts as learning. It cannot by itself certify independent mastery."
      : "Lesson practice updates exposure. Independent checks on a fresh family are what can later support a mastery label.";
  }

  const accuracy = independentTotal > 0 ? independentCorrect / independentTotal : 0;
  const hasTransfer = dims.justification > 0;

  if (
    independent &&
    independentCorrect >= PILOT.minIndependentAttempts &&
    families.size >= PILOT.minFamilies &&
    sessions.size >= PILOT.minSessions &&
    accuracy >= PILOT.recentAccuracy &&
    hasTransfer
  ) {
    stateName = "independently_demonstrated";
    reason = `Independent demonstration: ${independentCorrect}/${independentTotal} eligible attempts across ${families.size} item families in ${sessions.size} session(s). Assisted and same-family repeats were excluded.`;
  } else if (independentTotal > 0 && accuracy < 0.5 && prev.state !== "unknown") {
    stateName = "developing";
    reason = `Developing: ${independentCorrect}/${independentTotal} eligible independent attempts. Accuracy below the pilot threshold.`;
  } else if (independent && !attempt.correct && prev.state === "retained") {
    stateName = "review_due";
    reason = "Later retrieval failed. State moved to review due; earlier demonstration is kept in history.";
  } else if (independent && attempt.correct && prev.state === "independently_demonstrated") {
    const last = prev.lastIndependentAt ? Date.parse(prev.lastIndependentAt) : 0;
    const now = Date.parse(attempt.submittedAt);
    const days = (now - last) / 86400000;
    if (last && days >= PILOT.delayedDays) {
      stateName = "retained";
      reason = `Delayed check passed after ${Math.round(days)} days.`;
    }
  } else if (independent && attempt.correct && stateName !== "independently_demonstrated") {
    stateName = independentCorrect >= 1 ? "developing" : "learning";
    reason = `Need ${PILOT.minIndependentAttempts} independent successes on ${PILOT.minFamilies} families. Currently ${independentCorrect} eligible successes on ${families.size} families. Low-confidence correct MCQ and assisted work do not count.`;
  }

  if (attempt.confidence === "low" && attempt.correct && !attempt.assisted) {
    reason += " Low-confidence correct response scheduled a fresh check rather than a mastery jump.";
  }

  const evidence: MasteryEvidence = {
    ...prev,
    state: stateName,
    dimensionCounts: dims,
    independentCorrect,
    independentTotal,
    families: [...families],
    sessions: [...sessions],
    lastIndependentAt: independent ? attempt.submittedAt : prev.lastIndependentAt,
    lastReviewAt: attempt.context === "review" ? attempt.submittedAt : prev.lastReviewAt,
    delayedPassed: stateName === "retained" ? true : prev.delayedPassed,
    reason,
    history: [
      ...prev.history,
      { at: attempt.submittedAt, state: stateName, note: reason },
    ].slice(-12),
  };

  return {
    ...state,
    mastery: { ...state.mastery, [skill.id]: evidence },
    attempts: [...state.attempts, attempt],
  };
}

export function lessonCompletionFrom(state: StudentState, lessonId: string, independentSkillIds: string[]): LessonCompletion {
  const lp = state.lessonProgress[lessonId];
  if (!lp) return "not_opened";
  const allIndependent = independentSkillIds.every((id) => {
    const m = state.mastery[id];
    return (
      m &&
      (m.state === "independently_demonstrated" ||
        m.state === "retained" ||
        m.independentCorrect > 0)
    );
  });
  const retained = independentSkillIds.every((id) => state.mastery[id]?.state === "retained");
  if (retained) return "retained";
  if (allIndependent && lp.completion !== "opened" && lp.completion !== "studied") {
    return "independently_demonstrated";
  }
  return lp.completion;
}

export function coverageStats(state: StudentState) {
  const skills = Object.keys(SKILL_BY_ID);
  const openedLessons = Object.values(state.lessonProgress).filter((l) => l.completion !== "not_opened").length;
  const independent = Object.values(state.mastery).filter(
    (m) => m.state === "independently_demonstrated" || m.state === "retained"
  ).length;
  const retained = Object.values(state.mastery).filter((m) => m.state === "retained").length;
  const reviewDue = Object.values(state.mastery).filter((m) => m.state === "review_due").length;
  return {
    skills: skills.length,
    openedLessons,
    independent,
    retained,
    reviewDue,
    insufficient: skills.length - Object.values(state.mastery).filter((m) => m.state !== "unknown").length,
  };
}
