"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PracticeItem } from "@/components/PracticeItem";
import { useStudent } from "@/components/StudentProvider";
import { buttonVariants } from "@/components/ui/button";
import { ITEM_BY_ID, LESSON_BY_ID, SKILL_BY_ID } from "@/lib/content";
import { PUBLIC_LESSON_1, PUBLIC_LESSON_2, studyGateUrl, unitFromLessonId } from "@/lib/gate";
import { nowISO } from "@/lib/storage";
import type { ErrorClass } from "@/lib/types";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function LessonWorkspace({ id }: { id: string }) {
  const lesson = LESSON_BY_ID[id];
  const { state, openLesson, markLesson, recordAttempt, addMistake, log, setState } = useStudent();
  const [phase, setPhase] = useState<"study" | "practice" | "independent">("study");
  const progress = state.lessonProgress[id];

  useEffect(() => {
    openLesson(id);
  }, [id, openLesson]);

  if (!lesson) return null;

  const checkItems = lesson.checkItemIds.map((i) => ITEM_BY_ID[i]).filter(Boolean);
  const independentItems = lesson.independentItemIds.map((i) => ITEM_BY_ID[i]).filter(Boolean);
  const exitItems = lesson.exitItemIds.map((i) => ITEM_BY_ID[i]).filter(Boolean);
  const missing = lesson.prerequisites.filter((p) => !state.mastery[p] || state.mastery[p].state === "unknown");

  return (
    <div className="mt-8">
      {missing.length > 0 && (
        <p className="mb-4 rounded-md border p-3 text-sm">
          Before this idea, I would usually check{" "}
          {missing.map((p) => SKILL_BY_ID[p]?.title ?? p).join(", ")}. You can still open the
          lesson — the risk is building on a gap, not a locked door. A short bridge is safer if
          those skills are still unknown.
        </p>
      )}

      <p className="text-sm text-muted-foreground">
        Completion so far: {(progress?.completion ?? "opened").replaceAll("_", " ")}. Opening this
        page is exposure. Independent demonstration is a later, separate bar.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonVariants({ variant: "outline" })}
          onClick={() => {
            markLesson(id, "studied");
            setPhase("practice");
          }}
        >
          I have studied this idea
        </button>
        <Link href={`/ask?lesson=${id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Explain why — Ask Anannt
        </Link>
      </div>

      {(phase !== "study" || (progress && progress.completion !== "opened")) && (
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-primary">Scaffolded practice</h2>
          <p className="text-sm text-muted-foreground">
            Hints are available. Using them marks the attempt assisted. Assisted success is learning;
            it cannot by itself certify independent mastery.
          </p>
          {checkItems.map((item) => (
            <PracticeItem
              key={item.id}
              item={item}
              context="lesson"
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
                  context: "lesson",
                });
                markLesson(id, "practised");
                log("lesson_check_submitted", { itemId: item.id, lessonId: id });
                if (p.result.correct === false && p.result.errorClass) {
                  addMistake({
                    attemptId: attempt.id,
                    itemId: item.id,
                    skillId: item.skillId,
                    errorClass: p.result.errorClass as ErrorClass,
                    explanation: p.result.explanation ?? p.result.feedback ?? "",
                    correction:
                      "Read the short explanation, then try a fresh question from a different family.",
                    retryAfter: new Date(Date.parse(nowISO(state)) + 86400000).toISOString(),
                    resolved: false,
                  });
                }
              }}
              onReport={(note) => {
                setState((s) => ({
                  ...s,
                  reportedIssues: [
                    { id: `rep-${Date.now()}`, itemId: item.id, note, at: nowISO(s) },
                    ...s.reportedIssues,
                  ],
                  events: [...s.events],
                }));
                log("issue_reported", { itemId: item.id });
              }}
            />
          ))}
          <button type="button" className={buttonVariants()} onClick={() => setPhase("independent")}>
            Try a fresh question — independent check
          </button>
        </section>
      )}

      {phase === "independent" && (
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-primary">Independent check</h2>
          <p className="text-sm text-muted-foreground">
            Different item family. No tutor. A full solution is available afterwards and will mark the
            attempt assisted if you open it first.
          </p>
          {independentItems.map((item) => (
            <PracticeItem
              key={item.id}
              item={item}
              context="independent"
              onSubmit={(p) => {
                const attempt = recordAttempt({
                  itemId: item.id,
                  answer: p.answer,
                  correct: p.result.correct,
                  assisted: false,
                  hintLevel: 0,
                  confidence: p.confidence,
                  calculatorUsed: p.calculatorUsed,
                  scratchwork: p.scratchwork,
                  errorClass: (p.result.errorClass as ErrorClass) ?? undefined,
                  context: "independent",
                });
                if (p.result.correct && p.confidence !== "low") {
                  markLesson(id, "independently_demonstrated");
                  log("independent_check_passed", { itemId: item.id, lessonId: id });
                }
                if (p.result.correct === false) {
                  addMistake({
                    attemptId: attempt.id,
                    itemId: item.id,
                    skillId: item.skillId,
                    errorClass: (p.result.errorClass as ErrorClass) ?? "concept",
                    explanation: p.result.explanation ?? "",
                    correction:
                      "A short explanation, then a fresh item. Repeating this same family will not add new independent evidence.",
                    retryAfter: new Date(Date.parse(nowISO(state)) + 86400000).toISOString(),
                    resolved: false,
                  });
                }
              }}
            />
          ))}
          <h3 className="pt-4 text-base font-semibold text-primary">Exit check</h3>
          {exitItems.map((item) => (
            <PracticeItem
              key={item.id}
              item={item}
              context="lesson"
              onSubmit={(p) => {
                recordAttempt({
                  itemId: item.id,
                  answer: p.answer,
                  correct: p.result.correct,
                  assisted: false,
                  hintLevel: 0,
                  confidence: p.confidence,
                  calculatorUsed: p.calculatorUsed,
                  context: "lesson",
                });
              }}
            />
          ))}
        </section>
      )}

      <p id="report-math" className="mt-8 text-xs text-muted-foreground">
        If a stem, graph, or key looks ambiguous, use <strong>Report ambiguous mathematics</strong> on
        the item. Faculty keep a correction trail; we do not silently rewrite your past attempts.
      </p>

      {id === PUBLIC_LESSON_1 && (
        <p className="mt-8">
          <Link href={`/lesson/${PUBLIC_LESSON_2}`} className={buttonVariants()}>
            Continue to lesson 2: FTC accumulation
          </Link>
        </p>
      )}

      {id === PUBLIC_LESSON_2 && (
        <div className="mt-8 space-y-3">
          <button
            type="button"
            className={buttonVariants()}
            onClick={() => {
              markLesson(id, "studied");
              log("lesson2_complete", { lessonId: id, unit: "u6", subject: "calculus-ab" });
              window.location.assign(studyGateUrl("u6"));
            }}
          >
            I have finished this lesson
          </button>
          <p className="text-sm">
            Want help with this idea?{" "}
            <WhatsAppLink sku={unitFromLessonId(id)}>WhatsApp Anannt in Burjuman</WhatsAppLink>.
          </p>
        </div>
      )}
    </div>
  );
}
