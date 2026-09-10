"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PageTitle } from "@/components/AppShell";
import { PracticeItem } from "@/components/PracticeItem";
import { useStudent } from "@/components/StudentProvider";
import { ITEM_BY_ID, LESSON_BY_ID } from "@/lib/content";
import { practiceMix } from "@/lib/recommend";
import { nowISO } from "@/lib/storage";
import type { ErrorClass } from "@/lib/types";

export default function PracticePage() {
  return (
    <Suspense fallback={<p>Loading practice…</p>}>
      <PracticeInner />
    </Suspense>
  );
}

function PracticeInner() {
  const params = useSearchParams();
  const { state, recordAttempt, addMistake, log } = useStudent();
  const mode = params.get("mode") ?? "mix";
  const skill = params.get("skill") ?? undefined;
  const lessonId = params.get("lesson") ?? undefined;
  const mix = useMemo(() => {
    if (mode === "challenge" && lessonId) {
      const lesson = LESSON_BY_ID[lessonId];
      return {
        itemIds: lesson?.independentItemIds ?? [],
        reason:
          "Challenge check: skip the instruction if you can already show the independent items. That does not unlock a mastery label without eligible evidence — it only tells us whether the Concept Lens is still needed.",
      };
    }
    return practiceMix(state, skill);
  }, [mode, lessonId, skill, state]);

  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Practice" title={mode === "challenge" ? "Challenge check" : "Mixed practice"}>
        {mix.reason} Calculator status is recorded. Hint use (from Ask Anannt) marks an attempt
        assisted. After a miss we will name the mix-up and suggest a different example, not the same
        item again.
      </PageTitle>
      <div className="space-y-4">
        {mix.itemIds.map((id) => {
          const item = ITEM_BY_ID[id];
          if (!item) return null;
          return (
            <PracticeItem
              key={id}
              item={item}
              context={mode === "review" ? "review" : mode === "challenge" ? "independent" : "practice"}
              onSubmit={(p) => {
                const attempt = recordAttempt({
                  itemId: item.id,
                  answer: p.answer,
                  correct: p.result.correct,
                  assisted: p.assisted,
                  hintLevel: 0,
                  confidence: p.confidence,
                  calculatorUsed: p.calculatorUsed,
                  scratchwork: p.scratchwork,
                  errorClass: (p.result.errorClass as ErrorClass) ?? undefined,
                  context: mode === "review" ? "review" : mode === "challenge" ? "independent" : "practice",
                });
                if (p.result.correct === false) {
                  addMistake({
                    attemptId: attempt.id,
                    itemId: item.id,
                    skillId: item.skillId,
                    errorClass: (p.result.errorClass as ErrorClass) ?? "concept",
                    explanation: p.result.explanation ?? "",
                    correction: "Short explanation + different example, then a fresh item.",
                    retryAfter: new Date(Date.parse(nowISO(state)) + 3 * 86400000).toISOString(),
                    resolved: false,
                  });
                }
                if (mode === "review") log("review_completed", { itemId: item.id });
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
