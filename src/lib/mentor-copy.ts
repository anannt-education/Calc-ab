import type { ErrorClass } from "./types";

export const ERROR_CLASS_MENTOR: Record<ErrorClass, { name: string; next: string }> = {
  concept: {
    name: "the idea itself is slightly off",
    next: "Read the Concept Lens again, then try a different example — not the same numbers with a new guess.",
  },
  method: {
    name: "a different method fits this structure",
    next: "Name the tool first (limit algebra, chain rule, sign chart, FTC…). Then compute. Method Choice is the faculty note for this.",
  },
  algebra: {
    name: "the calculus setup was close; the algebra slipped",
    next: "Repair the algebra on paper, then return to a fresh calculus item. We will not make you repeat a whole unit for a factoring error.",
  },
  notation: {
    name: "the notation is carrying the wrong meaning",
    next: "Write what each symbol stands for (limit, value, rate, accumulation) in a short sentence, then retry.",
  },
  interpretation: {
    name: "the reading of the graph, table, or units drifted",
    next: "State the units and what a signed number would mean if it were negative. Then look at the representation again.",
  },
  calculator: {
    name: "the calculator step, not the calculus idea, is the likely issue",
    next: "Check radian mode and whether this item even permits a calculator. Train the exam route you will actually use.",
  },
  timing: {
    name: "the reasoning was rushed rather than missing",
    next: "On the next item, write the first sentence of justification before any algebra. Speed comes after that sentence is routine.",
  },
  incomplete_justification: {
    name: "the conclusion is ahead of the reason",
    next: "Add the hypothesis (continuity, matching sides, units). “Because the theorem applies” is the missing line, not a longer calculation.",
  },
};

export function mentorOnSuccess(opts: { confidence: string; context: string }) {
  if (opts.confidence === "low" && opts.context !== "mock") {
    return "Your answer matches the reviewed key. Because you marked low confidence, we will still ask a fresh check before treating this as independent evidence. You showed the procedure; we have not yet seen that you trust it.";
  }
  if (opts.context === "independent") {
    return "That matches. You produced it without a revealed solution — independent evidence for this item family. It does not, by itself, finish the skill.";
  }
  if (opts.context === "lesson") {
    return "That matches. You used the idea with support available. The next bar is a fresh question from a different family, without hints.";
  }
  return "That matches the reviewed solution. Useful evidence for this item — not a claim that the unit is finished.";
}

export function mentorOnMiss(errorClass?: string | null) {
  const key = (errorClass ?? "") as ErrorClass;
  const row = ERROR_CLASS_MENTOR[key];
  if (!row) {
    return "Not this time. That is information, not a verdict on you. Read the short explanation, then try a fresh question from a different family.";
  }
  return `Not this time. Likely mix-up: ${row.name}. ${row.next}`;
}

export function mentorNotLearned() {
  return "Recorded as not yet learned — a placement fact, not a miss. We will start from a short explanation rather than treating this as a careless error.";
}
