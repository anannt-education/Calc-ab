import type { StudentState, StudyPlan, StudyPlanTask } from "./types";
import { LESSONS } from "./content/lessons";
import { SKILL_BY_ID } from "./content/skills";
import { ITEM_BY_ID } from "./content/items";

function reviewDueSkills(state: StudentState) {
  return Object.values(state.mastery).filter((m) => m.state === "review_due");
}

function nextLesson(state: StudentState) {
  const topic = state.profile?.schoolTopic;
  const ordered = [...LESSONS];
  if (topic && topic !== "review" && topic !== "foundation") {
    ordered.sort((a, b) => {
      const aMatch = a.unitId === topic || a.unitId === "foundation" ? 0 : 1;
      const bMatch = b.unitId === topic || b.unitId === "foundation" ? 0 : 1;
      return aMatch - bMatch;
    });
  }
  return ordered.find((l) => {
    const p = state.lessonProgress[l.id];
    if (!p) return true;
    return (
      p.completion === "not_opened" ||
      p.completion === "opened" ||
      p.completion === "studied" ||
      p.completion === "practised"
    );
  });
}

export function buildStudyPlan(state: StudentState): StudyPlan {
  const due = reviewDueSkills(state);
  const mix = { current: 50, review: 30, transfer: 20 };

  if (!state.profile) {
    return {
      generatedAt: new Date().toISOString(),
      policyVersion: "anannt-ab-pilot-2027.1",
      next: {
        id: "onboarding",
        kind: "diagnostic",
        title: "Start onboarding",
        reason:
          "Before I pick a first lesson, I need the 2027 exam year, where you are in school calculus, and a short diagnostic. That way the first task matches what you actually know — including topics you have not met yet.",
        href: "/onboarding",
        minutes: 8,
      },
      dueReview: [],
      nearestMilestone: {
        title: "Placement",
        detail: "Finish the prerequisite diagnostic. It chooses a starting path; it cannot certify the whole course.",
      },
      mix,
    };
  }

  if (!state.profile.diagnosticCompleted) {
    return {
      generatedAt: new Date().toISOString(),
      policyVersion: "anannt-ab-pilot-2027.1",
      next: {
        id: "diagnostic",
        kind: "diagnostic",
        title: "Prerequisite diagnostic",
        reason:
          "Why this now: a short placement set. Mark “I have not learned this yet” when that is the truth — that is a starting point, not a miss. The diagnostic cannot certify full-course mastery.",
        href: "/onboarding?step=diagnostic",
        minutes: 20,
      },
      dueReview: [],
      nearestMilestone: {
        title: "First lesson",
        detail: "After the diagnostic, open the first recommended lesson. Beginners are expected; we will not treat unseen topics as careless errors.",
      },
      mix,
    };
  }

  const dueTasks: StudyPlanTask[] = due.map((m) => ({
    id: `review-${m.skillId}`,
    kind: "review" as const,
    title: `Review: ${SKILL_BY_ID[m.skillId]?.title ?? m.skillId}`,
    reason: m.reason,
    href: `/practice?mode=review&skill=${m.skillId}`,
    minutes: 12,
    skillId: m.skillId,
  }));

  if (due.length > 0) {
    return {
      generatedAt: new Date().toISOString(),
      policyVersion: "anannt-ab-pilot-2027.1",
      next: dueTasks[0],
      dueReview: dueTasks,
      nearestMilestone: {
        title: "Clear review due",
        detail:
          "You demonstrated this before; a later check did not hold. That history stays. A fresh item — not the same family on repeat — is what can return the skill to retained.",
      },
      mix: { current: 20, review: 60, transfer: 20 },
    };
  }

  const lesson = nextLesson(state);
  if (lesson) {
    const missingPrereq = lesson.prerequisites.find((id) => {
      const m = state.mastery[id];
      return !m || m.state === "unknown";
    });
    const prereqNote = missingPrereq
      ? ` I would usually check ${SKILL_BY_ID[missingPrereq]?.title ?? missingPrereq} first — we have insufficient evidence there. You may continue; a short bridge is safer.`
      : "";
    const progress = state.lessonProgress[lesson.id];
    const independentlyOpen =
      progress?.completion === "practised"
        ? " You have already practised with support. What this unlocks next is an independent check on a fresh item family."
        : " Completing the Concept Lens unlocks scaffolded practice, then a fresh independent question.";
    return {
      generatedAt: new Date().toISOString(),
      policyVersion: "anannt-ab-pilot-2027.1",
      next: {
        id: lesson.id,
        kind: "lesson",
        title: lesson.title,
        reason: `Why this, why now: it matches your school topic (${state.profile.schoolTopic}) and it is the next idea that is still only exposure, not independent work.${prereqNote}${independentlyOpen} Reading the page alone will not move mastery.`,
        href: `/lesson/${lesson.id}`,
        minutes: lesson.estimatedMinutes,
        lessonId: lesson.id,
        skillId: lesson.skillIds[0],
      },
      dueReview: [],
      nearestMilestone: {
        title: "Independent demonstration",
        detail: `Complete the independent check in “${lesson.title}”. Assisted attempts help you learn; they cannot by themselves satisfy mastery.`,
      },
      mix,
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    policyVersion: "anannt-ab-pilot-2027.1",
    next: {
      id: "frq-studio",
      kind: "frq",
      title: "Handwritten FRQ in the studio",
        reason:
          "The lesson loop in this slice is complete. Why FRQ now: the missing evidence dimension is written reasoning under a point-level rubric — what the exam will actually ask you to show.",
      href: "/frq",
      minutes: 25,
    },
    dueReview: [],
    nearestMilestone: {
      title: "2027 mock rehearsal",
      detail: "After one reviewed FRQ, sit a labelled short drill or the full 2027 four-part structure.",
    },
    mix: { current: 20, review: 30, transfer: 50 },
  };
}

export function practiceMix(state: StudentState, skillId?: string) {
  const current = ITEMS_FOR("current", state, skillId);
  const review = ITEMS_FOR("review", state, skillId);
  const transfer = ITEMS_FOR("transfer", state, skillId);
  const mix: string[] = [];
  const targets = [
    ...current.slice(0, 3),
    ...review.slice(0, 2),
    ...transfer.slice(0, 1),
  ];
  for (const id of targets) if (!mix.includes(id)) mix.push(id);
  if (mix.length === 0) {
    mix.push(
      ...Object.values(ITEM_BY_ID)
        .filter((i) => !i.protectedMock && (!skillId || i.skillId === skillId))
        .slice(0, 3)
        .map((i) => i.id)
    );
  }
  return {
    itemIds: mix.slice(0, 6),
    reason:
      "Why this mix: mostly the skill you are learning, with a smaller share of due review and one mixed transfer item so the next paper does not look like yesterday’s homework. Protected mock questions stay out of this pool. Some pools are thin in this slice, so the 50/30/20 target is adapted rather than forced.",
  };
}

function ITEMS_FOR(kind: "current" | "review" | "transfer", state: StudentState, skillId?: string) {
  const all = Object.values(ITEM_BY_ID).filter((i) => !i.protectedMock && i.status === "published");
  if (kind === "transfer") return all.filter((i) => i.pool === "transfer").map((i) => i.id);
  if (kind === "review") {
    const due = Object.values(state.mastery)
      .filter((m) => m.state === "review_due")
      .map((m) => m.skillId);
    return all.filter((i) => due.includes(i.skillId) && i.pool === "independent").map((i) => i.id);
  }
  return all
    .filter((i) => (skillId ? i.skillId === skillId : true) && (i.pool === "lesson" || i.pool === "independent"))
    .map((i) => i.id);
}
